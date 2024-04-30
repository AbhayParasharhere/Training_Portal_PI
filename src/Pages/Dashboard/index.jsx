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
import { PrimaryDataContext } from "../../context/primaryDataContext";

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
  // console.log("Current User", currentUser);

  return (
    <div className={styles["dashboard--main-container"]}>
      <div className={styles["dashboard--main-inner-container"]}>
        <Home userDetails={userDetails} />
        <StatsSummary userDetails={userDetails} />
      </div>
      <TabletImportantUpdates userDetails={userDetails} />
    </div>
  );
}
