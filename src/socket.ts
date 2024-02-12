import io from "./server.js";
import { Socket } from "socket.io";
import {
  findDocument,
  updateDocument,
  retrieveDocuments,
  createNewDocument,
  deleteDocument,
} from "./server/database/utils.js";

io.on("connection", (socket: Socket) => {
  console.log("Client Connected with ID:", socket.id);

  socket.on("retrieve-documents", async (returnDocuments: Function) => {
    const documents = await retrieveDocuments();
    returnDocuments(documents);
  });

  socket.on("new-document-created", async (name: string) => {
    const documentAlreadyExists = (await findDocument(name)) != null;

    if (documentAlreadyExists) {
      socket.emit("document-already-exists", name);
    } else {
      const response = await createNewDocument(name);

      if (response?.acknowledged) {
        io.emit("add-document-to-home", name);
      }
    }
  });

  socket.on("delete-current-document", async (documentName) => {
    const response = await deleteDocument(documentName);

    if (response?.acknowledged) {
      io.emit("document-successfully-deleted", documentName);
    }
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
