import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      data: null,
      messsage: "Something went wrong",
    });
  }
};

export const signup = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { email, username, password } = req.body;
  //console.log("email: ", email);

  if ([email, username, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      data: null,
      messsage: "All fields are required",
    });
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.status(409).json({
      data: null,
      messsage: "User already exists",
    });
  }

  const user = await User.create({
    email,
    password,
    username: username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(500).json({
      data: null,
      messsage: "Something went wrong while registering the user",
    });
  }

  return res
    .status(201)
    .json({ data: createdUser, message: "User registered Successfully" });
});

export const login = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;

  if (!(password || email)) {
    return res
      .status(400)
      .json({ data: null, message: "Username and Email is required" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ data: null, message: "User Doesn't Exists" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ data: null, message: "Invalid Credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ data: loggedInUser, message: "success" });
});

export const logout = asyncHandler(async (req, res) => {
  console.log("Logging Outtt");
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ data: null, message: "success" });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json({ data: null, message: "Unauthorized Request" });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(401)
        .json({ data: null, message: "Invalid Refresh Token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json({ data: null, message: "Unauthorized Request" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        accessToken,
        refreshToken: newRefreshToken,
        message: "Access Token Refreshed",
      });
  } catch (error) {
    return res
      .status(401)
      .json({ data: null, message: "Invalid refresh token" });
  }
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ data: null, message: "Invalid old password" });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ data: null, message: "Password Changed Successfully" });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    console.log("Logged In ");
  }
  return res
    .status(200)
    .json({ data: req.user, message: "User Fetched Successfully" });
});
