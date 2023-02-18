import StatusCodes from "http-status-codes";
import CustomAPIError from "./custom-error.js";

class NotFound extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;
