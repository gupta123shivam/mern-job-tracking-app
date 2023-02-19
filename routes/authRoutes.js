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

const authRouter = express.Router();

authRouter.get("/", auth, getUser);
authRouter.route("/allUser").get(getAlluser).delete(deleteAllUser);
authRouter.route("/logout").get(auth, logout);
authRouter.route("/login").post(login);
authRouter.route("/register").post(register);
authRouter.route("/updateUser").post(auth, updateUser);

export default authRouter;
