import { ActiveDocumentData } from "../../utils/interfaces.js";

const documentConnections: ActiveDocumentData[] = [];

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

export { addNewConnection, getUsersInCurrentDocument };
