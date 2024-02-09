import io from "./server.js";
import { Socket } from "socket.io";
import {
  findDocument,
  updateDocument,
  retrieveDocuments,
} from "./database/utils.js";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  socket.on("retrieve-documents", async (returnDocuments: Function) => {
    const documents = await retrieveDocuments();
    returnDocuments(documents);
  });

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
      const updateResult = await updateDocument(documentName, text);

      if (updateResult && updateResult.modifiedCount === 1) {
        socket.to(documentName).emit("update-broadcast", text);
      }
    }
  );
});
