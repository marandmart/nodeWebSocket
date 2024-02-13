import { randomBytes, scryptSync } from "crypto";

const createSaltAndHash = (
  writtenPassword: string
): {
  passwordHash: string;
  salt: string;
} => {
  const salt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(writtenPassword, salt, 64).toString("hex");
  return { salt, passwordHash };
};

export default createSaltAndHash;
