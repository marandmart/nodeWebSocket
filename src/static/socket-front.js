import { updateText } from "./documentScript.js";

var socket = io();

function selecteDocument(documentName) {
    socket.emit("select-document", documentName)
}

function emitText(data) {
    socket.emit("text-changed", data);
}

// Updates text when text is typed
socket.on("update-broadcast", (updatedText, documentName) => {
    updateText(updatedText, documentName)
})


export { emitText, selecteDocument }