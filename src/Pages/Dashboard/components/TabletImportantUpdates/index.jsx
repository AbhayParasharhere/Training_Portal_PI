import React from "react";
import styles from "./styles.module.scss";

export default function TabletImportantUpdates() {
  return (
    <div className={styles["home--important-updates-container"]}>
      <p className={styles["home--important-updates-title"]}>Import Updates</p>
      <div className={styles["home--annoucement-list-container"]}>
        <div className={styles["home--annoucement-container"]}>
          <div className={styles["home--annoucement-details-container"]}>
            <p className={styles["home--annoucement-details-text"]}>Admin</p>
            <p className={styles["home--annoucement-details-text"]}>
              20 min ago{" "}
            </p>
          </div>
          <div>
            <ui>
              <li className={styles["home--annoucement-text"]}>
                The upcoming webinar on customer retention strategies is
                scheduled for next Tuesday at 10 AM EST.
              </li>
            </ui>
          </div>
        </div>
        <div className={styles["home--annoucement-container"]}>
          <div className={styles["home--annoucement-details-container"]}>
            <p className={styles["home--annoucement-details-text"]}>Admin</p>
            <p className={styles["home--annoucement-details-text"]}>
              20 min ago{" "}
            </p>
          </div>
          <div>
            <ui>
              <li className={styles["home--annoucement-text"]}>
                The upcoming webinar on customer retention strategies is
                scheduled for next Tuesday at 10 AM EST.
              </li>
            </ui>
          </div>
        </div>
      </div>
    </div>
  );
}
