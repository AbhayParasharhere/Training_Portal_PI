import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { v4 } from "uuid";

const saveClientData = async (clientDetails, uid) => {
  try {
    console.log(
      "Data being submitted to save client data: ",
      clientDetails,
      uid
    );
    const clientId = v4();
    await setDoc(doc(db, "clients", clientId), {
      user: uid,
      name: clientDetails.client_name,
      anniversary: clientDetails.client_anniversary,
      DOB: clientDetails.client_DOB,
      gender: clientDetails.client_gender,
      email: clientDetails.client_email,
      address: clientDetails.client_address,
      phone_number: clientDetails.client_number,
    });
    return clientId;
  } catch (err) {
    console.log("Saving client details error: ", err);
  }
};
const saveSalesData = async (salesData, clientId, uid) => {
  try {
    const saveSales = await setDoc(doc(db, "userSales", v4()), {
      ...salesData,
      cid: clientId,
      uid: uid,
    });
    return saveSales;
  } catch (err) {
    console.log("This is the error for yhe sales adding function, ", err);
  }
};
export { saveClientData, saveSalesData };
