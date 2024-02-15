import { Namespace, Socket } from "socket.io";
import {
  findDocument,
  updateDocument,
  deleteDocument,
} from "../database/documentService.js";
import {
  addNewConnection,
  getUsersInCurrentDocument,
  removeConnection,
} from "./utils/activeDocumentConnections.js";

const documentEvents = (socket: Socket, io: Namespace) => {
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

      // Registers these events only to those that have loaded the document
      socket.on("disconnect", () => {
        removeConnection(username, documentName);
        const updatedUsersInDocument = getUsersInCurrentDocument(documentName);
        io.to(documentName).emit("users-in-document", updatedUsersInDocument);
      });

      socket.on("delete-current-document", async (documentName) => {
        const response = await deleteDocument(documentName);

        if (response?.acknowledged) {
          io.emit("document-successfully-deleted", documentName);
        }
      });

      socket.on(
        "text-changed",
        async ({
          text,
          documentName,
        }: {
          text: string;
          documentName: string;
        }) => {
          const updateResult = await updateDocument(documentName, text);

          if (updateResult && updateResult.modifiedCount === 1) {
            socket.to(documentName).emit("update-broadcast", text);
          }
        }
      );
    }
  );
};

export default documentEvents;
