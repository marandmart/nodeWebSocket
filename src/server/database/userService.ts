import { UserAuth, UserDocument } from "../utils/type.js";
import { userCollection } from "./dbConnect.js";
import createSaltAndHash from "../eventRegistry/utils/createSaltAndHash.js";

const registerNewUser = ({ username, password }: UserAuth) => {
  const { passwordHash, salt } = createSaltAndHash(password);

  return userCollection?.insertOne({ username, passwordHash, salt });
};

const findUser = async (username: string): Promise<UserDocument | null> => {
  const user = await userCollection?.findOne({ username });
  if (user) {
    return {
      _id: user._id,
      username: user.username,
      passwordHash: user.passwordHash,
      salt: user.salt,
    };
  }
  return null;
};

export { registerNewUser, findUser };
