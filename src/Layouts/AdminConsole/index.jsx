import React from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../CommonComponents/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className={styles["adminLayout--main-container"]}>
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
