import { Namespace, Socket } from "socket.io";
import {
  findDocument,
  updateDocument,
  deleteDocument,
} from "../database/documentService.js";
import {
  addNewConnection,
  getUsersInCurrentDocument,
} from "./utils/activeDocumentConnections.js";

const documentEvents = (socket: Socket, io: Namespace) => {
  socket.on("delete-current-document", async (documentName) => {
    const response = await deleteDocument(documentName);

    if (response?.acknowledged) {
      io.emit("document-successfully-deleted", documentName);
    }
  });

  // Puts documents in a room. Groups them
  socket.on(
    "select-document",
    async (
      { documentName, username }: { documentName: string; username: string },
      loadPreExistingText: Function
    ) => {
      const document = await findDocument(documentName);

      if (document) {
        socket.join(documentName);

        addNewConnection({ documentName, username });

        const usersInDocument = getUsersInCurrentDocument(documentName);

        // io.to sends to all people connected to the document
        // socket.to would send to everyone but the user currently connected to the document
        io.to(documentName).emit("users-in-document", usersInDocument);

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
};

export default documentEvents;
