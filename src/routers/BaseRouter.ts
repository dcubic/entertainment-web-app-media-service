import express, { Request, Response, NextFunction, Router } from "express";

abstract class BaseRouter {
  protected router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  protected asyncWrapper = (
    operation: (
      request: Request,
      response: Response,
      next: NextFunction
    ) => Promise<any>
  ) => {
    return (request: Request, response: Response, next: NextFunction) => {
      Promise.resolve(operation(request, response, next)).catch(next);
    };
  };

  getRouter(): Router {
    return this.router;
  }
}

export default BaseRouter;
