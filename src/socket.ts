import io from "./server.js";
import { Socket } from "socket.io";
import homeEvents from "./server/eventRegistry/home.js";
import documentEvents from "./server/eventRegistry/document.js";
import registerEvents from "./server/eventRegistry/register.js";
import loginEvents from "./server/eventRegistry/login.js";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  homeEvents(socket, io);
  documentEvents(socket, io);
  registerEvents(socket, io);
  loginEvents(socket, io);
});
