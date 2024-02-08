import io from "./server.js";
import { Socket } from "socket.io";
import { documentCollection } from "./database/dbConnect.js";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  // Puts documents in a room. Groups them
  socket.on(
    "select-document",
    async (documentName: string, loadPreExistingText: Function) => {
      socket.join(documentName);
      const document = await findDocument(documentName);

      if (document) {
        loadPreExistingText(document.text);
      }
    }
  );

  socket.on(
    "text-changed",
    async ({ text, documentName }: { text: string; documentName: string }) => {
      const document = await findDocument(documentName);
      if (document) {
        document.text = text;
      }
      socket.to(documentName).emit("update-broadcast", text);
    }
  );
});

const findDocument = async (documentName: string) => {
  if (documentCollection) {
    const foundDocument = await documentCollection.findOne({
      name: documentName,
    });

    if (foundDocument) {
      return foundDocument;
    }
  }
};
