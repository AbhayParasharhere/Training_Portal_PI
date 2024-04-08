import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { v4 } from "uuid";
// Function to create an annoucement from the announcement object as the input
// which contains the announcement title, announcement description, uid of the user who created the announcement
const createAnnouncement = async (announcementData) => {
  const createdTimestamp = new Date().toISOString();
  const updatedTimestamp = new Date().toISOString();
  try {
    // there is a collection named announcements in the database
    // create a new document in the collection with the announcementData as the data

    const response = await setDoc(doc(db, "announcements", v4()), {
      ...announcementData,
      created_at: createdTimestamp,
      updated_at: updatedTimestamp,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
// Function to update a specfic announcement from the document id of the announcement and the updated announcement object as the input
// which contains the announcement title, announcement description, uid of the user who created the announcement

// Function to delete a specfic announcement from the document id of the announcement as the input

// Function to get all the announcements from the database sorted by the created date of the announcements

export { createAnnouncement };
