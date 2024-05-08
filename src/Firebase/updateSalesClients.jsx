import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { toast } from "react-toastify";

const updateSales = async (updatedSales, salesId) => {
  try {
    const salesRef = doc(db, "userSales", salesId); // Assuming db is your Firestore instance
    await updateDoc(salesRef, { ...updatedSales, updated_at: new Date() });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const updateClient = async (updatedClient, clientId) => {
  try {
    console.log(
      "Hello this is running with this data: ",
      updatedClient,
      clientId
    );
    const clientRef = doc(db, "clients", clientId); // Assuming db is your Firestore instance
    await updateDoc(clientRef, { ...updatedClient, updated_at: new Date() });
    console.log("Document successfully updated!");
  } catch (error) {
    toast.error("Error updating document: ", error);
  }
};

export { updateSales, updateClient };
