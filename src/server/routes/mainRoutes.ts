import { Router } from "express";
import RoutesController from "../controllers/RoutesController.js";

const router = Router();

router.get("/", (req, res) => RoutesController.getIndex(req, res));
router.get("/document", (req, res) => RoutesController.getDocument(req, res));
router.get("/scripts/:filename", (req, res) =>
  RoutesController.serveScript(req, res)
);
router.get("/scripts/:directory/:filename", (req, res) =>
  RoutesController.serveScript(req, res)
);

export default router;
