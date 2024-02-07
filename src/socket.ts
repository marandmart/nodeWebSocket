import io from "./server.js";
import { Socket } from "socket.io";

const documents = [
  {
    name: "JavaScript",
    text: "texto de javascript...",
  },
  {
    name: "Node",
    text: "texto de node...",
  },
  {
    name: "Socket. IO",
    text: "texto de socket.io...",
  },
];

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  // Puts documents in a room. Groups them
  socket.on(
    "select-document",
    (documentName: string, loadPreExistingText: Function) => {
      socket.join(documentName);
      const document = findDocument(documentName);

      if (document) {
        loadPreExistingText(document.text);
      }
    }
  );

  socket.on(
    "text-changed",
    ({ text, documentName }: { text: string; documentName: string }) => {
      const document = findDocument(documentName);
      if (document) {
        document.text = text;
      }
      socket.to(documentName).emit("update-broadcast", text);
    }
  );
});

const findDocument = (documentName: string) => {
  const foundDocument = documents.find(
    ({ name }: { name: string }) => name === documentName
  );
  if (foundDocument) {
    return foundDocument;
  }
};
