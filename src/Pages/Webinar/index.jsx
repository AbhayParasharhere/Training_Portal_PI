import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { RealTimeDataContext } from "../../context/primaryDataContext";
import { AuthContext } from "../../context/authContext";

export default function Webinar() {
  const [readMore, setReadMore] = useState([-1]);
  const [webinarNavigation, setWebinarNavigation] = useState("webinar");
  const clientData = useContext(RealTimeDataContext)?.clients;
  console.log("These are the clients: ", clientData);
  const webinarData = useContext(RealTimeDataContext)?.webinars;
  const appointmentData = useContext(RealTimeDataContext)?.appointments;
  console.log("This is the appointment data, ", appointmentData);
  const handleClick = (index) => {
    if (readMore.includes(index)) {
      const newReadmore = readMore.filter((item) => item !== index);
      setReadMore(newReadmore);
      console.log("Removed:", index);
      return;
    }
    setReadMore((prev) => [...prev, index]);
  };

  const renderWebinar = webinarData?.map((webinar, index) => {
    return (
      <div className={styles["webinar--container"]} key={index}>
        <p className={styles["webinar--title"]}>{webinar.title}</p>
        <div className={styles["webinar--details-container"]}>
          <p className={styles["webinar--desc-text"]}>
            Host: {webinar?.host} {webinar?.hostPosition}
          </p>
          <p className={styles["webinar--desc-text"]}>
            Date: {new Date(webinar?.time)?.toLocaleDateString()}
          </p>
          <p className={styles["webinar--desc-text"]}>
            Time: {new Date(webinar?.time)?.toLocaleTimeString()}
          </p>
        </div>
        <div className={styles["webinar--agenda-container"]}>
          <p className={styles["webinar--agenda-text"]}>Agenda:</p>
          <ol>
            {webinar.agenda.map((agenda) => {
              return <li className={styles["webinar--desc-text"]}>{agenda}</li>;
            })}
            <p
              className={styles["webinar--read-more"]}
              onClick={() => handleClick(index)}
            >
              {readMore.includes(index) ? "Show less" : "Read More..."}
            </p>
          </ol>
        </div>
        <div className={styles["webinar--description-container"]}>
          <p
            className={styles["webinar--desc-text"]}
            style={{
              color: "#393E46",
              display: readMore.includes(index) ? "inline" : "none",
            }}
          >
            <span className={styles["webinar--agenda-text"]}>Description:</span>{" "}
            {webinar.description}
          </p>
        </div>
        <button className={styles["webinar--join-button"]}>Join Link</button>
      </div>
    );
  });
  const renderAppointment = appointmentData?.map((appointment, index) => {
    const selectedClient = clientData?.filter(
      (client) => client.id === appointment?.clientID
    )[0];
    console.log("This is the selected client: ", selectedClient);
    const appointmentDate = appointment?.date?.toDate();

    return (
      <div className={styles["webinar--container"]} key={index}>
        <p className={styles["webinar--title"]}>{appointment?.topic}</p>
        <div className={styles["webinar--details-container"]}>
          <p className={styles["webinar--desc-text"]}>
            Client: {selectedClient?.name}
          </p>
          <p className={styles["webinar--desc-text"]}>
            Date: {appointmentDate.toLocaleDateString()}
          </p>
          <p className={styles["webinar--desc-text"]}>
            Time: {appointmentDate?.toLocaleTimeString()}
          </p>
        </div>
        <div className={styles["webinar--description-container"]}>
          <p
            className={styles["webinar--desc-text"]}
            style={{
              color: "#393E46",
            }}
          >
            <span className={styles["webinar--agenda-text"]}>Description:</span>{" "}
            {appointment?.description}
          </p>
        </div>
        <button
          className={styles["webinar--join-button"]}
          style={{ marginTop: 20 }}
        >
          Join Link
        </button>
      </div>
    );
  });

  return (
    <div className={styles["webinar--main-container"]}>
      <div className={styles["webinar--appointment-navigation-container"]}>
        <div
          className={styles["webinar--navigation"]}
          style={{ color: webinarNavigation === "webinar" ? "#123c97" : "" }}
          onClick={() => setWebinarNavigation("webinar")}
        >
          Webinar
          <hr
            className={styles["webinar--navigation-line"]}
            style={{
              border:
                webinarNavigation === "webinar" ? "1px solid #123c97" : "",
            }}
          />
        </div>
        <div
          className={styles["webinar--appointment-navigation"]}
          style={{
            color: webinarNavigation === "appointment" ? "#123c97" : "",
          }}
          onClick={() => setWebinarNavigation("appointment")}
        >
          Appointment
          <hr
            className={styles["webinar--navigation-line"]}
            style={{
              border:
                webinarNavigation === "appointment" ? "1px solid #123c97" : "",
            }}
          />
        </div>
      </div>

      {webinarNavigation === "webinar" ? renderWebinar : renderAppointment}
    </div>
  );
}
