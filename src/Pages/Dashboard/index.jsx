import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import Home from "./components/Home";
import StatsSummary from "./components/SatisticsSummary";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", gap: 25, flexGrow: "none" }}>
      <Sidebar />
      <Home />
      <StatsSummary />
    </div>
  );
}
