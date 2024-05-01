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
const getUserSalesData = async (userID) => {
  try {
    if (!userID) {
      throw new Error("Invalid Input");
    }

    const salesData = [];
    const salesRef = collection(db, "userSales");
    const snapShot = await getDocs(query(salesRef, where("uid", "==", userID)));
    snapShot.forEach((doc) => {
      salesData.push({ ...doc.data(), id: doc.id });
    });
    return salesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getAllUserClientsData, getUserSalesData };
