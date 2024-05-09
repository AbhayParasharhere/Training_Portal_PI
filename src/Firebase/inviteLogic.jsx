import { update } from "firebase/database";
import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Function to invite members to the platform
// It will be called by the admin to invite a user to the platform using their email
// The document id will be the user's email of the user
// Initially the status will be pending and the user will be able to join the platform
// It will also contain the creation date
const inviteUser = async (email) => {
  try {
    const docRef = doc(db, "invitedMembers", email);
    const createdAt = new Date();

    if (
      (await getDoc(docRef)).exists() &&
      (await getDoc(docRef)).data().status === "registered"
    ) {
      toast.error("Email Already Invited");
      return "User already invited";
    }

    await setDoc(docRef, { status: "invited", CreatedAt: createdAt });
    toast.success("User Invited");
    return "User invited successfully";
  } catch (error) {
    console.log(error);
    toast.error("Error Sending Invite");

    return error;
  }
};

// Function so that the user can accept the invitation
// This will accept the user email
// Check if the doc exists in the invitedMembers collection and
// status is pending then change the status to registered
// and check if the created_at is within a week
const acceptInvite = async (email) => {
  try {
    const invitedDoc = await getDoc(doc(db, "invitedMembers", email));
    if (!invitedDoc.exists()) {
      toast.error(
        "Your email is not invited, please ask the admin to invite you.",
        {
          autoClose: 5000,
        }
      );
      return "User not invited";
    }
    const createdAt = new Date(invitedDoc.data()?.CreatedAt);

    const currentDateTime = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds =
      currentDateTime?.getTime() - createdAt?.getTime();

    // Calculate a week's worth of milliseconds
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    if (differenceInMilliseconds > oneWeekInMilliseconds) {
      toast.error(
        "The invitation has expired, please ask the admin to re-invite you.",
        {
          autoClose: 5000,
        }
      );
      return "Invitation expired";
    }

    return "Invite checked successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { inviteUser, acceptInvite };
