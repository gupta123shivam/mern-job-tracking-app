import {
  getUser,
  register,
  login,
  updateUser,
  logout,
  getAlluser,
  deleteAllUser,
} from "../controllers/authController.js";
import express from "express";
import auth from "../middleware/auth.js";
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const authRouter = express.Router();

authRouter.get("/", auth, getUser);
authRouter.route("/allUser").get(getAlluser).delete(deleteAllUser);
authRouter.route("/logout").get(auth, logout);
authRouter.route("/login").post(apiLimiter, login);
authRouter.route("/register").post(apiLimiter, register);
authRouter.route("/updateUser").post(auth, updateUser);

export default authRouter;
