import {
  register,
  login,
  updateUser,
  logout,
} from "../controllers/authController.js";
import express from "express";

const authRouter = express.Router();

authRouter.route("/logout").get(logout);
authRouter.route("/login").post(login).get(logout);
authRouter.route("/register").post(register);
authRouter.route("/updateUser").post(updateUser);

export default authRouter;
