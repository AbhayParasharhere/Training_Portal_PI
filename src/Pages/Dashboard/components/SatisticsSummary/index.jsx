import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import samplePhoto from "./images/profile-photo.png";
import calendarIcon from "./images/calendar.png";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import cakeIcon from "./images/cakeIcon.png";
import clientPhoto from "./images/client-sample-image.png";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {
  PrimaryDataContext,
  RealTimeDataContext,
} from "../../../../context/primaryDataContext";
import { getFutureTimeDifference } from "../TabletImportantUpdates";
import { pushRecentNotifications } from "../Home";

ChartJs.register(CategoryScale, LinearScale, BarElement);

export default function StatsSummary() {
  const realTimeData = useContext(RealTimeDataContext);
  const appointments = realTimeData?.appointments;
  const webinars = realTimeData?.webinars;
  const announcements = realTimeData?.announcements;
  const [notifications, setNotifications] = useState([]);
  let latestAppoitment = {};
  let appoitmentClientName = "";

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

  if (appointments) {
    // Get the one which is closest to the current time and must be in the future

    latestAppoitment = appointments
      .filter((appointment) => {
        const currentDate = new Date();
        const appointmentDate = appointment.date.toDate();
        console.log(
          "Current Date",
          currentDate,
          "Appointment Date",
          appointmentDate
        );
        return currentDate < appointmentDate;
      })
      ?.sort((a, b) => a.date.seconds - b.date.seconds)[0];

    if (latestAppoitment) {
      appoitmentClientName = realTimeData.clients.find(
        (client) => client.id === latestAppoitment.clientID
      )?.name;
    }
    console.log("Latest Appoitment", latestAppoitment);
  }

  const navigate = useNavigate();
  // const primaryDataContext = useContext(PrimaryDataContext);
  const clients = realTimeData?.clients;
  const [graphData, setGraphData] = useState([
    { name: "M", value: "12" },
    { name: "T", value: "5" },
    { name: "W", value: "9" },
    { name: "T", value: "15" },
    { name: "F", value: "6" },
    { name: "S", value: "9" },
    { name: "S", value: "7" },
  ]);
  function getUpcomingEvents(clientData) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Month starts from 0

    // Combine all events into a single array
    const allEvents = [];

    clientData?.forEach((client) => {
      const dobParts = client.DOB.split("-");
      const anniversaryParts = client.anniversary.split("-");
      const dobMonth = parseInt(dobParts[1], 10);
      const dobDay = parseInt(dobParts[2], 10);
      const anniversaryMonth = parseInt(anniversaryParts[1], 10);
      const anniversaryDay = parseInt(anniversaryParts[2], 10);

      // Check if DOB is today or within a week (7 days)
      if (
        (dobMonth === currentMonth &&
          dobDay >= currentDay &&
          dobDay - currentDay <= 7) ||
        (dobMonth === currentMonth &&
          dobDay < currentDay &&
          currentDay - dobDay <= 7)
      ) {
        allEvents.push({ ...client, eventType: "Birthday" });
      }

      // Check if anniversary is today or within a week (7 days)
      if (
        (anniversaryMonth === currentMonth &&
          anniversaryDay >= currentDay &&
          anniversaryDay - currentDay <= 7) ||
        (anniversaryMonth === currentMonth &&
          anniversaryDay < currentDay &&
          currentDay - anniversaryDay <= 7)
      ) {
        allEvents.push({ ...client, eventType: "Anniversary" });
      }
    });

    // Sort events by the latest event first
    allEvents.sort((a, b) => {
      const dateA = new Date(
        2000,
        a.eventType === "Birthday"
          ? a.DOB.split("-")[2]
          : a.anniversary.split("-")[2]
      );
      const dateB = new Date(
        2000,
        b.eventType === "Birthday"
          ? b.DOB.split("-")[2]
          : b.anniversary.split("-")[2]
      );

      return dateA - dateB;
    });

    return allEvents;
  }

  let upcomingEvents = [];
  if (clients) {
    upcomingEvents = getUpcomingEvents(clients);
  }
  const renderClientEvent = upcomingEvents?.map((client) => {
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
    <div className={styles["statsSummary--main-container"]}>
      <div className={styles["statsSummary--profile-container"]}>
        <p className={styles["statsSummary--title"]}>Statistics</p>
        <div className={styles["statsSummary--profile-inner-container"]}>
          <img
            src={secureLocalStorage.getItem("userDetails")?.[1] || samplePhoto}
            className={styles["statsSummary--profile-image"]}
          />
          <p className={styles["statsSummary--name"]}>
            {secureLocalStorage.getItem("userDetails")?.[0] || "Broker"}
          </p>
          <p className={styles["statsSummary--desc"]}>
            Check out your weekly sales snapshot
          </p>
        </div>
        <div
          className={styles["statsSummary--sales-graph-container"]}
          onClick={() => navigate("/statistics")}
        >
          Weekly Sales Status
          <Bar
            className={styles["statsSummary--graph"]}
            data={{
              labels: graphData.map((data) => data.name),
              datasets: [
                {
                  data: graphData.map((data) => data.value),
                  backgroundColor: "#2D355C",
                  borderRadius: 3,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  display: false,
                  grid: {
                    display: false,
                  },
                },
              },
            }}
            style={{ width: "300px", height: "500px" }}
          />
        </div>
      </div>
      <div className={styles["statsSummary--notifications-container"]}>
        <div className={styles["statsSummary--notifications-inner-container"]}>
          <p className={styles["statsSummary--notifications-title"]}>
            Notifications
          </p>
          <div
            className={styles["statsSummary--lists-container"]}
            style={{
              justifyContent:
                notifications?.length === 0 ? "center" : "flex-start",
            }}
          >
            {notifications?.length !== 0 ? (
              notifications?.map((notification) => {
                return (
                  <div className={styles["statsSummary--list"]}>
                    <p className={styles["statsSummary--list-title"]}>
                      Upcoming {notification?.type}
                    </p>
                    <p className={styles["statsSummary--list-desc"]}>
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
              <div
                className={styles["home--no-data"]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifySelf: "center",
                  alignSelf: "center",
                  minHeight: "100%",
                }}
              >
                You have no recent notifications
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles["statsSummary--appointment-container"]}>
        <div className={styles["statsSummary--appointment-inner-container"]}>
          <p className={styles["statsSummary--appointment-title"]}>
            Clients Appointment
          </p>
          {latestAppoitment ? (
            <>
              <div>
                <p className={styles["statsSummary--meeting-title"]}>
                  {latestAppoitment?.topic}
                </p>
                <p className={styles["statsSummary--appointment-desc-text"]}>
                  Client Name: {appoitmentClientName}|Time:{" "}
                  {getFutureTimeDifference(latestAppoitment?.date?.toDate())}
                </p>
              </div>
              <div>
                <ul className={styles["statsSummary--unordered-list"]}>
                  <li className={styles["statsSummary--appointment-marker"]}>
                    {latestAppoitment?.date?.toDate()?.toDateString()}{" "}
                  </li>
                  <li className={styles["statsSummary--appointment-marker"]}>
                    {latestAppoitment?.date?.toDate().toLocaleTimeString()}{" "}
                  </li>
                </ul>
                <a
                  target="_blank"
                  href={latestAppoitment?.link}
                  className={styles["statsSummary--appointment-button"]}
                  style={{
                    pointerEvents: latestAppoitment?.link ? "all" : "none",
                  }}
                >
                  Join Link
                </a>
              </div>
            </>
          ) : (
            <div
              className={styles["home--no-data"]}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // minHeight: "100%",
              }}
            >
              You have no recent appointments
            </div>
          )}
        </div>
      </div>
      {/*Birthday container for tablet responsive starts */}
      <div className={styles["statsSummary--mobile-birthday-container"]}>
        <p className={styles["home--client-birthday-title"]}>
          Upcoming Clients Bithdays And Anniversary
        </p>
        <div className={styles["home--client-birthday-list"]}>
          {renderClientEvent}
        </div>
      </div>
      {/*Birthday container for tablet responsive ends*/}
    </div>
  );
}
