import jwt from "jsonwebtoken";
import "dotenv/config";

const AUTH_SECRET = process.env.AUTH_SECRET;

const generateJWT = (payload: object): string | undefined => {
  if (AUTH_SECRET) {
    const tokenJWT = jwt.sign(payload, AUTH_SECRET, { expiresIn: "1h" });
    return tokenJWT;
  }
};

export default generateJWT;
