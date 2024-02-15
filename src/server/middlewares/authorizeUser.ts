import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { NextFunction } from "../utils/interfaces.js";
import "dotenv/config";

function authorizeUser(socket: Socket, next: NextFunction) {
  const tokenJWT = socket.handshake.auth.token;
  const AUTH_SECRET = process.env.AUTH_SECRET;

  try {
    if (AUTH_SECRET) {
      const verifiedToken = jwt.verify(tokenJWT, AUTH_SECRET);
      // since this is a middleware applied to the namespace /users,
      // whenever a page in this namespace is loaded, this event is emitted
      socket.emit("login_successful", verifiedToken);
      next();
    }
  } catch (error) {
    // emits connect_error
    next(error);
  }
}

export default authorizeUser;
