import { documentCollection } from "./dbConnect.js";

const findDocument = async (documentName: string) => {
  if (documentCollection) {
    const foundDocument = await documentCollection.findOne({
      name: documentName,
    });

    if (foundDocument) {
      return foundDocument;
    }
  }
};

const updateDocument = async (documentName: string, updatedText: string) => {
  if (documentCollection) {
    const update = documentCollection.updateOne(
      { name: documentName },
      { $set: { text: updatedText } }
    );
    return update;
  }
};

export { findDocument, updateDocument };
