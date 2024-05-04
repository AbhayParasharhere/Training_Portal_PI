import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateSales = async (updatedSales, salesId) => {
  try {
    const salesRef = doc(db, "userSales", salesId); // Assuming db is your Firestore instance
    await updateDoc(salesRef, updatedSales);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const updateClient = async (updatedClient, clientId) => {
  try {
    const clientRef = doc(db, "clients", clientId); // Assuming db is your Firestore instance
    await updateDoc(clientRef, updatedClient);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export { updateSales, updateClient };
