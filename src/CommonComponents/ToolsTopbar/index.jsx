import React from "react";
import styles from "./styles.module.scss";

export default function ToolsTopbar() {
  return (
    <div className={styles["Tools-wrapper-topbar-div"]}>
      <div className={styles["Tools-wrapper-topbar-text"]}>Sales Resources</div>
      <div className={styles["Tools-wrapper-topbar-text"]}>
        Marketing Resources
      </div>
      <div className={styles["Tools-wrapper-topbar-text-product"]}>
        Product Links
      </div>
      <div className={styles["Tools-wrapper-topbar-text-finance"]}>
        Finance Calculator
      </div>
    </div>
  );
}
