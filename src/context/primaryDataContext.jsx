import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import { getAllAnnouncementsSortedByUpdatedAtDescendingRealTimePromise } from "../Firebase/announcementLogic";
import { set } from "firebase/database";
// We will use this context to fetch the primary data
// All announcements
// All the user details
// All the enrolled courses
// All the appoitments
// All the clients
// All the sales

/// Change to be made
// Video array in the course unordered
// Login count should be an array of dates in the user details
// Videos watched array in user details containing the video id unordered

export const PrimaryDataContext = createContext();
export const PrimaryDataContextProvider = ({ children }) => {
  const [primaryData, setPrimaryData] = useState({});
  const currentUser = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter((counter) => counter + 1);
    console.log("Primary Data Context Ran", counter);
    if (!currentUser) return;
    // Fetch all the data from the firestore
    // Fetch all the announcements
    getAllAnnouncementsSortedByUpdatedAtDescendingRealTimePromise(
      setAnnouncements
    )
      .then((announcements) => {
        setPrimaryData((primaryData) => ({ ...primaryData, announcements }));
        // console.log("Announcements promise", announcements);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });

    // Fetch all the enrolled courses
    // Fetch all the appointments
    // Fetch all the clients
    // Fetch all the sales
  }, [currentUser]);

  return (
    <PrimaryDataContext.Provider value={primaryData}>
      {children}
    </PrimaryDataContext.Provider>
  );
};
