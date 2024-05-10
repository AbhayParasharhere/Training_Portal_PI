import { auth, storage } from "./firebaseConfig";
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
import { acceptInvite } from "./inviteLogic";
import firebase from "firebase/compat/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { FacebookAuthProvider } from "firebase/auth/cordova";

const signInEmailAndPassword = async (email, password, setLoading) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { status: "Success", uid: userCredential.user.uid };
  } catch (error) {
    setLoading(false);
    toast.error("Invalid Credentials");

    console.error(error);
    return "Failed";
  }
};

// store the additional details in the userDetail collection
const storeUserAdditionalDetails = async (uid, additionalDetails, photo) => {
  console.log("In auth storeAdditional details", uid, additionalDetails, photo);

  // create the doc in the collection named userDetail with the uid of the user as the doc id
  // and store the additional details in the doc
  try {
    // Upload the photo to the firebase storage
    let photoUrl = null;
    if (photo) {
      console.log("Uploading photo", photo);
      const storageRef = ref(storage, `userPhoto/${uid}`);
      await uploadBytes(storageRef, photo);
      console.log("Photo uploaded successfully");
      photoUrl = await getDownloadURL(storageRef);
      console.log("Photo URL: ", photoUrl);
      if (photoUrl) {
        additionalDetails.photoURL = photoUrl;
      }
    }
    await setDoc(doc(db, "userDetail", uid), additionalDetails);

    toast.success("Details stored successfully");
    return "User details stored successfully";
  } catch (error) {
    console.error(error);
    toast.error("Failed to store your details");
    return "Failed";
  }
};

// Get the current details of the user
const getUserDetails = async (uid) => {
  try {
    const docRef = doc(db, "userDetail", uid);
    const docSnap = await getDoc(docRef);
    console.log("USERDETAILS This is the docSnap: ", docSnap.data());
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

// Check if the user email exists

// Return the uid of the user
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userIsInvited = await acceptInvite(email);
    console.log("This is the userIsInvited: ", userIsInvited);
    if (userIsInvited !== "Invite checked successfully") {
      throw new Error("Invitation error.");
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      console.log("This is the uid: ", uid);
      return uid;
    }
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("User with this email, already exists, please login", {
        autoClose: 9000,
      });
      return "User exists";
    }

    toast.error("Failed to sign up, please try again.");
    console.error(error);
    return "Failed";
  }
};

const signInwithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    // Check if the user is created for the first time
    // If yes then check if the user is invited
    // If not delete the user
    console.log(
      "Check first time creation",
      auth.currentUser.metadata.creationTime ===
        auth.currentUser.metadata.lastSignInTime
    );
    if (
      auth.currentUser.metadata.creationTime ===
      auth.currentUser.metadata.lastSignInTime
    ) {
      console.log("User is created for the first time");
      const userIsInvited = await acceptInvite(auth.currentUser.email);
      console.log("This is the userIsInvited: ", userIsInvited);
      if (userIsInvited !== "Invite checked successfully") {
        console.log("User is not invited");
        await auth.currentUser.delete();
        return "Failed";
      }
    }

    return { status: "Success", uid: res.user.uid };
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
    return { status: "Success", uid: res.user.uid };
  } catch (error) {
    console.log(error);
    return "Failed";
  }
};

// Check if we already have the user in the database by checking in userDEtails collection
const checkIfUserExists = async (uid) => {
  if (!uid) {
    console.log("Failed to get user details as uid is not provided");
    return "Failed";
  }
  const userDetails = await getUserDetails(uid);

  if (userDetails === "Failed") {
    console.log("Failed to get user details");
    return "Failed";
  }
  return userDetails;
};

export {
  getUserDetails,
  signInEmailAndPassword,
  signUpWithEmailAndPassword,
  signInwithGoogle,
  storeUserAdditionalDetails,
  signInwithFacebook,
  checkIfUserExists,
};
