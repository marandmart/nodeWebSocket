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

export { registerNewUser };
