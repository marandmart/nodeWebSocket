import { Server, Socket } from "socket.io";
import { findUser } from "../database/userService.js";
import authenticateUser from "../database/utils/authenticateUser.js";
import { UserAuth } from "./utils/type.js";

const loginEvents = (socket: Socket, _: Server) => {
  socket.on("login-authenticate", async ({ username, password }: UserAuth) => {
    const user = await findUser(username);
    if (user === null) {
      socket.emit("user-not-found");
      return;
    }

    const userIsAuthenticated = authenticateUser(password, user);

    if (userIsAuthenticated) {
      socket.emit("successful-authentication");
    } else {
      socket.emit("failed-authentication");
    }
  });
};

export default loginEvents;
