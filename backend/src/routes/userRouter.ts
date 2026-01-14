import express, { Router } from "express";
import {
  login,
  profile,
  register,
  users,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const userRouter: Router = express.Router();

userRouter.get("/", users);
userRouter.post("/user", register);
userRouter.post("/user/login", login);
userRouter.get("/user/profile", authMiddleware, profile);
export default userRouter;
