import io from "./server.js";
import { Socket } from "socket.io";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  // Puts documents in a room. Groups them
  socket.on("select-document", (documentName) => {
    socket.join(documentName);
  });

  socket.on(
    "text-changed",
    ({ newText, documentName }: { newText: string; documentName: string }) => {
      socket.to(documentName).emit("update-broadcast", newText);
    }
  );
});
