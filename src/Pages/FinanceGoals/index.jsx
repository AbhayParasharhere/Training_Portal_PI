import React from "react";
import styles from "./styles.module.scss";

export default function ClientGoals() {
  return (
    <div className={styles["clientGoals--main-container"]}>
      <p className={styles["clientGoals--title"]}>Client Financial Goals</p>
      <textarea className={styles["clientGoals--input"]} />
    </div>
  );
}
