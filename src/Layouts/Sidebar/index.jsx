import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div className={styles["sidebarLayout--main-container"]}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
