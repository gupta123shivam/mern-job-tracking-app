import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  refreshToken: {
    type: String,
    default: "",
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

UserSchema.methods.genRefreshToken = async function () {
  const refreshToken = jwt.sign(
    {
      userId: this._id,
    },
    process.env.REFRESH_TOKEN_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_JWT_LIFETIME,
    }
  );
  this.refreshToken = refreshToken;
  await this.save();

  return this.refreshToken;
};

UserSchema.methods.getRefreshToken = async function () {
  if (!this.refreshToken) {
    await this.genRefreshToken();
  }

  return this.refreshToken;
};

UserSchema.methods.logIn = async function () {
  this.isLoggedIn = true;
  await this.save();
};

UserSchema.methods.logOut = async function () {
  this.isLoggedIn = false;
  await this.save();
};

export default mongoose.model("User", UserSchema);
