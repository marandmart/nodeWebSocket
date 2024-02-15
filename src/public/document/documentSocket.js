import { updateText, documentDeleted, handleUserLoadDocument, handleConnectedUsers } from "./document.js";
import { retrieveCookie } from "../utils/cookies.js";

var socket = io("/users", {
    auth: {
        token: retrieveCookie("jwtToken")
    }
});

socket.on("connect_error", (error) => {
    alert(error);
    window.location.href = "/login"
});

function selectDocument(documentData) {
    socket.emit("select-document", documentData, (text) => {
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
});

socket.on("document-successfully-deleted", (name) => {
    documentDeleted(name)
});

// since it's part of the /users namespace, handleUserLoadDocument
// will run whenever the document is loaded, therefore selectDocument will run
// when a document is selected
socket.on("login_successful", handleUserLoadDocument);

socket.on("users-in-document", handleConnectedUsers);


export { emitText, selectDocument, deleteActiveDocument }