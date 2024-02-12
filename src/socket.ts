import io from "./server.js";
import { Socket } from "socket.io";
import homeEvents from "./server/eventRegistry/home.js";
import documentEvents from "./server/eventRegistry/document.js";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  homeEvents(socket, io);
  documentEvents(socket, io);
});
