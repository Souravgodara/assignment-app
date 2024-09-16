import express from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/auth.controller.js";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/AuthValidation.js";
import { verifyJWT } from "../middlewares/Auth.js";

export const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.get("/logout", verifyJWT, logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJWT, changeCurrentPassword);
router.get("/current-user", verifyJWT, getCurrentUser);

export default router;
