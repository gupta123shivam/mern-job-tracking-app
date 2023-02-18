import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const register = async (req, res, next) => {
  const { name, lastname, password, location, email } = req.body;
  const userFields = {
    name,
    email,
    password,
    location,
    lastname,
  };
  const user = await User.create(userFields);
  res.status(StatusCodes.CREATED).json({ name, email, _id: user._id });
};

const login = async (req, res) => {
  res.send("login");
};
const updateUser = async (req, res) => {
  res.send("update");
};
const logout = async (req, res) => {
  res.send("out");
};

export { register, login, updateUser, logout };
