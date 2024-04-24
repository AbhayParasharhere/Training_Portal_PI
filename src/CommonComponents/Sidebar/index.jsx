import React from "react";
import styles from "./styles.module.scss";
import dashboardIcon from "./images/dashboard-icon.png";
import coursesIcon from "./images/courses-icon.png";
import productTrainingIcon from "./images/productTraining-icon.png";
import statisticsIcon from "./images/statistics-icon.png";
import clientsIcon from "./images/clients-icon.png";
import toolsResourcesIcon from "./images/tools-resources-icon.png";
import announcementIcon from "./images/announcement-icon.png";
import webinarIcon from "./images/webinar-icon.png";
import complianceIcon from "./images/compliance-icon.png";
import communicationIcon from "./images/communication-icon.png";
import PIlogo from "./images/PI-logo.png";
import logoutIcon from "./images/logout-icon.png";
import FAQIcon from "./images/FAQ-icon.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menuData = [
    { icon: dashboardIcon, title: "Dashboard" },
    { icon: coursesIcon, title: "Courses" },
    { icon: productTrainingIcon, title: "Product Training" },
    { icon: statisticsIcon, title: "Statistics" },
    { icon: clientsIcon, title: "Clients" },
    { icon: toolsResourcesIcon, title: "Tools and Resources" },
    { icon: announcementIcon, title: "Announcements" },
    { icon: webinarIcon, title: "Webinar" },
    { icon: complianceIcon, title: "Compliance and Policy" },
    { icon: communicationIcon, title: "Communication" },
  ];
  const renderMenu = menuData.map((menu) => {
    return (
      <div className={styles["sidebar--menu-title-container"]}>
        <img src={menu.icon} className={styles["sidebar--menu-icon"]} />
        <p className={styles["sidebar--menu-text"]}>{menu.title}</p>
      </div>
    );
  });
  return (
    <div className={styles["sidebar--main-container"]}>
      <div className={styles["sidebar--menu-container"]}>
        <div className={styles["sidebar--menu-inner-container"]}>
          <img src={PIlogo} className={styles["sidebar--company-logo"]} />
          {renderMenu}
        </div>
        <div className={styles["sidebar--support-logout-container"]}>
          <div className={styles["sidebar--menu-title-container"]}>
            <img src={FAQIcon} className={styles["sidebar--menu-icon"]} />
            <p className={styles["sidebar--menu-text"]}>FAQs and Support</p>
          </div>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <div className={styles["sidebar--menu-title-container"]}>
              <img src={logoutIcon} className={styles["sidebar--menu-icon"]} />
              <p className={styles["sidebar--menu-text"]}>Log Out</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
