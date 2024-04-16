import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
{
  /*This function is to get the current user and that current user is accessable by every file in this project
    as the child of AuthContext.Procider function is set to be the App component
*/
}
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      //   console.log(user);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
