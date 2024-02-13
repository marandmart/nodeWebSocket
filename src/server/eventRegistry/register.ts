import { Server, Socket } from "socket.io";
import { registerNewUser, findUser } from "../database/userService.js";
import { UserAuth } from "../utils/type.js";

const registerEvents = (socket: Socket, _: Server) => {
  socket.on("register-new-user", async (data: UserAuth) => {
    const user = await findUser(data.username);

    if (user === null) {
      const resp = await registerNewUser(data);

      if (resp?.acknowledged) {
        socket.emit("successful-user-register");
      } else {
        socket.emit("failed-user-register");
      }
    } else {
      socket.emit("user-already-exists");
    }
  });
};

export default registerEvents;
