import { ObjectId } from "mongodb";

type UserAuth = {
  username: string;
  password: string;
};

type UserDocument = {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  salt: string;
};

type NextFunction = (err?: any) => void;

export { UserAuth, UserDocument, NextFunction };
