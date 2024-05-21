import React, { useState } from "react";
import styles from "./styles.module.scss";
import Home from "./components/Home";
import StatsSummary from "./components/SatisticsSummary";
import { TabletImportantUpdates } from "./components/TabletImportantUpdates";

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div
      className={styles["dashboard--main-container"]}
      // style={{ overflowY: chatOpen ? "hidden" : "scroll" }}
    >
      <div className={styles["dashboard--main-inner-container"]}>
        <Home />
        <StatsSummary chatOpen={chatOpen} setChatOpen={setChatOpen} />
      </div>
      <TabletImportantUpdates />
    </div>
  );
}
