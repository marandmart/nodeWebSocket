import { Router } from "express";
import RoutesController from "../controllers/RoutesController.js";

const router = Router();

router.get("/", (req, res) => RoutesController.getHome(req, res));
router.get("/:path", (req, res) => RoutesController.getPage(req, res));
router.get("/scripts/:directory/:filename", (req, res) =>
  RoutesController.serveScript(req, res)
);

export default router;
