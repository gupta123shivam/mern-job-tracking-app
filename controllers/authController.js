import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import CustomError from "../errors/index.js";
import hashPassword from "../utils/hashPassword.js";

const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !email || !password) {
    throw new CustomError.BadRequestError("Must provide Name, Email, Password");
  }

  // Check for alredy existing user
  const userAlreadyExists = await User.findOne({ email })
    .select("-password")
    .exec();
  if (userAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists in database");
  }
  // Hash Password
  const hashedPwd = await hashPassword(password);
  const userFields = {
    name,
    email,
    password: hashedPwd,
  };
  const user = await User.create(userFields);

  const refreshToken = await user.genRefreshToken();

  const userData = {
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastname: user.lastname,
    },
    token: refreshToken,
    location: user.location,
  };
  res.status(StatusCodes.CREATED).json(userData);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const refreshToken = await user.genRefreshToken();
  await user.logIn();
  const userData = {
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastname: user.lastname,
    },
    token: refreshToken,
    location: user.location,
  };
  res.status(StatusCodes.OK).json(userData);
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email && !name && !lastName && !location) {
    throw new CustomError.BadRequestError("No info was provided to be updated");
  }
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new CustomError.BadRequestError("No User exists for this request");
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (lastName) user.lastname = lastName;
  if (location) user.location = location;

  await user.save();

  const refreshToken = await user.getRefreshToken();
  const userData = {
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastname: user.lastname,
    },
    token: refreshToken,
    location: user.location,
  };
  res.status(StatusCodes.OK).json(userData);
};
const logout = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user.isLoggedIn) {
    throw new CustomError.BadRequestError("You are not logged in.");
  }
  await user.logOut();

  res.status(StatusCodes.OK).json({ msg: "User logged out successfully" });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user.isLoggedIn) {
    throw new CustomError.UnauthenticatedError("Not Logged in");
  }
  const refreshToken = await user.getRefreshToken();
  const userData = {
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastname: user.lastname,
    },
    token: refreshToken,
    location: user.location,
  };
  res.status(StatusCodes.OK).json(userData);
};

const getAlluser = async (req, res) => {
  const users = await User.find({}).exec();
  res.status(StatusCodes.OK).json(users);
};

const deleteAllUser = async (req, res) => {
  const users = await User.deleteMany({});
  res.status(StatusCodes.CREATED).json(users);
};

export {
  register,
  login,
  updateUser,
  logout,
  getAlluser,
  deleteAllUser,
  getUser,
};
