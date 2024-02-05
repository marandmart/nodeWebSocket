import express from "express";
import routes from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;
const app = express();

routes(app);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", () => {
  console.log("Client Connected");
});
