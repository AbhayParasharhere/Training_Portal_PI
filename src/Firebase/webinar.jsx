import { setDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { db } from "./firebaseConfig";

const addWebinar = async (data) => {
  try {
    await setDoc(doc(db, "webinars", v4()), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      status: "active",
    });
    toast.success("Webinar added successfully");
  } catch (error) {
    console.log("Error adding webinar:", error.message);
    toast.error("Error adding webinar");
  }
};
// Promise based function to get all webinars in real time
const getAllWebinarsRealTime = (setWebinars) => {
  return new Promise((resolve, reject) => {
    try {
      const unsub = onSnapshot(collection(db, "webinars"), (snapshot) => {
        const webinars = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWebinars(webinars);
        resolve(webinars);
      });
      return unsub;
    } catch (error) {
      console.error("Error getting webinars real time:", error.message);
      reject(error);
    }
  });
};

export { addWebinar, getAllWebinarsRealTime };
