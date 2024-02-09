import { updateText, documentDeleted } from "./documentScript.js";

var socket = io();

function selectDocument(documentName) {
    socket.emit("select-document", documentName, (text) => {
        updateText(text)
    })
}

function emitText(data) {
    socket.emit("text-changed", data);
}

function deleteActiveDocument(name) {
    socket.emit("delete-current-document", name)
}

// Updates text when text is typed
socket.on("update-broadcast", (updatedText) => {
    updateText(updatedText)
})

socket.on("document-successfully-deleted", (name) => {
    documentDeleted(name)
})


export { emitText, selectDocument, deleteActiveDocument }