import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Spinner from "../../CommonComponents/Spinner";
import { RealTimeDataContext } from "../../context/primaryDataContext";

export default function SidebarLayout() {
  const [logOut, setLogout] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const realTimeData = useContext(RealTimeDataContext);
  const [dataFetched, setDataFetched] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

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
  const location = useLocation();
  console.log("This is the route: ", location?.pathname);
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const [indexRoute, setIndexRoute] = useState(false);
  useEffect(() => {
    if (location.pathname === "/") {
      setIndexRoute(true);
    } else {
      setIndexRoute(false);
    }
  }, [location]);

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
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigate("/login");
      }
    });
  }, [currentUser]);
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div
      className={styles["sidebarLayout--main-container"]}
      style={{ backgroundColor: indexRoute ? "#F5F6FB" : "white" }}
    >
      {loggedIn ? (
        <>
          <Sidebar
            logout={handleLogout}
            mobileSidebar={mobileSidebar}
            setMobileSidebar={setMobileSidebar}
          />
          {mobileSidebar ? null : dataFetched ? (
            <Outlet
              context={{
                allMessages: allMessages,
                setAllMessages: setAllMessages,
              }}
            />
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
