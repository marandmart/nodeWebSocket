import express from "express";
import path from "path";

class RoutesController {
  static getIndex(_: express.Request, res: express.Response) {
    return res.sendFile(path.join(__dirname, "..", "static", "index.html"));
  }
  static getDocument(_: express.Request, res: express.Response) {
    // const { name } = req.params;
    return res.sendFile(path.join(__dirname, "..", "static", "document.html"));
  }
}

export default RoutesController;
