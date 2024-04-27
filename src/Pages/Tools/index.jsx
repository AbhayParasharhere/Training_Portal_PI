import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ToolsTopbar from "../../CommonComponents/ToolsTopbar";
import Group from "./Images/Group.png";
import arrow_right from "./Images/arrow_right.png";

export default function Tools() {
  const list = [
    { filename: "File name" },
    { filename: "File name" },
    { filename: "File name" },
    { filename: "File name" },
  ];
  return (
    <div className={styles["Tools-wrapper"]}>
      <ToolsTopbar />
      {list.map((item) => (
        <div className={styles["Tools-wrapper-main-content"]}>
          <div className={styles["Tools-wrapper-main-content-div"]}>
            <div className={styles["Tools-wrapper-main-content-image"]}>
              <img src={Group} height="28px" />
            </div>
            <div className={styles["Tools-wrapper-main-content-file"]}>
              {item.filename}
            </div>
          </div>
          <img
            src={arrow_right}
            className={styles["Tools-wrapper-main-content-arrow"]}
          />
        </div>
      ))}
    </div>
  );
}
