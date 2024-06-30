const StatusCode = require("./StatusCode");

export class ServerError extends Error {
  readonly statusCode: StatusCode;
  constructor(statusCode: StatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class AuthenticationError extends ServerError {
  constructor(
    statusCode = StatusCode.UNAUTHORIZED,
    message = "Invalid Credentials"
  ) {
    super(statusCode, message);

    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
