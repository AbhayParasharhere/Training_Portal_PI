import { createContext, useEffect, useState, useContext } from "react";
import { getCurrentUser } from "../Firebase/chat";
import { AuthContext } from "./authContext";

export const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({
  children,
  newDetailsAdded,
  setNewDetailsAdded,
}) => {
  const currentUser = useContext(AuthContext);
  const [currentUserDetails, setCurrentUserDetails] = useState();

  useEffect(() => {
    if (newDetailsAdded && currentUser && currentUser.uid) {
      console.log("Fetching current user");
      getCurrentUser(setCurrentUserDetails, currentUser.uid)
        .then(() => {
          // Set newDetailsAdded to false after fetching details
          setNewDetailsAdded(false);
        })
        .catch((error) =>
          console.error("Error fetching current user details:", error)
        );
    }
  }, [currentUser, newDetailsAdded]);

  return (
    <CurrentUserContext.Provider value={currentUserDetails}>
      {children}
    </CurrentUserContext.Provider>
  );
};
