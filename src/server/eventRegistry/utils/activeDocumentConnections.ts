import { ActiveDocumentData } from "../../utils/interfaces.js";

let documentConnections: ActiveDocumentData[] = [];

function addNewConnection(data: ActiveDocumentData) {
  const { username: newUser, documentName: newDocument } = data;
  const userAlreadyConnected = documentConnections.find(
    ({ username, documentName }) =>
      username === newUser && documentName === newDocument
  );

  if (!userAlreadyConnected) {
    documentConnections.push(data);
  }
}

function getUsersInCurrentDocument(currentDocument: string) {
  return documentConnections
    .filter(({ documentName }) => documentName === currentDocument)
    .map(({ username }) => username);
}

function removeConnection(removedUser: string, removedDocument: string) {
  const index = documentConnections.findIndex(
    ({ documentName, username }) =>
      removedUser === username && removedDocument === documentName
  );
  if (index !== -1) {
    documentConnections.splice(index, 1);
  }
}

export { addNewConnection, getUsersInCurrentDocument, removeConnection };
