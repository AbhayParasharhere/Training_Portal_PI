import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
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

// For a given courseId, video ID and user ID, we need to store the video progress
// Store a document qith video id in videProgress subcollection in teh userDEtails collections for the current userDocument
// The document should have the video ID and the timestamp of the video watched
const storeVideoProgress = async (userID, courseId, videoID) => {
  try {
    console.log(userID, courseId, videoID, "Details");
    await updateDoc(doc(db, "userDetail", userID), {
      video_progress: arrayUnion({ videoID, courseId, created_at: new Date() }),
    });
    return "Success in storing video progress";
  } catch (error) {
    console.log("Could not save video progress", error);
    return error;
  }
};

// Get all videos that are watched by a user within a particular date range
const getVideosWatched = async (userID, startDate, endDate) => {
  try {
    const videosWatched = [];
    const videosRef = collection(db, "userDetails", userID, "videoProgress");
    const snapShot = await getDocs(
      query(
        videosRef,
        where("created_at", ">=", startDate),
        where("created_at", "<=", endDate)
      )
    );
    snapShot.forEach((doc) => {
      videosWatched.push({ ...doc.data(), id: doc.id });
    });
    return { data: videosWatched, count: videosWatched.length };
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Function to the get the total videos by a user within a particular date range

export { getSalesData, getClientsData, storeVideoProgress, getVideosWatched };
