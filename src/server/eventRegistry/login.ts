import { Server, Socket } from "socket.io";
import { findUser } from "../database/userService.js";
import authenticateUser from "./utils/authenticateUser.js";
import { UserAuth } from "./utils/type.js";
import generateJWT from "./utils/generateJWT.js";

const loginEvents = (socket: Socket, _: Server) => {
  socket.on("login-authenticate", async ({ username, password }: UserAuth) => {
    const user = await findUser(username);
    if (user === null) {
      socket.emit("user-not-found");
      return;
    }

    const userIsAuthenticated = authenticateUser(password, user);

    if (userIsAuthenticated) {
      const JWTtoken = generateJWT({ userName: user.username });
      if (!JWTtoken) {
        console.error("No auth token defined");
      }
      socket.emit("successful-authentication", JWTtoken);
    } else {
      socket.emit("failed-authentication");
    }
  });
};

export default loginEvents;
