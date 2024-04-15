import React from "react";
import styles from "./styles.module.scss";
const MarqueeText = () => {
  return (
    <div className={styles["marqueeText--mainWrapper"]}>
      <div className={styles["marqueeText--subWrapper"]}>
        <h2>Achieve</h2>
        <h2>Manage</h2>
        <h2>Monitor</h2>
        <h2>Achieve</h2>
        <h2>Manage</h2>
        <h2>Monitor</h2>
      </div>
      <div className={styles["marqueeText--subWrapper"]}>
        <h2>Achieve</h2>
        <h2>Manage</h2>
        <h2>Monitor</h2>
        <h2>Achieve</h2>
        <h2>Manage</h2>
        <h2>Monitor</h2>
      </div>
    </div>
  );
};

export default MarqueeText;
