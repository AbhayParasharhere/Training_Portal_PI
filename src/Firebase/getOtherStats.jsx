import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebaseConfig";

const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "userDetail"));
    const allUsers = [];
    querySnapshot?.forEach((user) => {
      allUsers.push({ ...user.data(), id: user?.id });
    });
    toast.success("Fetched all the users");
    return allUsers;
  } catch (err) {
    console.log(err);
    toast.error("Error fetching users");
  }
};

// Get the completed courses for the specified user id

// Get the total videos watched by the specified user
const getTotalVideosWatched = async (userId) => {
  try {
    const ref = doc(db, "userDetail", userId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      toast.success(
        "Successfully fetched the total videos watched by the specified user"
      );
      console.log(
        "Successfully fetched the total videos watched by the specified user: ",
        docSnap.data()?.video_progress
      );
      return docSnap.data()?.video_progress;
    } else {
      toast.error("No such document exists");
      console.log("No such document exists");
      return null;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching the total videos watched by the specified user"
    );
    console.log(
      "An error occurred while fetching the total videos watched by the specified user: ",
      error
    );
    return error;
  }
};

// Get the total posts created by the specified user in the current week

// Get the total client data for the specified user
const getTotalClientData = async (userId) => {
  try {
    const clientRef = collection(db, "clients");
    const q = query(
      clientRef,
      where("user", "==", userId),
      where("status", "==", "active")
    );
    const clients = [];
    const clientSnapshot = await getDocs(q);
    clientSnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() });
    });
    toast.success(
      "Successfully fetched the total client data for the specified user"
    );
    console.log(
      "Successfully fetched the total client data for the specified user: ",
      clients
    );
    return clients;
  } catch (error) {
    toast.error(
      "An error occurred while fetching the total client data for the specified user"
    );
    console.log(
      "An error occurred while fetching the total client data for the specified user: ",
      error
    );
    return error;
  }
};

// Get weekly added clients for the specified user

// Get yearly added clients for the specified user

// Get the total sales for the specified user
const getTotalSales = async (userId) => {
  try {
    const salesRef = collection(db, "userSales");
    const q = query(
      salesRef,
      where("uid", "==", userId),
      where("status", "==", "active")
    );
    const sales = [];
    const salesSnapshot = await getDocs(q);
    salesSnapshot.forEach((doc) => {
      sales.push({ id: doc.id, ...doc.data() });
    });
    toast.success(
      "Successfully fetched the total sales for the specified user"
    );
    console.log(
      "Successfully fetched the total sales for the specified user: ",
      sales
    );
    return sales;
  } catch (error) {
    toast.error(
      "An error occurred while fetching the total sales for the specified user"
    );
    console.log(
      "An error occurred while fetching the total sales for the specified user: ",
      error
    );
    return error;
  }
};

// Get weekly added sales for the specified user

// Get yearly added sales for the specified user

export {
  getTotalClientData,
  getTotalSales,
  getTotalVideosWatched,
  getAllUsers,
};
