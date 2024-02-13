import io from "./server.js";
import { Socket } from "socket.io";
import homeEvents from "./server/eventRegistry/home.js";
import documentEvents from "./server/eventRegistry/document.js";
import registerEvents from "./server/eventRegistry/register.js";
import loginEvents from "./server/eventRegistry/login.js";
import authorizeUser from "./server/middlewares/authorizeUser.js";

const nspUsers = io.of("/users");

nspUsers.use(authorizeUser);

nspUsers.on("connection", (socket: Socket) => {
  homeEvents(socket, nspUsers);
  documentEvents(socket, nspUsers);
});

io.of("/").on("connection", (socket: Socket) => {
  registerEvents(socket, io);
  loginEvents(socket, io);
});
