import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import Home from "./components/Home";
import StatsSummary from "./components/SatisticsSummary";
import TabletImportantUpdates from "./components/TabletImportantUpdates";
import { AuthContext } from "../../context/authContext";
import { getUserDetails } from "../../Firebase/authentication";
import { getAllAnnouncementsSortedByUpdatedAtDescendingRealTime } from "../../Firebase/announcementLogic";
import { set } from "firebase/database";

// Backend information to pass to the components
//-DONE User name. user profile image
// All appointments -> appointment date, appointment time, appointment client name, meeting name
// Client list -> client name, client birthday, client profile image
// An object which contains the sale of the user     { name: "M", value: "12" },
// { name: "T", value: "5" },
// { name: "W", value: "9" },
// { name: "T", value: "15" },
// { name: "F", value: "6" },
// { name: "S", value: "9" },
// { name: "S", value: "7" },
// Announcement List -> announcement title, announcement description, announcement modified date,  name of person to create the announcement

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const currentUser = useContext(AuthContext);
  const [isListenerSetUp, setIsListenerSetUp] = useState(false); // State to track if the listener is set up

  // console.log("Current User", currentUser);

  useEffect(() => {
    if (!currentUser || isListenerSetUp) return;

    const { uid } = currentUser;

    async function fetchData() {
      try {
        // Fetch user details
        const userDetails = await getUserDetails(uid);
        setUserDetails(userDetails);
        // console.log("User Info", uid, userDetails);

        // Start real-time listener for announcements
        const unsubscribe =
          getAllAnnouncementsSortedByUpdatedAtDescendingRealTime(
            setAnnouncements
          );
        console.log("Announcements listener startedssss");

        // Set the flag to true, indicating that the listener is set up

        setIsListenerSetUp(true);

        // Return the unsubscribe function to clean up the listener on unmount
        return unsubscribe;
      } catch (error) {
        console.error(error);
      }
    }

    const cleanup = fetchData();
    // Return the cleanup function from the effect to stop the real-time listener when the component unmounts
    return () => {
      if (cleanup) {
        console.log("Unsubscribing from announcements listener");
        // Reset the flag since we are cleaning up
        setIsListenerSetUp(false);
        return cleanup;
      }
    };
  }, [currentUser]);

  // console.log("Announcements", announcements);

  return (
    <div className={styles["dashboard--main-container"]}>
      <div className={styles["dashboard--main-inner-container"]}>
        <Home userDetails={userDetails} announcements={announcements} />
        <StatsSummary userDetails={userDetails} />
      </div>
      <TabletImportantUpdates announcements={announcements} />
    </div>
  );
}
