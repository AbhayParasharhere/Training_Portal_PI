import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebaseConfig";

const updateNameAndPhoto = async (uid, name, photo) => {
  try {
    toast.info("Updating profile details");
    let photoUrl = null;
    if (photo) {
      console.log("Uploading photo", photo);
      const storageRef = ref(storage, `userPhoto/${uid}`);
      await uploadBytes(storageRef, photo);
      console.log("Photo uploaded successfully");
      photoUrl = await getDownloadURL(storageRef);
      console.log("Photo URL: ", photoUrl);
    }
    const userDetailsRef = doc(db, "userDetail", uid);
    let updatedUserDetails = {};
    if (name) {
      updatedUserDetails = { ...updatedUserDetails, name };
    }
    if (photoUrl !== null && photoUrl !== undefined && photoUrl !== "") {
      updatedUserDetails = { ...updatedUserDetails, photoURL: photoUrl };
    }

    await updateDoc(userDetailsRef, updatedUserDetails);
    toast.success(
      "Profile details updated successfully. Refresh the page to see changes"
    );
  } catch (error) {
    toast.error("Error updating profile details");
    console.log("Error updating profile details: ", error);
    return "Failed";
  }
};

export { updateNameAndPhoto };
