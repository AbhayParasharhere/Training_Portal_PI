import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Functions to get all sales data for a particular user within a particular date range
// direct query to the sales collection
const getSalesData = async (userID, startDate, endDate) => {
  try {
    if (!userID || !startDate || !endDate) {
      throw new Error("Invalid Input");
    }

    console.log(startDate, endDate, "Dates");
    const salesData = [];
    const salesRef = collection(db, "userSales");
    const snapShot = await getDocs(
      query(
        salesRef,
        where("uid", "==", userID),
        where("created_at", ">=", startDate),
        where("created_at", "<=", endDate)
      )
    );
    snapShot.forEach((doc) => {
      salesData.push({ ...doc.data(), id: doc.id });
    });
    return salesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to get all clients data for a particular user within a particular date range
// direct query to the clients collection
const getClientsData = async (userID, startDate, endDate) => {
  try {
    if (!userID || !startDate || !endDate) {
      throw new Error("Invalid Input");
    }

    console.log(startDate, endDate, "Dates");
    const clientsData = [];
    const clientsRef = collection(db, "clients");
    const snapShot = await getDocs(
      query(
        clientsRef,
        where("uid", "==", userID),
        where("created_at", ">=", startDate),
        where("created_at", "<=", endDate)
      )
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

// Function to get the progress for a specified course for a particular user
// In order to do this, we need to store a document in videoProgress collection whenever a user watches a video

// Function to get the total logged in time for a particular user within a particular date range
// In order to do this, we need to store a document in the userDetails document for that user in a subcollection called as loginCount whenever a user logs in
const getLoggedInTime = async (userID, startDate, endDate) => {
  try {
    const loggedInTime = [];
    const loggedInRef = collection(db, "userDetail", userID, "loginCount");
    const snapShot = await getDocs(
      query(
        loggedInRef,
        where("created_at", ">=", startDate),
        where("created_at", "<=", endDate)
      )
    );
    snapShot.forEach((doc) => {
      loggedInTime.push({ ...doc.data(), id: doc.id });
    });
    return loggedInTime;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getSalesData, getClientsData };
