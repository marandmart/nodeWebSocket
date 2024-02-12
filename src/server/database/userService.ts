import { userCollection } from "./dbConnect.js";
import createSaltAndHash from "./utils/createSaltAndHash.js";

const registerNewUser = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const { passwordHash, salt } = createSaltAndHash(password);

  return userCollection?.insertOne({ username, passwordHash, salt });
};

const findUser = (username: string) => {
  return userCollection?.findOne({ username });
};

export { registerNewUser, findUser };
