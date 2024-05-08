import {
  where,
  setDoc,
  doc,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { db } from "./firebaseConfig";

const addAppointments = async (data) => {
  try {
    const appointmentId = v4();
    console.log("This is the appoitment id: ", appointmentId);
    await setDoc(doc(db, "webinars", appointmentId), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      status: "active",
      type: "appointment",
    });
  } catch (error) {
    console.log("Error adding appointments:", error.message);
  }
};
// Promise based function to get all webinars in real time
const getAllAppointmentsRealTime = (setWebinars, uid) => {
  return new Promise((resolve, reject) => {
    try {
      const q = query(
        collection(db, "webinars"),
        where("status", "==", "active"),
        where("type", "==", "appointment"),
        where("uid", "==", uid)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const appointments = [];
        snapshot.forEach((doc) => {
          appointments.push({ ...doc.data(), id: doc.id });
        });
        setWebinars(appointments);
        resolve(appointments);
      });
      return unsub;
    } catch (error) {
      console.error("Error getting appointments real time:", error.message);
      reject(error);
    }
  });
};

export { addAppointments, getAllAppointmentsRealTime };
