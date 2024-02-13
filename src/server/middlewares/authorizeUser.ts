import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { NextFunction } from "../utils/type.js";
import "dotenv/config";

function authorizeUser(socket: Socket, next: NextFunction) {
  const tokenJWT = socket.handshake.auth.token;
  const AUTH_SECRET = process.env.AUTH_SECRET;

  try {
    if (AUTH_SECRET) {
      jwt.verify(tokenJWT, AUTH_SECRET);
      next();
    }
  } catch (error) {
    // emits connect_error
    next(error);
  }
}

export default authorizeUser;
