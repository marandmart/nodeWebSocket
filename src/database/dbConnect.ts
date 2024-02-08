import { Collection, MongoClient } from "mongodb";
import "dotenv/config";

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

let documentCollection: Collection | null;

if (CONNECTION_STRING && COLLECTION_NAME) {
  const client = new MongoClient(CONNECTION_STRING);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    // @ts-ignore
    documentCollection = db.collection(COLLECTION_NAME);

    console.log("Succesfully connected to database");
  } catch (error: any) {
    console.log({ message: error.message });
  }
} else {
  console.log(
    "Necessary vars to connect to mongoDB are no defined.\n Check README file to know their names and define them."
  );
}

export { documentCollection };
