import express from "express";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

class RoutesController {
  static getIndex(_: express.Request, res: express.Response) {
    return res.sendFile(
      path.join(__dirname, "..", "..", "public", "home", "index.html")
    );
  }
  static getDocument(_: express.Request, res: express.Response) {
    return res.sendFile(
      path.join(__dirname, "..", "..", "public", "document", "document.html")
    );
  }

  static serveScript(req: express.Request, res: express.Response) {
    const filename = req.params.filename;
    const directory = req.params.directory;
    res.type("text/javascript");
    res.sendFile(
      path.join(__dirname, "..", "..", "public", directory, filename)
    );
  }
}

export default RoutesController;
