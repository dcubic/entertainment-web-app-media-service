import express from "express";
import cors from 'cors'
import { MediaRouter } from "../routers/MediaRouter";
import { checkJWTValidity, handleErrors } from "../utils/middleware";
import HealthRouter from "../routers/HealthRouter";

export const createApp = () => {
  const app = express();
  app.use(cors());
  const mediaRouter = new MediaRouter();
  const healthRouter = new HealthRouter();

  app.use("/media/health", healthRouter.getRouter())
  app.use("/media/data", checkJWTValidity, mediaRouter.getRouter())
  app.use(handleErrors);

  return app;
};
