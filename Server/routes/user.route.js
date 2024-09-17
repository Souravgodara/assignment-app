import express from "express";
import { verifyJWT } from "../middlewares/Auth.js";
import {
  friendList,
  getRequests,
  listUsers,
  recommendations,
  respondRequest,
  search,
  sendRequest,
} from "../controllers/user.controller.js";

export const router = express.Router();

router.get("/list-users", verifyJWT, listUsers);
router.get("/search", verifyJWT, search);
router.post("/send-request", verifyJWT, sendRequest);
router.get("/fetch-requests", verifyJWT, getRequests);
router.post("/respond-request", verifyJWT, respondRequest);
router.get("/friends", verifyJWT, friendList);
router.get("/recommendations/:userId", verifyJWT, recommendations);

export default router;
