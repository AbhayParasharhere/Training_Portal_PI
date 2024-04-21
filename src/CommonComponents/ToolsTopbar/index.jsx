import React from "react";
import styles from "./styles.module.scss";

export default function ToolsTopbar() {
  return (
    <div className={styles["ClientInfo-wrapper-topbar-div"]}>
      <div className={styles["ClientInfo-wrapper-topbar-text"]}>
        Sales Resources
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-text"]}>
        Marketing Resources
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-text"]}>
        Product Links
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-text"]}>
        Finance Calculator
      </div>
    </div>
  );
}
