import React from "react";
import styles from "./styles.module.scss";

export default function ClientInfo() {
  return (
    <div className={styles["ClientInfo-wrapper"]}>
      <div className={styles["ClientInfo-wrapper-topbar"]}>
        <div className={styles["ClientInfo-wrapper-topbar-div"]}>
          <div className={styles["ClientInfo-wrapper-topbar-text"]}>
            Client Information
          </div>
          <div className={styles["ClientInfo-wrapper-topbar-text"]}>
            Purchased Policies
          </div>
          <div className={styles["ClientInfo-wrapper-topbar-text"]}>
            Financial Goals
          </div>
        </div>
        <div className={styles["ClientInfo-wrapper-topbar-buttons"]}>
          <button className={styles["ClientInfo-wrapper-topbar-buttons-save"]}>
            Save Changes
          </button>
          <button className={styles["ClientInfo-wrapper-topbar-buttons-meet"]}>
            Organize Meet
          </button>
        </div>
      </div>
      <div className={styles["ClientInfo-wrapper-form"]}>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="name">Full Name</label>
          <input
            type="text"
            name="name"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="gender">Gender</label>
          <input
            type="text"
            name="gender"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="number">Phone Number</label>
          <input
            type="text"
            name="number"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="address">Local Address</label>
          <input
            type="text"
            name="address"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
        <div className={styles["ClientInfo-wrapper-form-text"]}>
          {" "}
          <label for="anniv">Anniversary</label>
          <input
            type="date"
            name="anniv"
            className={styles["ClientInfo-wrapper-form-text-input"]}
          ></input>
        </div>
      </div>
    </div>
  );
}
