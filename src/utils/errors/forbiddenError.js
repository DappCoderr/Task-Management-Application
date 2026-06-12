import { StatusCodes } from "http-status-codes";

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ForbiddenError;
