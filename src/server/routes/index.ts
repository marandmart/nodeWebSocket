import bodyParser from "body-parser";
import main from "./mainRoutes.js";
import { Application } from "express";

const routes = (app: Application) => {
  app.use(bodyParser.json(), main);
};

export default routes;
