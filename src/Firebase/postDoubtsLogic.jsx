import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebaseConfig";
import { v4 } from "uuid";

// Add posts for a given user
const postDoubts = async (uid, category, description) => {
  try {
    if (!uid || !category || !description)
      throw new Error("Invalid parameters");
    await setDoc(doc(db, "postedDoubts", v4()), {
      uid,
      category,
      doubt: description,
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

export { postDoubts };
