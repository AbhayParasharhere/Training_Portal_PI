import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import dashboardIcon from "./images/dashboard-icon.png";
import dashboardFillIcon from "./sidebarSvg/dashboard-fill-icon.svg";
import coursesIcon from "./images/courses-icon.png";
import coursesFillIcon from "./sidebarSvg/course-fill-icon.svg";
import productTrainingIcon from "./images/productTraining-icon.png";
import productTrainingFillIcon from "./sidebarSvg/product-training-fill-icon.svg";
import statisticsIcon from "./images/statistics-icon.png";
import statisticsFillIcon from "./sidebarSvg/statistics-fill-icon.svg";
import clientsIcon from "./images/clients-icon.png";
import clientFillIcon from "./sidebarSvg/client-fill-icon.svg";
import toolsResourcesIcon from "./images/tools-resources-icon.png";
import toolsResourcesFillIcon from "./sidebarSvg/tools-resources-fill-icon.svg";
import announcementIcon from "./images/announcement-icon.png";
import announcementFillIcon from "./sidebarSvg/announcement-fill-icon.svg";
import webinarIcon from "./images/webinar-icon.png";
import webinarFillIcon from "./sidebarSvg/webinar-fill-icon.svg";
import complianceIcon from "./images/compliance-icon.png";
import complianceFillIcon from "./sidebarSvg/compliance-fill-icon.svg";
import communicationIcon from "./images/communication-icon.png";
import communicationFillIcon from "./sidebarSvg/communication-fill-icon.svg";
import allLinksIcon from "./images/all-link-icon.png";
import allLinksFillIcon from "./sidebarSvg/all-links-fill-icon.svg";
import logoutIcon from "./images/logout-icon.png";
import FAQIcon from "./images/FAQ-icon.png";
import FAQFillIcon from "./sidebarSvg/FAQ-fill-icon.svg";
import addSalesIcon from "./images/add-sales-icon.png";
import addSalesFillIcon from "./sidebarSvg/add-sales-fill-icon.svg";
import hamburgerIcon from "./images/hamburger-icon.png";
import crossIcon from "./images/cross-icon.png";
import powerCompassLogo from "./images/power-compass-logo.png";

import { Link, NavLink, redirect, useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const [menuActive, setMenuActive] = useState();

  const menuData = [
    {
      icon: dashboardIcon,
      title: "Dashboard",
      link: "/",
      clickedIcon: dashboardFillIcon,
    },
    {
      icon: addSalesIcon,
      title: "Add Sales",
      link: "/addSales",
      clickedIcon: addSalesFillIcon,
    },
    {
      icon: clientsIcon,
      title: "Clients",
      link: "/clients",
      clickedIcon: clientFillIcon,
    },
    {
      icon: coursesIcon,
      title: "Courses",
      link: "/courses",
      clickedIcon: coursesFillIcon,
    },
    {
      icon: productTrainingIcon,
      title: "Product Training",
      link: "/productCourses",
      clickedIcon: productTrainingFillIcon,
    },
    {
      icon: toolsResourcesIcon,
      title: "Tools and Resources",
      link: "/tools",
      clickedIcon: toolsResourcesFillIcon,
    },
    {
      icon: complianceIcon,
      title: "Compliance and Policy",
      link: "/compliance",
      clickedIcon: complianceFillIcon,
    },
    {
      icon: statisticsIcon,
      title: "Statistics",
      link: "/statistics",
      clickedIcon: statisticsFillIcon,
    },
    ,
    {
      icon: announcementIcon,
      title: "Announcements",
      link: "/announcement",
      clickedIcon: announcementFillIcon,
    },
    {
      icon: webinarIcon,
      title: "Meetings",
      link: "/webinar",
      clickedIcon: webinarFillIcon,
    },
    {
      icon: communicationIcon,
      title: "Connect with Others",
      link: "/connect",
      clickedIcon: communicationFillIcon,
    },
    ,
    {
      icon: allLinksIcon,
      title: "All links",
      link: "/all-links",
      clickedIcon: allLinksFillIcon,
    },
  ];
  const linkStyles = {
    textDecoration: "none",
    color: "black",
    padding: "10px 15px",
  };
  const clickStyles = {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#00203C",
    padding: "10px 15px",
    borderRadius: "15px",
    fontWeight: "700",
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
              <img
                src={powerCompassLogo}
                className={styles["sidebar--company-logo"]}
              />
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
                  src={menuActive === 12 ? FAQFillIcon : FAQIcon}
                  className={styles["sidebar--menu-icon"]}
                />
                <p className={styles["sidebar--menu-text"]}>FAQs and Support</p>
              </div>
            </NavLink>

            <div
              className={styles["sidebar--menu-title-container"]}
              style={{ cursor: "pointer", padding: "10px 15px" }}
              onClick={props.logout}
            >
              <img src={logoutIcon} className={styles["sidebar--menu-icon"]} />
              <p
                className={styles["sidebar--menu-text"]}
                style={{ color: "#DA1212" }}
              >
                Log Out
              </p>
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

          <NavLink
            to="/support"
            onClick={() => props.setMobileSidebar(false)}
            style={({ isActive }) => {
              isActive && setMenuActive(12);
              return isActive ? clickStyles : linkStyles;
            }}
          >
            <div className={styles["sidebar--mobile-menu-container"]}>
              <img
                src={menuActive === 12 ? FAQFillIcon : FAQIcon}
                className={styles["sidebar--mobile-menu-icon"]}
              />
              <p className={styles["sidebar--mobile-menu-title"]}>
                FAQs and Support
              </p>
            </div>
          </NavLink>

          <div
            className={styles["sidebar--mobile-menu-container"]}
            style={{ cursor: "pointer" }}
            onClick={props.logout}
          >
            <img
              src={logoutIcon}
              className={styles["sidebar--mobile-menu-icon"]}
            />
            <p className={styles["sidebar--mobile-menu-title"]}>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
}
