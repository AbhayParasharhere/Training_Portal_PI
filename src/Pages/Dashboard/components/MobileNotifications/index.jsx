import React from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileNotifications() {
  const navigate = useNavigate();
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
          <div
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
              Upcoming event/meeting
            </p>
            <p
              className={styles["statsSummary--list-desc"]}
              style={{ fontFamily: "Epilogue", color: "#686868" }}
            >
              Your webinar is about to get started very soon. Join the link from
              Webinar page
            </p>
          </div>
          <div
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
              Upcoming event/meeting
            </p>
            <p
              className={styles["statsSummary--list-desc"]}
              style={{ fontFamily: "Epilogue", color: "#686868" }}
            >
              Your webinar is about to get started very soon. Join the link from
              Webinar page
            </p>
          </div>
          <div
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
              Upcoming event/meeting
            </p>
            <p
              className={styles["statsSummary--list-desc"]}
              style={{ fontFamily: "Epilogue", color: "#686868" }}
            >
              Your webinar is about to get started very soon. Join the link from
              Webinar page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
