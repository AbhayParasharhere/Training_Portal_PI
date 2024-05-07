import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { RealTimeDataContext } from "../../../../context/primaryDataContext";
import { useLocation, useNavigate } from "react-router-dom";
import cakeIcon from "../Home/images/cakeIcon.png";
import calendarIcon from "../Home/images/calendar.png";
import clientPhoto from "../Home/images/client-sample-image.png";

export default function MobileBirthdays() {
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
  const upcomingBirthdays = useLocation()?.state;
  console.log("Upcmong event mobile: ", upcomingBirthdays);
  const renderClientEvent = upcomingBirthdays?.map((client) => {
    return (
      <div
        className={styles["home--client-birthday"]}
        onClick={() => navigate(`/client-detail/${client.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className={styles["home--client-birthday-inner-container"]}>
          <img src={clientPhoto} className={styles["home--client-image"]} />
          <div className={styles["home--birthday-name-date-container"]}>
            <p className={styles["home--client-name"]}>{client.name}</p>
            <p className={styles["home--birthday-date"]}>
              {client.eventType === "Anniversary"
                ? client.anniversary
                : client.DOB}{" "}
            </p>{" "}
          </div>
        </div>
        <img
          src={client.eventType === "Birthday" ? cakeIcon : calendarIcon}
          className={styles["home--cake-icon"]}
        />
      </div>
    );
  });
  return (
    <div className={styles["mobileBirthday--main-container"]}>
      <p className={styles["mobileBirthday--title"]}>
        Upcoming Client Birthdays and Anniversary
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
        className={styles["home--birthday-list"]}
      >
        {renderClientEvent}
      </div>
    </div>
  );
}
