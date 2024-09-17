import { FriendRequest } from "../models/friendRequest.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const listUsers = asyncHandler(async (req, res) => {
  try {
    const currentUserId = req.user._id; // Assuming user ID is set in req.user by the auth middleware
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "username email _id"
    );
    res.status(200).json({ data: users, message: "Users Fetched" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});
export const search = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username email");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching users" });
  }
});

export const sendRequest = asyncHandler(async (req, res) => {
  let { recipientId } = req.body;
  const requesterId = req.user._id;
  recipientId = new mongoose.Types.ObjectId(recipientId.userId);

  if (!requesterId || !recipientId) {
    return res
      .status(400)
      .json({ message: "Requester and recipient IDs are required" });
  }

  try {
    const friendRequest = new FriendRequest({
      requester: requesterId,
      recipient: recipientId,
    });

    await friendRequest.save();

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while sending friend request" });
  }
});

export const getRequests = asyncHandler(async (req, res) => {
  try {
    const currentUserId = req.user.id; // Get the current user's ID from the token
    const requests = await FriendRequest.find({
      recipient: currentUserId,
      status: "pending",
    })
      .populate("requester", "username email") // Populate requester with username and email
      .exec();

    if (!requests) {
      return res.status(404).json({ message: "No friend requests found" });
    }

    res.status(200).json({ data: requests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching friend requests" });
  }
});

export const respondRequest = asyncHandler(async (req, res) => {
  let { requestId, status } = req.body;
  requestId = new mongoose.Types.ObjectId(requestId);

  if (!requestId || !["accepted", "rejected"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Valid request ID and status are required" });
  }

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    friendRequest.status = status;
    await friendRequest.save();

    if (status === "accepted") {
      const requester = await User.findById(friendRequest.requester);
      const recipient = await User.findById(friendRequest.recipient);

      requester.friends.push(recipient._id);
      recipient.friends.push(requester._id);

      await requester.save();
      await recipient.save();
    }

    return res.status(200).json({ message: `Friend request ${status}` });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      message: "An error occurred while responding to friend request",
    });
  }
});

export const friendList = asyncHandler(async (req, res) => {
  try {
    const currentUserId = req.user.id; // Get the current user's ID from the token
    const user = await User.findById(currentUserId)
      .populate("friends", "username email") // Populate friends with username and email
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: user.friends });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "An error occurred while fetching friends" });
  }
});

export const recommendations = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find friends of friends
    const friendsOfFriends = await User.find({
      _id: { $in: user.friends.map((friend) => friend.friends).flat() },
      _id: { $ne: userId }, // Exclude current user
      _id: { $nin: user.friends.map((friend) => friend._id) }, // Exclude current friends
    }).select("username email");

    res.json(friendsOfFriends);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching friend recommendations",
    });
  }
});
