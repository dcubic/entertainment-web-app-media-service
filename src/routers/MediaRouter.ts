import { Request, Response, NextFunction } from "express";
import BaseRouter from "./BaseRouter";

export class MediaRouter extends BaseRouter {
  constructor() {
    super();
  }

  protected initializeRoutes() {
    this.router.get("/data", this.asyncWrapper(this.getData.bind(this)));
  }

  private async getData(request: Request, response: Response) {

  }
}
