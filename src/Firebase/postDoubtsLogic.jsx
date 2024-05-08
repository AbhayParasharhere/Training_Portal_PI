import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebaseConfig";
import { v4 } from "uuid";

// Add posts for a given user
const postDoubts = async (postData) => {
  try {
    if (!postData) throw new Error("Invalid parameters");
    await setDoc(doc(db, "postedDoubts", v4()), {
      ...postData,
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    });
    toast.success("Doubt posted successfully");
  } catch (error) {
    console.log("Error posting doubt", error);
    toast.error("Could not post the doubt. Please try again later.");
  }
};

// Add a comment to a post
const addComment = async (commentData, postId) => {
  try {
    if (!commentData) throw new Error("Invalid parameters");
    await updateDoc(doc(db, "postedDoubts", postId), {
      comments: arrayUnion({
        commentId: v4(),
        ...commentData,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      }),
    });
    toast.success("Comment added successfully");
  } catch (error) {
    console.log("Error adding comment", error);
    toast.error("Could not add the comment. Please try again later.");
  }
};

// Get realtime updates of posts
// Returns a promise
const getPostedDoubtsRealtime = async (setPosts) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Getting doubts real time");
      const unsub = onSnapshot(collection(db, "postedDoubts"), (snapshot) => {
        const doubts = [];
        snapshot.forEach((doc) => {
          doubts.push({ ...doc.data(), id: doc.id });
        });
        // Set the posts in the state
        setPosts(doubts);

        resolve(doubts);
      });

      return unsub;
    } catch (error) {
      console.error("Error getting doubts real time:", error.message);
      reject(error);
    }
  });
};
const getLastWeekPostRealTime = async (
  setLastWeekUserPost,
  uid,
  mondayDate
) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Getting doubts real time: ", uid, "date: ", mondayDate);
      const currentDate = new Date();
      mondayDate.setHours(0, 0, 0, 0);
      // Set hours, minutes, seconds, and milliseconds to 0 to compare dates only
      currentDate.setHours(0, 0, 0, 0);
      const queryPost = query(
        collection(db, "postedDoubts"),
        where("uid", "==", uid),
        where("created_at", "<=", currentDate),
        where("created_at", ">=", mondayDate)
      );
      const unsub = onSnapshot(queryPost, (snapshot) => {
        const doubts = [];
        snapshot.forEach((doc) => {
          doubts.push({ ...doc.data(), id: doc.id });
        });
        console.log("last week posts: ", doubts);
        // Set the posts in the state
        setLastWeekUserPost(doubts);

        resolve(doubts);
      });

      return unsub;
    } catch (error) {
      console.error("Error getting doubts real time:", error.message);
      reject(error);
    }
  });
};
export {
  postDoubts,
  getPostedDoubtsRealtime,
  addComment,
  getLastWeekPostRealTime,
};
