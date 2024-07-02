import { Request, Response, NextFunction } from "express";
import { AuthenticationError, ServerError } from "./errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants";

export const checkJWTValidity = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    console.log("Did we enter the JWT validity check?");
    const authorizationHeaderValue = request.headers.authorization;
    if (authorizationHeaderValue === undefined) {
      throw new AuthenticationError();
    }
    console.log("Did we see the Auth header?");
    const parts = authorizationHeaderValue.split(" ", 2);
    if (parts.length !== 2) {
      throw new AuthenticationError();
    }
    console.log("Were the part counts as expected?");

    const token = parts[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET || JWT_SECRET,
      (error, decodedToken) => {
        console.log("Did we verify");
        if (error) {
          console.log("Bad result case?");
          throw new AuthenticationError();
        }
        console.log("Good result case");
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export const handleErrors = (
  error: ServerError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("What was the error: ", error.message);
  response.status(error.statusCode).json({ message: error.message });
};
