import { ObjectId } from "mongodb";

interface UserAuth {
  username: string;
  password: string;
}

interface UserDocument {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  salt: string;
}

interface ActiveDocumentData {
  username: string;
  documentName: string;
}

interface NextFunction {
  (err?: any): void;
}

export { UserAuth, UserDocument, NextFunction, ActiveDocumentData };
