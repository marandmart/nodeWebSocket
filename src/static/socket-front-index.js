import { addDocumentListing } from "./index.js";

const socket = io();

socket.emit("retrieve-documents", (documents) => {
    documents.forEach(document => addDocumentListing(document.name))
})

socket.on("add-document-to-home", (name) => {
    addDocumentListing(name);
})

socket.on("document-already-exists", (documentName) => {
    alert(`A document with name: ${documentName} already exists`);
})

function createNewDocumentListing(name) {
    socket.emit("new-document-created", name)
}

export { createNewDocumentListing }