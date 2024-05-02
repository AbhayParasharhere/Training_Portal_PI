import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
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


const getAllUserClientsRealTime = (userID, setClients) => {
  // returns a promise
  return new Promise((resolve, reject) => {
    try {
      if (!userID) {
        throw new Error("Invalid Input");
      }
      const clientsRef = collection(db, "clients");
      const q = query(clientsRef, where("user", "==", userID));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const clientsData = [];
        querySnapshot.forEach((doc) => {
          clientsData.push({ ...doc.data(), id: doc.id });
        });
        setClients(clientsData);
        resolve(clientsData);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export { getAllUserClientsData, getAllUserClientsRealTime, getUserSalesData  };
