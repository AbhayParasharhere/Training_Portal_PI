import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
const getAllUserClientsData = async (userID) => {
  try {
    if (!userID) {
      throw new Error("Invalid Input");
    }

    const clientsData = [];
    const clientsRef = collection(db, "clients");
    const snapShot = await getDocs(
      query(clientsRef, where("user", "==", userID))
    );
    snapShot.forEach((doc) => {
      clientsData.push({ ...doc.data(), id: doc.id });
    });
    return clientsData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { getAllUserClientsData };
