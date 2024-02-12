const socket = io();

const registerNewUser = (data) => {
    socket.emit("register-new-user", data)
}

socket.on("successful-user-register", () => alert("New register created successfully"));
socket.on("failed-user-register", () => alert("Failed to create new user"));

export { registerNewUser };