import { updateText } from "./documentScript.js";

var socket = io();

function selectDocument(documentName) {
    socket.emit("select-document", documentName, (text) => {
        updateText(text)
    })
}

function emitText(data) {
    socket.emit("text-changed", data);
}

// Updates text when text is typed
socket.on("update-broadcast", (updatedText) => {
    updateText(updatedText)
})


export { emitText, selectDocument }