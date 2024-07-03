import express from "express";
import { MediaRouter } from "../routers/MediaRouter";
import { checkJWTValidity, handleErrors } from "../utils/middleware";

export const createApp = () => {
  const app = express();
  const router = new MediaRouter();

  app.use(checkJWTValidity);
  app.use("/media", router.getRouter());
  app.use(handleErrors);

  return app;
};
