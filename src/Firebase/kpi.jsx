import { query, where } from "firebase/firestore";
import { doc } from "./firebaseConfig";

// Functions to get all sales data for a particular user within a particular date range
// direct query to the sales collection
const getSalesData = async (userID, startDate, endDate) => {
  try {
    if (!userID || !startDate || !endDate) {
      throw new Error("Invalid Input");
    }
    const salesData = [];
    const salesRef = doc.collection("sales");
    const snapShot = query(
      salesRef,
      where("uid", "==", userID),
      where("created_at", ">=", startDate),
      where("created_at", "<=", endDate)
    );
    snapShot.forEach((doc) => {
      salesData.push(doc.data());
    });
    return salesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to get all clients data for a particular user within a particular date range
// direct query to the clients collection

// Function to get the progress for a specified course for a particular user
// In order to do this, we need to store a document in videoProgress collection whenever a user watches a video

// Function to get the total logged in time for a particular user within a particular date range
// In order to do this, we need to store a document in the userDetails document for that user in a subcollection called as loginCount whenever a user logs in
