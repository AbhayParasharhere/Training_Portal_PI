import { db } from "./firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const storeSalesDetails = async (uid, saleDetails, cid) => {
  console.log("In Storing the sales details", uid, saleDetails);

  // create the doc in the collection named userSales with the uid of the user as the doc id
  // and store the sales details in the doc
  try {
    await setDoc(doc(db, "userSales", uid), { ...saleDetails, cid: cid });

    return "User details stored successfully";
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default storeSalesDetails;
