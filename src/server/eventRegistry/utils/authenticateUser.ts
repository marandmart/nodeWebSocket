import { scryptSync, timingSafeEqual } from "crypto";
import { UserDocument } from "../../utils/type.js";

const authenticateUser = (submittedPassword: string, user: UserDocument) => {
  const testHash = scryptSync(submittedPassword, user.salt, 64);
  const actualHash = Buffer.from(user.passwordHash, "hex");
  const isAuthenticated = timingSafeEqual(actualHash, testHash);

  return isAuthenticated;
};

export default authenticateUser;
