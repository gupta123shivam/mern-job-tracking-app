import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Must Provide Name"],
    minlength: 3,
    maxlength: 30,
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "",
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid EMail",
    },
    required: [true, "Must Provide Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must Provide Password"],
    minlength: process.env.NODE_ENV === "development" ? 3 : 6,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "My City",
  },
});

export default mongoose.model("User", UserSchema);
