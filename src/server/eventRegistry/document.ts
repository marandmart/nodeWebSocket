import { Namespace, Socket } from "socket.io";
import {
  findDocument,
  updateDocument,
  deleteDocument,
} from "../database/documentService.js";

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
};

export default documentEvents;
