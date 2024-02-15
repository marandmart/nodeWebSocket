import { ActiveDocumentData } from "../../utils/interfaces.js";

const documentConnections: ActiveDocumentData[] = [];

function addNewConnection(data: ActiveDocumentData) {
  documentConnections.push(data);
}

function getUsersInCurrentDocument(currentDocument: string) {
  return documentConnections
    .filter(({ documentName }) => documentName === currentDocument)
    .map(({ username }) => username);
}

export { addNewConnection, getUsersInCurrentDocument };
