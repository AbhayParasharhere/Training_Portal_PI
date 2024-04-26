import React from "react";
import styles from "./styles.module.scss";

export default function ToolsTopbar() {
  return (
    <>
      <div className={styles["Tools-wrapper-topbar-div"]}>
        <div className={styles["Tools-wrapper-topbar-text"]}>
          Sales Resources
        </div>
        <div className={styles["Tools-wrapper-topbar-text"]}>
          Marketing Resources
        </div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Product Links</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>
          Finance Calculator
        </div>
      </div>
      <div className={styles["Tools-wrapper-topbar-div-mobile"]}>
        <div className={styles["Tools-wrapper-topbar-text"]}>Sales</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Marketing</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Product</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Calculator</div>
      </div>
    </>
  );
}
