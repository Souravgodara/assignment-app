import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());
await connectDB();
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
