import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { PrimaryDataContext } from "../../context/primaryDataContext";

export default function ClientTopbar(props) {
  function SaveChanges() {
    console.log("Save Changes");
  }
  function OrganizeMeet() {
    console.log("Organize Meet");
  }
  const activeStyles = { color: "#123c97", borderColor: "#123c97" };
  const inActiveStyles = { color: "green", borderColor: "#123c97" };

  return (
    <div className={styles["ClientInfo-wrapper-topbar"]}>
      <div className={styles["ClientInfo-wrapper-topbar-div"]}>
        <NavLink
          exact={true}
          end
          to={`.`}
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className={styles["ClientInfo-wrapper-topbar-text"]}
        >
          Client Information
        </NavLink>
        <NavLink
          exact={true}
          to={`/client-detail/${props.clientId}/policies`}
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className={styles["ClientInfo-wrapper-topbar-text"]}
        >
          Purchased Policies
        </NavLink>
        <NavLink
          exact={true}
          to={`/client-detail/${props.clientId}/goals`}
          style={({ isActive }) => (isActive ? activeStyles : null)}
          className={styles["ClientInfo-wrapper-topbar-text"]}
        >
          Financial Goals
        </NavLink>
      </div>
      <div className={styles["ClientInfo-wrapper-topbar-buttons"]}>
        <button
          className={styles["ClientInfo-wrapper-topbar-buttons-save"]}
          onClick={SaveChanges}
        >
          Save Changes
        </button>
        <button
          className={styles["ClientInfo-wrapper-topbar-buttons-meet"]}
          onClick={OrganizeMeet}
        >
          Organize Meet
        </button>
      </div>
    </div>
  );
}
