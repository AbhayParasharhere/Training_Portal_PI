import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import { getAllAnnouncementsSortedByUpdatedAtDescendingRealTimePromise } from "../Firebase/announcementLogic";
import { get, set } from "firebase/database";
import { getAllCourses } from "../Firebase/courseLogic";
import {
  getAllUserClientsData,
  getUserSalesData,
  getAllUserClientsRealTime,
} from "../Firebase/getClientSales";
// We will use this context to fetch the primary data
// All announcements
// All the user details
// All the enrolled courses
// All the appoitments
// All the clients
// All the sales

/// Change to be made
// Login count should be an array of dates in the user details
// Videos watched array in user details containing the video id unordered
// Must be done in the coruse-page with link state containing the clicked course inner data when clicking the course
// announcement feature to be added

export const PrimaryDataContext = createContext();
export const PrimaryDataContextProvider = ({ children }) => {
  const [primaryData, setPrimaryData] = useState({});
  const [userClients, setUserClients] = useState();
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
    getAllCourses().then((courses) => {
      setPrimaryData((primaryData) => ({ ...primaryData, courses }));
    });

    // Fetch all the appointments
    // Fetch all the clients
    getAllUserClientsRealTime(currentUser.uid, setUserClients).then(
      (clients) => {
        setPrimaryData((primaryData) => ({ ...primaryData, clients }));
      }
    );

    // Fetch all the sales
    getUserSalesData(currentUser?.uid).then((sales) => {
      setPrimaryData((primaryData) => ({
        ...primaryData,
        sales,
      }));
    });
  }, [currentUser]);
  console.log(
    "This is the clients in primar data function: ",
    primaryData?.clients
  );

  return (
    <PrimaryDataContext.Provider value={primaryData}>
      {children}
    </PrimaryDataContext.Provider>
  );
};
