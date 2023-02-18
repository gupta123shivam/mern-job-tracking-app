import jwt from "jsonwebtoken";
import CustomError from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;
  if (!authHeaders?.startsWith("Bearer ")) {
    throw new CustomError.UnauthenticatedError("Unauthenticated Error");
  }
  const token = authHeaders.split(" ")[1];
  if (!token) {
    throw new CustomError.UnauthenticatedError("Unauthenticated Error");
  }
  await jwt.verify(
    token,
    process.env.REFRESH_TOKEN_JWT_SECRET,
    (err, payload) => {
      if (err) {
        throw new CustomError.UnauthenticatedError("Unauthenticated Error");
      }
      req.user = { userId: payload.userId };
      next();
    }
  );
};

export default auth;
