import React, { useContext, useEffect, useState, Suspense } from "react";
import styles from "./styles.module.scss";
import {
  Outlet,
  useNavigate,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import AdminSidebar from "../../CommonComponents/AdminSidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../context/authContext";
import Spinner from "../../CommonComponents/Spinner";
import { getAllUsers } from "../../Firebase/getOtherStats";

export default function AdminLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [allUsers, setAllUser] = useState();
  const loaderData = useLoaderData();

  const navigate = useNavigate();
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const currentUser = useContext(AuthContext);

  // getAllUsers(setAllUsers);
  const getAllUsersLayout = async () => {
    if (!allUsers) {
      const insideAllUser = await getAllUsers();
      setAllUser(insideAllUser);
      console.log("inside: ", insideAllUser, allUsers);
      return;
    }
  };

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

          {mobileSidebar ? null : (
            <Outlet
              context={{ users: allUsers, getUsers: getAllUsersLayout }}
            />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
