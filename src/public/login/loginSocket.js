const socket = io();

const emitLogin = (data) => {
    socket.emit("login-authenticate", data);
}

socket.on("user-not-found", () => alert("User does not exist in database."));
socket.on("failed-authentication", () => alert("Failed to authenticate user."));
socket.on("successful-authentication", () => {
    alert("User successfully authenticated.");
    window.location.href = "/";
});


export { emitLogin }