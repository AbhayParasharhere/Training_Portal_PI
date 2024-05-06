import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getAuth, signOut } from "firebase/auth";
import Spinner from "../../CommonComponents/Spinner";
import { RealTimeDataContext } from "../../context/primaryDataContext";

export default function SidebarLayout() {
  const [logOut, setLogout] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const realTimeData = useContext(RealTimeDataContext);
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    if (
      realTimeData?.announcements &&
      realTimeData?.webinars &&
      realTimeData?.clients &&
      realTimeData?.sales
    ) {
      setDataFetched(true);
    }
  }, [realTimeData]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  const handleLogout = () => {
    const authTest = getAuth();
    console.log("working");
    signOut(authTest)
      .then(() => {
        setLogout(true);
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };
  useEffect(() => {
    if (!currentUser?.uid) {
      navigate("/login");
    } else {
      setLoggedIn(true);
    }
  }, [currentUser]);

  return (
    <div className={styles["sidebarLayout--main-container"]}>
      {loggedIn ? (
        <>
          <Sidebar
            logout={handleLogout}
            mobileSidebar={mobileSidebar}
            setMobileSidebar={setMobileSidebar}
          />
          {mobileSidebar ? null : dataFetched ? <Outlet /> : <Spinner />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
