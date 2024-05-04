import styles from "./styles.module.scss";
import { HashLink } from "react-router-hash-link";
import { useContext } from "react";
import { RealTimeDataContext } from "../../../../context/primaryDataContext";

const getTimeDifference = (updatedAt) => {
  // Convert `updatedAt` to a Date object
  const updatedDate = new Date(updatedAt);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - updatedDate;

  // Convert the time difference to total minutes
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  // Calculate total hours
  const hoursDifference = Math.floor(minutesDifference / 60);

  // Calculate total days, and remaining hours and minutes
  const days = Math.floor(hoursDifference / 24);
  const hours = hoursDifference % 24;
  const minutes = minutesDifference % 60;

  // Determine the appropriate format based on the difference
  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};
const getFutureTimeDifference = (updatedAt) => {
  const updatedDate = new Date(updatedAt);

  const currentDate = new Date();

  const timeDifference = updatedDate - currentDate;

  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  const hoursDifference = Math.floor(minutesDifference / 60);

  const days = Math.floor(hoursDifference / 24);

  const hours = hoursDifference % 24;

  const minutes = minutesDifference % 60;

  if (days > 0) {
    return `${days} days`;
  }
  if (hours > 0) {
    return `${hours} hours`;
  }
  if (minutes > 0) {
    return `${minutes} minutes`;
  }

  return "0 minutes";
};
function TabletImportantUpdates() {
  const announcements = useContext(RealTimeDataContext)?.announcements;

  return (
    <div className={styles["home--important-updates-container"]}>
      <p className={styles["home--important-updates-title"]}>
        Important Updates
      </p>
      {announcements?.length !== 0 ? (
        <div className={styles["home--annoucement-list-container"]}>
          {announcements?.map((announcement) => {
            return (
              <HashLink
                to="/announcement#announcement"
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div
                  className={styles["home--annoucement-container"]}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={styles["home--annoucement-details-container"]}
                  >
                    <p className={styles["home--annoucement-details-text"]}>
                      {announcement?.created_by}
                    </p>
                    <p className={styles["home--annoucement-details-text"]}>
                      {getTimeDifference(announcement?.updated_at.toDate())}
                    </p>
                  </div>
                  <div>
                    <ui>
                      <li className={styles["home--annoucement-text"]}>
                        {announcement?.title}
                      </li>
                    </ui>
                  </div>
                </div>
              </HashLink>
            );
          })}
        </div>
      ) : (
        <p>No Announcement</p>
      )}
    </div>
  );
}

export { getTimeDifference, getFutureTimeDifference, TabletImportantUpdates };
