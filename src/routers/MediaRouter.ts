import { Request, Response } from "express";
import BaseRouter from "./BaseRouter";
import { StatusCode } from "../utils/StatusCode";
import jsonData from "../data/data.json";
import { MediaObject } from "../data/MediaData";

const mediaData: MediaObject[] = jsonData as MediaObject[];

export class MediaRouter extends BaseRouter {
  constructor() {
    super();
  }

  protected initializeRoutes() {
    this.router.get("/data", this.asyncWrapper(this.getData.bind(this)));
  }

  private async getData(request: Request, response: Response) {
    console.log("Did I reach the data route?");
    response.status(StatusCode.OK).json(mediaData);
  }
}
