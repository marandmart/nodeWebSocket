import { Collection, MongoClient } from "mongodb";
import "dotenv/config";

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DOCUMENT_COLLECTION = process.env.DOCUMENT_COLLECTION;
const USER_COLLECTION = process.env.USER_COLLECTION;

let documentCollection: Collection | null, userCollection: Collection | null;

if (CONNECTION_STRING && DOCUMENT_COLLECTION) {
  const client = new MongoClient(CONNECTION_STRING);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    // @ts-ignore
    documentCollection = db.collection(DOCUMENT_COLLECTION);
    // @ts-ignore
    userCollection = db.collection(USER_COLLECTION);

    console.log("Succesfully connected to database");
  } catch (error: any) {
    console.log({ message: error.message });
  }
} else {
  console.log(
    "Necessary vars to connect to mongoDB are no defined.\n Check README file to know their names and define them."
  );
}

export { documentCollection, userCollection };
