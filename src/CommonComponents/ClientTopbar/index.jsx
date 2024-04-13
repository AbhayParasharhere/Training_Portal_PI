import React from "react";
import styles from "./styles.module.scss";

export default function ClientTopbar() {
  return (
    <div className={styles["ClientInfo-wrapper-topbar"]}>
      <div className={styles["ClientInfo-wrapper-topbar-div"]}>
        <div className={styles["ClientInfo-wrapper-topbar-text"]}>
          Client Information
        </div>
        <div className={styles["ClientInfo-wrapper-topbar-text"]}>
          Purchased Policies
        </div>
        <div className={styles["ClientInfo-wrapper-topbar-text"]}>
          Financial Goals
        </div>
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-buttons"]}>
        <button className={styles["ClientInfo-wrapper-topbar-buttons-save"]}>
          Save Changes
        </button>
        <button className={styles["ClientInfo-wrapper-topbar-buttons-meet"]}>
          Organize Meet
        </button>
      </div>
    </div>
  );
}
