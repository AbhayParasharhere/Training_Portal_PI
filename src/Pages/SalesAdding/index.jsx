import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ClientDetails from "./components/ClientDetails";

export default function SalesAdding() {
  return (
    <div className={styles["salesAdding--main-container"]}>
      <Sidebar />
      <ClientDetails />
    </div>
  );
}
