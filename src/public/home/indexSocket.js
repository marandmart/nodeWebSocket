import { retrieveCookie } from "../utils/cookies.js";
import { addDocumentListing, removeDocumentListing } from "./index.js";

const socket = io("/users", {
    auth: {
        token: retrieveCookie("jwtToken")
    }
});

socket.on("connect_error", (error) => {
    alert(error);
    window.location.href = "/login"
})

socket.emit("retrieve-documents", (documents) => {
    documents.forEach(document => addDocumentListing(document.name))
});

socket.on("add-document-to-home", (name) => {
    addDocumentListing(name);
});

socket.on("document-already-exists", (documentName) => {
    alert(`A document with name: ${documentName} already exists`);
});

socket.on("document-successfully-deleted", (documentName) => {
    removeDocumentListing(documentName);
});

function createNewDocumentListing(name) {
    socket.emit("new-document-created", name)
}

export { createNewDocumentListing }