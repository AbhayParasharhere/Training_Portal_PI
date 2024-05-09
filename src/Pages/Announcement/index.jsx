import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { RealTimeDataContext } from "../../context/primaryDataContext";
import { getTimeDifference } from "../Dashboard/components/TabletImportantUpdates";

export default function AnnouncementPage() {
  const announcements = useContext(RealTimeDataContext)?.announcements;
  return (
    <div id="announcement" className={styles["announcement--main-container"]}>
      Important Updates{" "}
      <div className={styles["announcement--list-container"]}>
        {announcements?.length ? (
          announcements?.map((announcement, index) => {
            return (
              <div key={index} className={styles["announcement--container"]}>
                <div className={styles["announcement--name-time-container"]}>
                  <p className={styles["announcement--name-time-text"]}>
                    {announcement?.created_by}
                  </p>
                  <p className={styles["announcement--name-time-text"]}>
                    {getTimeDifference(announcement?.updated_at.toDate())}
                  </p>
                </div>
                <p className={styles["announcement--title"]}>
                  {announcement?.title}
                </p>
                <p className={styles["announcement--desc"]}>
                  {announcement?.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className={styles["home--no-data"]}>No Announcements Yet</div>
        )}
      </div>
    </div>
  );
}
