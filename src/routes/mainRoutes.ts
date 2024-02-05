import { Router } from "express";
import RoutesController from "../controllers/RoutesController.js";

const router = Router();

router.get("/", (req, res) => RoutesController.getIndex(req, res));
router.get("/document", (req, res) => RoutesController.getDocument(req, res));

export default router;
