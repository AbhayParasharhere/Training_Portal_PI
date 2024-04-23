import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { db } from "./firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { toast } from "react-toastify";
// import { FacebookAuthProvider } from "firebase/auth/cordova";

const signInEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return "Success";
  } catch (error) {
    toast.error("Invalid Credentials");
    console.error(error);
    return "Failed";
  }
};

// store the additional details in the userDetail collection
const storeUserAdditionalDetails = async (uid, additionalDetails) => {
  console.log("In auth storeAdditional details", uid, additionalDetails);

  // create the doc in the collection named userDetail with the uid of the user as the doc id
  // and store the additional details in the doc
  try {
    await setDoc(doc(db, "userDetail", uid), additionalDetails);

    return "User details stored successfully";
  } catch (error) {
    console.error(error);

    return "Failed";
  }
};

// Get the current details of the user
const getUserDetails = async (uid) => {
  try {
    const docRef = doc(db, "userDetail", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      throw new Error("No such used details!");
    }
  } catch (error) {
    console.log(error);
    return "Failed";
  }
};

// Return the uid of the user
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;
    console.log("This is the uid: ", uid);
    return uid;
  } catch (error) {
    toast.error("Failed to sign up, please try again.");
    console.error(error);
    return "Failed";
  }
};

const signInwithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    return "Success";
  } catch (error) {
    console.log(error);
    return "Failed";
  }
};
const signInwithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    console.log("This is the provider: ", provider, "Auth: ", auth);
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    return "Success";
  } catch (error) {
    console.log(error);
    return "Failed";
  }
};

export {
  getUserDetails,
  signInEmailAndPassword,
  signUpWithEmailAndPassword,
  signInwithGoogle,
  storeUserAdditionalDetails,
  signInwithFacebook,
};
