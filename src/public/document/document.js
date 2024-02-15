import { emitText, selectDocument, deleteActiveDocument } from "./documentSocket.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("name");

const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const deleteButton = document.getElementById("excluir-documento");
const connectedUsersList = document.getElementById("usuarios-conectados");

documentTitle.textContent = documentName || "Document sem título";

textEditor.addEventListener("keyup", () => {
    emitText({
        text: textEditor.value, documentName
    });
});

deleteButton.addEventListener("click", () => {
    deleteActiveDocument(documentName)
});

function updateText(updatedText) {
    textEditor.value = updatedText
};

function documentDeleted(deletedDocument) {
    if (deletedDocument === documentName) {
        alert(`Document with name: ${deletedDocument} has been deleted`);
        window.location.href = "/";
    }
};

function handleUserLoadDocument(validatedToken) {
    selectDocument({ documentName, username: validatedToken.userName });
};

function handleConnectedUsers(connectedUsers) {
    connectedUsersList.innerHTML = "";
    connectedUsers.forEach(user => {
        connectedUsersList.innerHTML += `<li class="list-group-item">${user}</li>`
    })
}

export { updateText, documentDeleted, handleUserLoadDocument, handleConnectedUsers }

