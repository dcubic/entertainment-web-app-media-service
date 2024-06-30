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
    const authorizationHeaderValue = request.headers.authorization;
    if (authorizationHeaderValue === undefined) {
      throw new AuthenticationError();
    }
    const parts = authorizationHeaderValue.split(" ", 2);
    if (parts.length !== 2) {
      throw new AuthenticationError();
    }

    const token = parts[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET || JWT_SECRET,
      (error, decodedToken) => {
        if (error) {
          throw new AuthenticationError();
        } 
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
  response.status(error.statusCode).json({ message: error.message });
};
