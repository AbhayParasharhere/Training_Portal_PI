import React from "react";
import styles from "./styles.module.scss";
import PIlogo from "./images/PI-logo.png";
import addCourseIcon from "./images/add-course-icon.png";
import brokerStatIcon from "./images/broker-stats-icon.png";
import inviteIcon from "./images/add-user-icon.png";
import addResourcesIcon from "./images/add-resources-icon.png";
import makeAnnouncementIcon from "./images/add-announcement-icon.png";
import addWebinarIcon from "./images/add-webinar-icon.png";
import logoutIcon from "./images/logout-icon.png";
import crossIcon from "./images/cross-icon.png";
import hamburgerIcon from "./images/hamburger-icon.png";

import { NavLink } from "react-router-dom";

export default function AdminSidebar(props) {
  const adminMenuData = [
    { icon: inviteIcon, title: "Invite", to: "invite" },
    { icon: brokerStatIcon, title: "Broker Statistics", to: "/admin" },
    { icon: addCourseIcon, title: "Add courses", to: "add-course" },
    { icon: addResourcesIcon, title: "Add Resources", to: "add-documents" },
    {
      icon: makeAnnouncementIcon,
      title: "Make Announcements",
      to: "add-announcement",
    },
    { icon: addWebinarIcon, title: "Host Webinar", to: "host-webinar" },
    { icon: logoutIcon, title: "Log out", to: "/" },
  ];
  const activeMenuStyle = {
    backgroundColor: "#3064D454",
    textDecoration: "none",
    padding: "10px 30px",
    width: "100%",
    boxSizing: "border-box",
  };
  const renderAdminMenu = adminMenuData.map((menu) => {
    return (
      <NavLink
        to={menu.to}
        style={({ isActive }) =>
          isActive
            ? activeMenuStyle
            : {
                textDecoration: "none",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 30px",
              }
        }
        end
        // exact={true}
      >
        <div className={styles["adminSidebar--menu-link-container"]}>
          <img className={styles["adminSidebar--menu-icon"]} src={menu.icon} />
          <p className={styles["adminSidebar--menu-title"]}>{menu.title}</p>
        </div>
      </NavLink>
    );
  });
  return (
    <>
      <div className={styles["adminSidebar--main-container"]}>
        <div className={styles["adminSidebar--menu-container"]}>
          <div className={styles["adminSidebar--menu-inner-container"]}>
            <NavLink className={styles["adminSidebar--logo-link"]}>
              <img className={styles["adminSidebar--PI-logo"]} src={PIlogo} />
            </NavLink>
            {renderAdminMenu}
          </div>
        </div>
      </div>
      <button
        className={styles["adminSidebar--mobile-hamburger"]}
        onClick={() => props.setMobileSidebar(true)}
        style={{ height: props.mobileSidebar && 0 }}
      >
        <img
          src={hamburgerIcon}
          className={styles["adminSidebar--mobile-hamburger-icon"]}
          style={{ height: props.mobileSidebar && 0 }}
        />
      </button>
      <div
        className={styles["adminSidebar--mobile-main-container"]}
        style={{ display: props.mobileSidebar ? "flex" : "none" }}
      >
        <div className={styles["adminSidebar--mobile-main-menu-container"]}>
          <img
            src={crossIcon}
            className={styles["adminSidebar--cross-icon"]}
            onClick={() => props.setMobileSidebar(false)}
          />
          {adminMenuData.map((menu) => {
            return (
              <NavLink
                to={menu.to}
                style={({ isActive }) =>
                  isActive
                    ? activeMenuStyle
                    : {
                        textDecoration: "none",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "10px 30px", // Removed duplicate padding
                      }
                }
                end
                exact={true} // or just exact
                onClick={() => props.setMobileSidebar(false)}
              >
                <div className={styles["adminSidebar--menu-link-container"]}>
                  <img
                    className={styles["adminSidebar--menu-icon"]}
                    src={menu.icon}
                    alt={menu.title}
                  />
                  <p className={styles["adminSidebar--menu-title"]}>
                    {menu.title}
                  </p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
