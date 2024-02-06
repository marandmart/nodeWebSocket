import io from "./server.js";
import { Socket } from "socket.io";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  socket.on("updated", (text: string) => {
    socket.broadcast.emit("update-broadcast", text);
  });
});
