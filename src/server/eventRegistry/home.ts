import {
  findDocument,
  retrieveDocuments,
  createNewDocument,
} from "../database/documentService.js";
import { Server, Socket } from "socket.io";

const homeEvents = (socket: Socket, io: Server) => {
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
};

export default homeEvents;
