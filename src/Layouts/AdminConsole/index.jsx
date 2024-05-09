import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../CommonComponents/AdminSidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../context/authContext";
import Spinner from "../../CommonComponents/Spinner";

export default function AdminLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const currentUser = useContext(AuthContext);

  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

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
    <div className={styles["adminLayout--main-container"]}>
      {loggedIn ? (
        <>
          <AdminSidebar
            setMobileSidebar={setMobileSidebar}
            mobileSidebar={mobileSidebar}
          />

          {mobileSidebar ? null : <Outlet />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
