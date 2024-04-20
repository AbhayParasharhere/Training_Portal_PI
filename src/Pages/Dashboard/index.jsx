import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import Home from "./components/Home";
import StatsSummary from "./components/SatisticsSummary";
import TabletImportantUpdates from "./components/TabletImportantUpdates";

export default function Dashboard() {
  return (
    <div className={styles["dashboard--main-container"]}>
      <div className={styles["dashboard--main-inner-container"]}>
        <Home />
        <StatsSummary />
      </div>
      <TabletImportantUpdates />
    </div>
  );
}
