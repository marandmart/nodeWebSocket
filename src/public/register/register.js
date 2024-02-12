import { registerNewUser } from "./registerSocket.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form["input-usuario"].value;
    const password = form["input-senha"].value;

    registerNewUser({ username, password });
})