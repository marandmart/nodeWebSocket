import { userCollection } from "./dbConnect.js";

const registerNewUser = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return userCollection?.insertOne({ username, password });
};

const findUser = (username: string) => {
  return userCollection?.findOne({ username });
};

export { registerNewUser, findUser };
