import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ClientDetails from "./components/ClientDetails";
import SalesDetails from "./components/SalesDetails";

export default function SalesAdding() {
  return (
    <div className={styles["salesAdding--main-container"]}>
      <Sidebar />
      {/* <ClientDetails /> */}
      <SalesDetails />
    </div>
  );
}
