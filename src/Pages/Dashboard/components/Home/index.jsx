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
import { PrimaryDataContext } from "../../../../context/primaryDataContext";

export default function Home() {
  const userDetails = secureLocalStorage.getItem("userDetails");
  const primaryData = useContext(PrimaryDataContext);
  const announcements = primaryData?.announcements;

  // console.log("Announcements from primary data", primaryData?.announcements);
  const [latestStats, setLatestStates] = useState("course");
  const navigate = useNavigate();
  const mobileIconsData = [
    { icon: cakeIcon, text: "Client Birthday’s & anniversay", to: "/clients" },
    { icon: profilePhoto, text: "Statistics", to: "/statistics" },
    { icon: bellIcon, text: "Notifications", to: "/statistics" },
    { icon: appointmentIcon, text: "Client Appointments", to: "/clients" },
    { icon: clipboardIcon, text: "Important Updates", to: "/announcement" },
  ];

  const latestStatsData = {
    course: [
      { title: "Concepts of Insaurance", button: "Continue", to: "/courses" },
      { title: "Compliance Policies", button: "Continue", to: "/courses" },
      { title: "Concepts of Sales", button: "Continue", to: "/courses" },
    ],
    policies: [
      { title: "Life Insaurance", button: "View", to: "/addSales" },
      { title: "Home loan", button: "View", to: "/addSales" },
      { title: "Investing in funds", button: "View", to: "/addSales" },
    ],
    sales: [
      { title: "Abhay Parashar", button: "View", to: "/clients" },
      { title: "Mr. Sanjay", button: "View", to: "/clients" },
      { title: "Mr. Dharmendar", button: "View", to: "/clients" },
    ],
  };

  const renderLatestStats = latestStatsData[latestStats].map((stat, index) => {
    return (
      <div
        className={styles["home--notification-lists"]}
        onClick={() => navigate(stat.to)}
        key={index}
      >
        <div className={styles["home--list-title-container"]}>
          <img src={playIcon} className={styles["home--play-icon"]} />
          <p className={styles["home--list-text"]}>{stat.title}</p>
        </div>
        <button className={styles["home--continue-button"]}>
          {stat.button}
        </button>
      </div>
    );
  });
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

  const mobileIcons = mobileIconsData.map((data) => {
    return (
      <div
        className={styles["home--mobile-icons-inner-container"]}
        onClick={() => navigate(data.to)}
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
            Good Morning{" "}
            {secureLocalStorage.getItem("userDetails")?.[0] || "Broker"}
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
            <div
              className={styles["home--client-birthday"]}
              onClick={() => navigate("/clients")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>
            <div
              className={styles["home--client-birthday"]}
              onClick={() => navigate("/clients")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>{" "}
            <div
              className={styles["home--client-birthday"]}
              onClick={() => navigate("/clients")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>{" "}
            <div
              className={styles["home--client-birthday"]}
              onClick={() => navigate("/clients")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>{" "}
            <div
              className={styles["home--client-birthday"]}
              onClick={() => navigate("/clients")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>
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
                Meeting Name
              </p>
              <p className={styles["statsSummary--appointment-desc-text"]}>
                Client Name: John Williams|Time:120 min
              </p>
            </div>
            <div>
              <ul className={styles["statsSummary--unordered-list"]}>
                <li className={styles["statsSummary--appointment-marker"]}>
                  Web, Apr 3
                </li>
                <li className={styles["statsSummary--appointment-marker"]}>
                  11 AM - 12:45
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
