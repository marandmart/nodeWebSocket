import { addDocumentListing } from "./index.js";

const socket = io();

socket.emit("retrieve-documents", (documents) => {
    documents.forEach(document => addDocumentListing(document.name))
})