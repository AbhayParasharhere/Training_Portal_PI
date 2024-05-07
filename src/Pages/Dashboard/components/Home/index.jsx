import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import congratulationsEmoji from "./images/congratulations-emoji.png";
import playIcon from "./images/play-icon.png";
import clientPhoto from "./images/client-sample-image.png";
import profilePhoto from "./images/profile-photo.png";
import cakeIcon from "./images/cakeIcon.png";
import appointmentIcon from "./images/appointment-icon.png";
import bellIcon from "./images/bell-icon.png";
import clipboardIcon from "./images/clipboard-icon.png";
import secureLocalStorage from "react-secure-storage";
import { AuthContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import calendarIcon from "./images/calendar.png";
import {
  RealTimeDataContext,
  PrimaryDataContext,
} from "../../../../context/primaryDataContext";
import {
  getFutureTimeDifference,
  getTimeDifference,
} from "../TabletImportantUpdates";
import MobileBirthdays from "../MobileBirthdays";

export default function Home() {
  const realTimeData = useContext(RealTimeDataContext);
  const appointments = realTimeData?.appointments;
  console.log("Realtime Appointments", appointments);
  let latestAppoitment = {};
  let appoitmentClientName = "";
  const [mobileState, setMobileState] = useState("");

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
  console.log("Appointments", appointments);

  let videosWatched = [];
  if (JSON?.parse(sessionStorage?.getItem("video_progress"))) {
    videosWatched = JSON.parse(sessionStorage.getItem("video_progress"));
  }
  const primaryData = useContext(PrimaryDataContext);
  const allCourses = primaryData?.courses;
  if (videosWatched) {
    videosWatched?.sort((a, b) => b.created_at.seconds - a.created_at.seconds);
  }
  const sales = realTimeData?.sales;
  let salesWithCreatedAt = [];
  if (sales) {
    salesWithCreatedAt = sales?.filter((sales) => sales.created_at);
    salesWithCreatedAt?.sort(
      (a, b) => b.created_at.seconds - a.created_at.seconds
    );
  }

  const uniqueCourses = new Set();
  const lastThreeCourses = [];
  const latestThreeSales = salesWithCreatedAt.slice(0, 3);

  // Iterate over the sorted array and add unique courses to the set
  if (videosWatched) {
    for (const video of videosWatched) {
      if (!uniqueCourses.has(video.courseId)) {
        uniqueCourses.add(video.courseId);
        lastThreeCourses.push(video.courseId);
      }

      // If we have collected the last 3 unique courses, break the loop
      if (lastThreeCourses.length === 3) {
        break;
      }
    }
  }
  const filterLast3CoursesWatched = () => {
    const lastCourses = [];
    allCourses?.map((course) => {
      if (lastThreeCourses?.includes(course.id)) {
        lastCourses.push({
          courseData: course,
          title: course.title,
          to: `/courses/${course.id}`,
          button: "Continue",
        });
      }
    });
    return lastCourses;
  };
  const announcements = realTimeData?.announcements;
  const clients = realTimeData?.clients;
  let clientsWithCreatedAt = [];
  if (clients) {
    clientsWithCreatedAt = clients?.filter((client) => client.created_at);
    clientsWithCreatedAt?.sort(
      (a, b) => b?.created_at?.seconds - a?.created_at?.seconds
    );
  }

  const uniqueClients = new Set();
  const latestThreeUniqueClients = [];

  for (const client of clientsWithCreatedAt) {
    if (!uniqueClients.has(client.id)) {
      uniqueClients.add(client.id);
      latestThreeUniqueClients.push(client);
    }

    if (latestThreeUniqueClients.length === 3) {
      break;
    }
  }

  const [latestStats, setLatestStates] = useState("course");
  const navigate = useNavigate();

  const latestStatsData = {
    course: filterLast3CoursesWatched(),
    policies: latestThreeSales?.map((sales) => {
      return {
        title: sales.policy_type,
        button: "view",
        to: `client-detail/${sales.cid}/policies`,
      };
    }),
    sales: latestThreeUniqueClients?.map((client) => {
      return {
        title: client.name,
        button: "View",
        to: `/client-detail/${client.id}`,
      };
    }),
  };
  const navigateLatestStats = (statType, stat) => {
    navigate(stat.to, { state: { course: stat.courseData } });
  };
  const renderLatestStats = latestStatsData[latestStats].map((stat, index) => {
    return (
      <div
        className={styles["home--notification-lists"]}
        onClick={() => navigateLatestStats(latestStats, stat)}
        key={index}
      >
        <div className={styles["home--list-title-container"]}>
          <img src={playIcon} className={styles["home--play-icon"]} />
          <p className={styles["home--list-text"]}>{stat.title}</p>
        </div>
        <button className={styles["home--continue-button"]}>
          {latestStats === "course" ? "Continue" : "View"}
        </button>
      </div>
    );
  });

  //Client birthdays and anniversary check
  //Rendering and getting anniversary and birthday data
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

  //Rendering and getting anniversary and birthday data Finish
  const mobileIconsData = [
    {
      icon: cakeIcon,
      text: "Client Birthday’s & anniversay",
      to: "/birthdays",
      state: upcomingEvents,
    },
    {
      icon: profilePhoto,
      text: "Statistics",
      to: "/statistics",
    },
    {
      icon: bellIcon,
      text: "Notifications",
      name: "notifications",
      to: "/notifications",
      state: [],
    },
    {
      icon: appointmentIcon,
      text: "Client Appointments",
      to: "/webinar",
    },
    {
      icon: clipboardIcon,
      text: "Important Updates",
      to: "/announcement",
    },
  ];

  const mobileIcons = mobileIconsData.map((data) => {
    return (
      <div
        className={styles["home--mobile-icons-inner-container"]}
        onClick={() => navigate(data.to, { state: data?.state })}
      >
        <div className={styles["home--mobile-icon-image-container"]}>
          <img src={data.icon} className={styles["home--mobile-icon-image"]} />
        </div>
        <p className={styles["home--mobile-icon-desc-text"]}>{data.text} </p>
      </div>
    );
  });

  return (
    <div className={styles["home--main-container"]}>
      <div className={styles["home--welcome-container"]}>
        <div className={styles["home--greetings-container"]}>
          <p className={styles["home--greetings-title"]}>
            Good Morning {secureLocalStorage.getItem("userDetails")?.[0]}
          </p>
          <div className={styles["home--greetings-desc-container"]}>
            <p className={styles["home--greetings-desc"]}>
              Welcome to your Dashboard!
            </p>
            <p className={styles["home--greetings-desc"]}>
              Your hub for Managing Clients, Monitoring Sales, and Acheiving
              Success. Let's Get Started
            </p>
          </div>
        </div>
        <div className={styles["home--course-greeting-container"]}>
          <img
            src={congratulationsEmoji}
            className={styles["home--congratulations-emoji"]}
          />
          <div className={styles["home--course-greeting-text-container"]}>
            <p className={styles["home--course-greeting-title"]}>
              Mastering Risk Management in Insurance
            </p>
            <p className={styles["home--course-greeting-desc"]}>
              "Congratulations on completing your online course! Wishing you
              continued success!"
            </p>
          </div>
        </div>
      </div>

      {/*Welcome and Greeting part completed */}

      <div className={styles["home--recent-notifications-main-container"]}>
        <div className={styles["home--sales-course-notification-container"]}>
          <div className={styles["home--notification-links-container"]}>
            <p
              className={styles["home--notification-links"]}
              onClick={() => setLatestStates("course")}
              style={{
                color: latestStats === "course" ? "#4462A4" : "#A1A1A1",
              }}
            >
              Course Progress
              <hr
                className={styles["home--notification-links-underline"]}
                style={{
                  borderColor: latestStats === "course" ? "#4462A4" : "#A1A1A1",
                }}
              />
            </p>
            <p
              className={styles["home--notification-links"]}
              onClick={() => setLatestStates("sales")}
              style={{
                color: latestStats === "sales" ? "#4462A4" : "#A1A1A1",
              }}
            >
              Recent Sales{" "}
              <hr
                className={styles["home--notification-links-underline"]}
                style={{
                  borderColor: latestStats === "sales" ? "#4462A4" : "#A1A1A1",
                }}
              />
            </p>
            <p
              className={styles["home--notification-links"]}
              onClick={() => setLatestStates("policies")}
              style={{
                color: latestStats === "policies" ? "#4462A4" : "#A1A1A1",
              }}
            >
              Latest Policies{" "}
              <hr
                className={styles["home--notification-links-underline"]}
                style={{
                  borderColor:
                    latestStats === "policies" ? "#4462A4" : "#A1A1A1",
                }}
              />
            </p>
          </div>
          <div className={styles["home--notification-lists-container"]}>
            {renderLatestStats}
          </div>
        </div>
        <div className={styles["home--client-birthday-container"]}>
          <p className={styles["home--client-birthday-title"]}>
            Upcoming Clients Bithdays And Anniversary
          </p>
          <div className={styles["home--client-birthday-list"]}>
            {/* {renderBithday}
            {renderAnniversaries} */}
            {renderClientEvent}
          </div>
        </div>
      </div>

      {/*Notification part completed */}

      {/* ***Notification and clients appointment container for tablet design*** */}

      <div
        className={styles["home--mobile-appointment-notification-container"]}
      >
        {/*Tablet notification container starts */}

        <div className={styles["statsSummary--notifications-container"]}>
          <div
            className={styles["statsSummary--notifications-inner-container"]}
          >
            <p className={styles["statsSummary--notifications-title"]}>
              Notifications
            </p>
            <div className={styles["statsSummary--lists-container"]}>
              <div className={styles["statsSummary--list"]}>
                <p className={styles["statsSummary--list-title"]}>
                  Upcoming event/meeting
                </p>
                <p className={styles["statsSummary--list-desc"]}>
                  Your webinar is about to get started very soon. Join the link
                  from Webinar page
                </p>
              </div>
              <div className={styles["statsSummary--list"]}>
                <p className={styles["statsSummary--list-title"]}>
                  Upcoming event/meeting
                </p>
                <p className={styles["statsSummary--list-desc"]}>
                  Your webinar is about to get started very soon. Join the link
                  from Webinar page
                </p>
              </div>{" "}
              <div className={styles["statsSummary--list"]}>
                <p className={styles["statsSummary--list-title"]}>
                  Upcoming event/meeting
                </p>
                <p className={styles["statsSummary--list-desc"]}>
                  Your webinar is about to get started very soon. Join the link
                  from Webinar page
                </p>
              </div>{" "}
              <div className={styles["statsSummary--list"]}>
                <p className={styles["statsSummary--list-title"]}>
                  Upcoming event/meeting
                </p>
                <p className={styles["statsSummary--list-desc"]}>
                  Your webinar is about to get started very soon. Join the link
                  from Webinar page
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*Tablet notification container ends */}

        {/*Tablet appointment container starts */}
        <div className={styles["statsSummary--appointment-container"]}>
          <div className={styles["statsSummary--appointment-inner-container"]}>
            <p className={styles["statsSummary--appointment-title"]}>
              Clients Appointment
            </p>
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
              <button className={styles["statsSummary--appointment-button"]}>
                Join Link
              </button>
            </div>
          </div>
        </div>
        {/*Tablet appointment container ends */}
      </div>

      {/* ***Notification and clients appointment container for tablet design Ends*** */}

      {/*Annoucement part start*/}
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
      {/*Annoucement part Completed*/}

      {/*MOBILE RESPONSIVE ICONS STARTS*/}
      <div className={styles["home--mobile-icons-container"]}>
        {mobileIcons}
      </div>
      {/*MOBILE RESPONSIVE ICONS ENDS*/}
    </div>
  );
}
