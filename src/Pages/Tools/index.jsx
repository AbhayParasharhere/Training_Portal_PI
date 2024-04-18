import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ToolsTopbar from "../../CommonComponents/ToolsTopbar";
import Group from "./Images/Group.png";
import arrow_right from "./Images/arrow_right.png";

export default function Tools() {
  return (
    // <div className={styles["Tools-main"]}>
    <div>
      <Sidebar />
      {/* <div className={styles["ClientInfo-wrapper"]}>
        <ToolsTopbar />
        <div className={styles["ClientInfo-wrapper-main"]}>
          <div className={styles["ClientInfo-wrapper-main-content"]}>
            <div className={styles["ClientInfo-wrapper-main-content-div"]}>
              <div className={styles["ClientInfo-wrapper-main-content-image"]}>
                <img src={Group} height="28px" />
              </div>
              <div className={styles["ClientInfo-wrapper-main-content-file"]}>
                File name
              </div>
            </div>
            <img src={arrow_right} height="28px" />
          </div>
        </div>
      </div> */}
    </div>
  );
}
