import { updateText } from "./documentScript.js";

var socket = io();

function emitText(text) {
    socket.emit("updated", text);
}

socket.on("update-broadcast", (updatedText) => {
    updateText(updatedText)
})


export { emitText }