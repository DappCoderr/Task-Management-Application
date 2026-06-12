import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;
