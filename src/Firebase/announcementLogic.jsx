import {
  collection,
  doc,
  query,
  setDoc,
  where,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { v4 } from "uuid";
import secureLocalStorage from "react-secure-storage";
// Function to create an annoucement from the announcement object as the input
// which contains the announcement title, announcement description, uid of the user who created the announcement
const createAnnouncement = async (announcementData) => {
  const createdTimestamp = new Date();
  const updatedTimestamp = new Date();
  try {
    const currentUserName = secureLocalStorage.getItem("userDetails");
    console.log(
      "currentUserName",
      currentUserName,
      secureLocalStorage.getItem("userDetails")
    );
    // announcementData.created_by =
    if (!announcementData || announcementData?.created_by === undefined) {
      throw new Error("Invalid announcement data");
    }
    // there is a collection named announcements in the database
    // create a new document in the collection with the announcementData as the data

    await setDoc(doc(db, "announcements", v4()), {
      ...announcementData,
      created_at: createdTimestamp,
      updated_at: updatedTimestamp,
      status: "active",
    });

    return "Announcement created successfully";
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Function to get all the announcements of the specified user id
const getAllUserAnnouncements = async (uid) => {
  try {
    const announcementRef = collection(db, "announcements");
    const userAnnouncements = [];
    const userAnnouncementsSnapshot = await getDocs(
      query(
        announcementRef,
        where("user_id", "==", uid),
        where("status", "!=", "deleted"),
        orderBy("updated_at", "desc"),
        limit(500)
      )
    );

    userAnnouncementsSnapshot.forEach((doc) => {
      userAnnouncements.push({ id: doc.id, ...doc.data() });
    });

    return userAnnouncements;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to get all the announcements from the database sorted by the created date of the announcements
// in descending order and limit the number of announcements to 500
// Make sure the status of the announcement is not deleted
const getAllAnnouncementsSortedByUpdatedAtDescending = async () => {
  try {
    const announcementRef = collection(db, "announcements");
    const announcements = [];

    // Limit the number of announcements to 500
    const announcementsSnapshot = await getDocs(
      query(
        announcementRef,
        where("status", "!=", "deleted"),
        orderBy("updated_at", "desc"),
        limit(500)
      )
    );
    announcementsSnapshot.forEach((doc) => {
      announcements.push({ id: doc.id, ...doc.data() });
    });

    return announcements;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to get all the announcements from the database sorted by the created date of the announcements
// in descending order and limit the number of announcements to 500
// Make sure the status of the announcement is not deleted
const getAllAnnouncementsSortedByUpdatedAtDescendingRealTime = (
  setAnnouncements
) => {
  try {
    const announcementRef = collection(db, "announcements");

    // Create a query with the necessary conditions
    const announcementQuery = query(
      announcementRef,
      where("status", "!=", "deleted"),
      orderBy("updated_at", "desc"),
      limit(500)
    );

    // Set up an onSnapshot listener for real-time updates
    const unsubscribe = onSnapshot(
      announcementQuery,
      (announcementsSnapshot) => {
        const announcements = [];

        announcementsSnapshot.forEach((doc) => {
          announcements.push({ id: doc.id, ...doc.data() });
        });

        console.log("Announcements from real-time listener", announcements);
        // Update the state with the new list of announcements
        setAnnouncements(announcements);
      }
    );

    // Return the unsubscribe function to allow stopping the listener if needed
    return unsubscribe;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Promise version of the real-time listener function
// Function to get all the announcements from the database sorted by the created date of the announcements
// in descending order and limit the number of announcements to 500
export const getAllAnnouncementsSortedByUpdatedAtDescendingRealTimePromise = (
  setAnnouncements
) => {
  return new Promise((resolve, reject) => {
    try {
      const announcementRef = collection(db, "announcements");

      // Create a query with the necessary conditions
      const announcementQuery = query(
        announcementRef,
        where("status", "!=", "deleted"),
        orderBy("updated_at", "desc"),
        limit(500)
      );

      // Set up an onSnapshot listener for real-time updates
      const unsubscribe = onSnapshot(
        announcementQuery,
        (announcementsSnapshot) => {
          const announcements = [];

          announcementsSnapshot.forEach((doc) => {
            announcements.push({ id: doc.id, ...doc.data() });
          });

          console.log("Announcements from real-time listener", announcements);

          setAnnouncements(announcements);

          // Resolve the promise with the new list of announcements
          resolve(announcements);
        }
      );

      // Return the unsubscribe function to allow stopping the listener if needed
      return unsubscribe;
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// NOTE : The update function does not check if the announcement id was created by the current user, it just updates the announcement
// Function to update a specfic announcement from the document id of the announcement and the updated announcement object as the input
// which contains the announcement title, announcement description
const updateAnnouncement = async (announcementID, announcementData) => {
  try {
    // Check if announcement data just contains the title and description and not any other keys and is not empty
    // Ensure announcementData is not empty and is an object
    if (
      !announcementData ||
      typeof announcementData !== "object" ||
      !announcementID
    ) {
      console.log(
        "Invalid announcement id or announcement data",
        announcementID,
        announcementData
      );
      throw new Error(
        "Invalid announcement id or announcement data",
        announcementID,
        announcementData
      );
    }

    // Check if announcementData has only one key or two keys
    if (
      Object.keys(announcementData).length !== 1 &&
      Object.keys(announcementData).length !== 2
    ) {
      console.log(
        "Invalid announcement data, extra keys or 0 keys found",
        announcementData
      );
      throw new Error(
        "Invalid announcement data, extra keys or 0 keys found",
        announcementData
      );
    }

    // Check if announcementData contains only 'title' or 'description' key(s)
    const validKeys = ["title", "description"];
    const dataKeys = Object.keys(announcementData);
    for (const key of dataKeys) {
      if (!validKeys.includes(key)) {
        console.log(
          "Invalid announcement data, invalid key found",
          key,
          announcementData
        );
        throw new Error(
          "Invalid announcement data, invalid key found",
          key,
          announcementData
        );
      }
    }

    const updatedTimestamp = new Date().toISOString();

    // Update the announcement with the announcementData
    await updateDoc(doc(db, "announcements", announcementID), {
      ...announcementData,
      updated_at: updatedTimestamp,
    });
    return "Announcement updated successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};

// NOTE : The delete function does not check if the announcement id was created by the current user, it just deletes the announcement
// It is a SOFT DELETE, the announcement is not removed from the database but is marked as deleted
// Function to delete a specfic announcement from the document id of the announcement as the input
const deleteAnnouncement = async (announcementID) => {
  try {
    await updateDoc(doc(db, "announcements", announcementID), {
      status: "deleted",
    });
    return "Announcement deleted successfully";
  } catch (error) {
    console.log(error);
    console.log(error);
    return error;
  }
};

export {
  createAnnouncement,
  getAllUserAnnouncements,
  getAllAnnouncementsSortedByUpdatedAtDescending,
  getAllAnnouncementsSortedByUpdatedAtDescendingRealTime,
  updateAnnouncement,
  deleteAnnouncement,
};
