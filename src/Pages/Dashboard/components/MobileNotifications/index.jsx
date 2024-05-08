import React, { useContext, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { pushRecentNotifications } from "../Home";
import { RealTimeDataContext } from "../../../../context/primaryDataContext";
import { app } from "../../../../Firebase/firebaseConfig";

export default function MobileNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState();
  const realTimeData = useContext(RealTimeDataContext);
  const announcements = realTimeData?.announcements;
  const webinars = realTimeData?.webinars;
  const appointments = realTimeData?.appointments;
  // console.log(appointments, announcements, webinars);
  useEffect(() => {
    // if (announcements || webinars || appointments) return;
    pushRecentNotifications(
      announcements,
      webinars,
      appointments,
      setNotifications
    );
    console.log("These are the notifications: ", notifications);
  }, [announcements, appointments, webinars]);
  window.addEventListener("resize", function () {
    if (window.innerWidth > 630) {
      navigate("/");
    }
  });

  // Initial check
  if (window.innerWidth > 630) {
    navigate("/");
  }
  return (
    <div className={styles["statsSummary--notifications-container"]}>
      <div className={styles["statsSummary--notifications-inner-container"]}>
        <p className={styles["statsSummary--notifications-title"]}>
          Notifications
        </p>
        <div className={styles["statsSummary--lists-container"]}>
          {notifications?.length === 0 ? (
            notifications?.map((notification) => {
              return (
                <div
                  className={styles["statsSummary--list"]}
                  style={{
                    border: "1px solid #dedede",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    gap: "15px",
                    padding: "10px",
                    borderRadius: 5,
                  }}
                >
                  <p
                    className={styles["statsSummary--list-title"]}
                    style={{
                      fontFamily: "Epilogue",
                      color: "#393E46",
                      fontWeight: "600",
                    }}
                  >
                    Upcoming {notification?.type}
                  </p>
                  <p
                    className={styles["statsSummary--list-desc"]}
                    style={{ fontFamily: "Epilogue", color: "#686868" }}
                  >
                    {notification?.type === "appointment" &&
                      `You have an appointment on ${notification.sortDate}`}
                    {notification?.type === "webinar" &&
                      `You have a webinar on ${notification.sortDate}`}
                    {notification?.type === "announcement" &&
                      `A latest annoucement was made on ${notification.sortDate}`}
                  </p>
                </div>
              );
            })
          ) : (
            <div className={styles["home--no-data"]}>
              You have no new notificaions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
