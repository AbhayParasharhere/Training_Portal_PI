import React, { useState } from "react";
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
import hamburgerIcon from "./images/hamburgerIcon.png";
import crossIcon from "./images/crossIcon.png";

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
  const renderMobileMenu = menuData.map((menu) => {
    return (
      <div className={styles["sidebar--mobile-menu-inner-container"]}>
        <img className={styles["sidebar--mobile-menu-icon"]} src={menu.icon} />
        <p className={styles["sidebar--mobile-menu-text"]}>{menu.title}</p>
      </div>
    );
  });
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <>
      {toggleSidebar ? (
        <div className={styles["sidebar--mobile-main-container"]}>
          <button
            className={styles["sidebar--close-button"]}
            onClick={() => {
              setToggleSidebar(false);
            }}
          >
            <img src={crossIcon} className={styles["sidebar--close-icon"]} />
          </button>
          {renderMobileMenu}
          <div className={styles["sidebar--mobile-menu-inner-container"]}>
            <img
              className={styles["sidebar--mobile-menu-icon"]}
              src={FAQIcon}
            />
            <p className={styles["sidebar--mobile-menu-text"]}>
              FAQs and Support
            </p>
          </div>{" "}
          <div className={styles["sidebar--mobile-menu-inner-container"]}>
            <img
              className={styles["sidebar--mobile-menu-icon"]}
              src={logoutIcon}
            />
            <p className={styles["sidebar--mobile-menu-text"]}>Log out</p>
          </div>
        </div>
      ) : (
        <button
          className={styles["sidebar--mobile-button"]}
          onClick={() => {
            setToggleSidebar(true);
          }}
        >
          <img
            src={hamburgerIcon}
            className={styles["sidebar--hamburger-icon"]}
          />
        </button>
      )}
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
            <div className={styles["sidebar--menu-title-container"]}>
              <img src={logoutIcon} className={styles["sidebar--menu-icon"]} />
              <p className={styles["sidebar--menu-text"]}>Log Out</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
