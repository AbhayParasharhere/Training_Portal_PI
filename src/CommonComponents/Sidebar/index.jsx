import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import dashboardIcon from "./images/dashboard-icon.png";
import dashboardRedIcon from "./images/dashboard-red-icon.png";
import coursesIcon from "./images/courses-icon.png";
import coursesRedIcon from "./images/courses-red-icon.png";
import productTrainingIcon from "./images/productTraining-icon.png";
import statisticsIcon from "./images/statistics-icon.png";
import statisticsRedIcon from "./images/statistics-red-icon.png";
import clientsIcon from "./images/clients-icon.png";
import clientsRedIcon from "./images/clients-red-icon.png";
import toolsResourcesIcon from "./images/tools-resources-icon.png";
import toolsResourcesRedIcon from "./images/tools-resources-red-icon.png";
import announcementIcon from "./images/announcement-icon.png";
import announcementRedIcon from "./images/announcement-red-icon.png";
import webinarIcon from "./images/webinar-icon.png";
import webinarRedIcon from "./images/webinar-red-icon.png";
import complianceIcon from "./images/compliance-icon.png";
import complianceRedIcon from "./images/compliance-red-icon.png";
import communicationIcon from "./images/communication-icon.png";
import communicationRedIcon from "./images/communication-red-icon.png";
import allLinksRedIcon from "./images/all-links-red-icon.png";
import PIlogo from "./images/PI-logo.png";
import logoutIcon from "./images/logout-icon.png";
import FAQIcon from "./images/FAQ-icon.png";
import FAQRedIcon from "./images/FAQ-red-icon.png";
import addSalesIcon from "./images/add-sales-icon.png";
import addSalesRedIcon from "./images/add-sales-red-icon.png";
import hamburgerIcon from "./images/hamburger-icon.png";
import crossIcon from "./images/cross-icon.png";

import { Link, NavLink, redirect, useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const [menuActive, setMenuActive] = useState();

  const menuData = [
    {
      icon: dashboardIcon,
      title: "Dashboard",
      link: "/",
      clickedIcon: dashboardRedIcon,
    },
    {
      icon: coursesIcon,
      title: "Courses",
      link: "/courses",
      clickedIcon: coursesRedIcon,
    },
    {
      icon: productTrainingIcon,
      title: "Product Training",
      link: "/productCourses",
      clickedIcon: productTrainingIcon,
    },
    {
      icon: statisticsIcon,
      title: "Statistics",
      link: "/statistics",
      clickedIcon: statisticsRedIcon,
    },
    {
      icon: clientsIcon,
      title: "Clients",
      link: "/clients",
      clickedIcon: clientsRedIcon,
    },
    ,
    {
      icon: addSalesIcon,
      title: "Add Sales",
      link: "/addSales",
      clickedIcon: addSalesRedIcon,
    },
    {
      icon: toolsResourcesIcon,
      title: "Tools and Resources",
      link: "/tools",
      clickedIcon: toolsResourcesRedIcon,
    },
    {
      icon: announcementIcon,
      title: "Announcements",
      link: "/announcement",
      clickedIcon: announcementRedIcon,
    },
    {
      icon: webinarIcon,
      title: "Webinars and Appointments",
      link: "/webinar",
      clickedIcon: webinarRedIcon,
    },
    {
      icon: complianceIcon,
      title: "Compliance and Policy",
      link: "/compliance",
      clickedIcon: complianceRedIcon,
    },
    {
      icon: communicationIcon,
      title: "Connect with Others",
      link: "/connect",
      clickedIcon: communicationRedIcon,
    },
    ,
    {
      icon: communicationIcon,
      title: "All links",
      link: "/all-links",
      clickedIcon: allLinksRedIcon,
    },
  ];
  const linkStyles = {
    textDecoration: "none",
    color: "black",
  };
  const clickStyles = {
    textDecoration: "none",
    color: "#a80532f0",
  };
  const renderMenu = menuData.map((menu, index) => {
    return (
      <NavLink
        to={menu.link}
        style={({ isActive }) => {
          isActive && setMenuActive(index);
          return isActive ? clickStyles : linkStyles;
        }}
        key={index}
        end
        exact={true}
      >
        <div className={styles["sidebar--menu-title-container"]} key={index}>
          <img
            src={menuActive === index ? menu.clickedIcon : menu.icon}
            className={styles["sidebar--menu-icon"]}
          />
          <p className={styles["sidebar--menu-text"]}>{menu.title}</p>
        </div>
      </NavLink>
    );
  });
  return (
    <>
      <div className={styles["sidebar--main-container"]}>
        <div className={styles["sidebar--menu-container"]}>
          <div className={styles["sidebar--menu-inner-container"]}>
            <NavLink
              style={{
                alignSelf: "center",
                // dispay: "flex",
                // alignItems: "center",
              }}
            >
              <img src={PIlogo} className={styles["sidebar--company-logo"]} />
            </NavLink>
            {renderMenu}
          </div>
          <div className={styles["sidebar--support-logout-container"]}>
            <NavLink
              to="/support"
              style={({ isActive }) => {
                isActive && setMenuActive(12);
                return isActive ? clickStyles : linkStyles;
              }}
            >
              <div className={styles["sidebar--menu-title-container"]}>
                <img
                  src={menuActive === 12 ? FAQRedIcon : FAQIcon}
                  className={styles["sidebar--menu-icon"]}
                />
                <p className={styles["sidebar--menu-text"]}>FAQs and Support</p>
              </div>
            </NavLink>

            <div
              className={styles["sidebar--menu-title-container"]}
              style={{ cursor: "pointer" }}
              onClick={props.logout}
            >
              <img src={logoutIcon} className={styles["sidebar--menu-icon"]} />
              <p className={styles["sidebar--menu-text"]}>Log Out</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles["sidebar--mobile-hamburger-container"]}
        onClick={() => {
          props.setMobileSidebar(true);
        }}
        style={{ height: props.mobileSidebar && 0 }}
      >
        <img
          className={styles["sidebar--mobile-hamburger"]}
          src={hamburgerIcon}
        />
      </div>
      <div
        style={{ display: props.mobileSidebar ? "flex" : "none" }}
        className={styles["sidebar--mobile-main-container"]}
      >
        <img
          src={crossIcon}
          className={styles["sidebar--mobile-cross-icon"]}
          onClick={() => props.setMobileSidebar(false)}
        />
        <div className={styles["sidebar--mobile-menu-list-container"]}>
          {menuData.map((menu, index) => {
            return (
              <NavLink
                to={menu.link}
                onClick={() => props.setMobileSidebar(false)}
                style={({ isActive }) => {
                  isActive && setMenuActive(index);
                  return isActive ? clickStyles : linkStyles;
                }}
              >
                <div className={styles["sidebar--mobile-menu-container"]}>
                  <img
                    src={menuActive === index ? menu.clickedIcon : menu.icon}
                    className={styles["sidebar--mobile-menu-icon"]}
                  />
                  <p className={styles["sidebar--mobile-menu-title"]}>
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
