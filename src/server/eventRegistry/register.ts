import { Server, Socket } from "socket.io";
import { registerNewUser } from "../database/userUtils.js";

type NewUser = {
  username: string;
  password: string;
};

const registerEvents = (socket: Socket, _: Server) => {
  socket.on("register-new-user", async (data: NewUser) => {
    const resp = await registerNewUser(data);

    if (resp?.acknowledged) {
      socket.emit("successful-user-register");
    } else {
      socket.emit("failed-user-register");
    }
  });
};

export default registerEvents;
