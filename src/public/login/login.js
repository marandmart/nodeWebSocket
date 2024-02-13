import { emitLogin } from "./loginSocket.js"

const form = document.getElementById("form-login");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form["input-usuario"].value;
    const password = form["input-senha"].value;

    emitLogin({ username, password });
})