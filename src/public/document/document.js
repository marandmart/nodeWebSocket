import { emitText, selectDocument, deleteActiveDocument } from "./documentSocket.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("name");

const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const deleteButton = document.getElementById("excluir-documento");

documentTitle.textContent = documentName || "Document sem título";

selectDocument(documentName);

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

export { updateText, documentDeleted }

