import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { createContext, useEffect, useState } from "react";
import { getUserDetails } from "../Firebase/authentication";
import secureLocalStorage from "react-secure-storage";

export const AuthContext = createContext();
{
  /*This function is to get the current user and that current user is accessable by every file in this project
    as the child of AuthContext.Procider function is set to be the App component
*/
}
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const getAndSaveUserDetails = async (uid) => {
    if (!uid) return;

    const { name, photoURL } = await getUserDetails(uid);
    const userName = name || "Broker";
    const userPhoto =
      photoURL ||
      "https://firebasestorage.googleapis.com/v0/b/trainingportalpi.appspot.com/o/userPhoto%2FtOslDTjJEMXQFC1JxvDM1LoItaS2.jpg?alt=media&token=00af2fdd-b286-448b-a674-0f644ab23ccf";
    secureLocalStorage.setItem("userDetails", [userName, userPhoto]);
    console.log(
      "Auth context: User Details JSON",
      secureLocalStorage.getItem("userDetails")
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Context User", user);
      setCurrentUser(user);

      // Save the user in the local storage
      getAndSaveUserDetails(user?.uid);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
