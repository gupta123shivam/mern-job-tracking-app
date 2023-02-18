import BadRequestError from "./bad-request.js";
import CustomAPIError from "./custom-error.js";
import NotFoundError from "./not-found.js";
import UnauthenticatedError from "./unauthorized.js";

const CustomError = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};

export default CustomError;
