import { createContext, useEffect, useState, useContext, unsub } from "react";
import { getCurrentUser } from "../Firebase/chat";
import { AuthContext } from "./authContext";

{
  /*This function is to get the current user details and that current user is accessable by every file in this project
      as the child of AuthContext.Procider function is set to be the App component
  */
}

export const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const currentUser = useContext(AuthContext);

  const [currentUserDetails, setCurrentUserDetails] = useState();
  useEffect(() => {
    getCurrentUser(setCurrentUserDetails, currentUser?.uid);

    return () => {
      null;
    };
  }, [currentUser]);
  return (
    <CurrentUserContext.Provider value={currentUserDetails}>
      {children}
    </CurrentUserContext.Provider>
  );
};
