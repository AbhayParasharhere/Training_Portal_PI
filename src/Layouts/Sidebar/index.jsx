import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Spinner from "../../CommonComponents/Spinner";

export default function SidebarLayout() {
  const [logOut, setLogout] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
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
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigate("/login");
      }
    });
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
          {mobileSidebar ? null : <Outlet />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
