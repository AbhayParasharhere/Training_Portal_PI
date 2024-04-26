import React, { useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ClientDetails from "./components/ClientDetails";
import SalesDetails from "./components/SalesDetails";

export default function SalesAdding() {
  const [displayComponent, setDisplayComponent] = useState("client");
  return (
    <div className={styles["salesAdding--main-container"]}>
      {displayComponent === "sales" ? (
        <SalesDetails setDisplayComponent={setDisplayComponent} />
      ) : (
        <ClientDetails setDisplayComponent={setDisplayComponent} />
      )}
    </div>
  );
}
