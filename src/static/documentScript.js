import { emitText } from "./socket-front.js";

const textEditor = document.getElementById("editor-texto");

textEditor.addEventListener("keyup", () => {
    emitText(textEditor.value);
});

function updateText(updatedText) {
    textEditor.value = updatedText
}

export { updateText }