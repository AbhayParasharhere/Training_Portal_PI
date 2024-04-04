import { db } from "./firebaseConfig";
import { setDoc, doc, onSnapshot, collection } from "firebase/firestore";

const storeClientsDetails = async (uid, cid, clientDetails) => {
  console.log("In Storing the client details", uid, cid, clientDetails);

  // create the doc in the collection named userSales with the uid of the user as the doc id
  // and store the sales details in the doc

  try {
    await setDoc(doc(db, "clients", cid), clientDetails);
    return "client details stored successfully";
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getAllClients = async () => {
  onSnapshot(collection(db, "clients"), (response) => {
    response.docs.map((docs) => {
      console.log({ ...docs.data(), id: docs });
    });
  });
};
export { storeClientsDetails, getAllClients };
