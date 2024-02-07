import { emitText, selecteDocument } from "./socket-front.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("name");

const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");

documentTitle.textContent = documentName || "Document sem título";

selecteDocument(documentName);

textEditor.addEventListener("keyup", () => {
    emitText({
        newText: textEditor.value, documentName
    });
});

function updateText(updatedText) {
    textEditor.value = updatedText
}

export { updateText }