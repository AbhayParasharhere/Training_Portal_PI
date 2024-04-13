import React from "react";
import styles from "./styles.module.scss";
import profile from "./Images/profile.png";
import ClientTopbar from "../../CommonComponents/ClientTopbar";

export default function ClientInfo() {
  return (
    <div className={styles["ClientInfo-wrapper"]}>
      <ClientTopbar />
      <div className={styles["ClientInfo-wrapper-form-main"]}>
        {" "}
        <img
          src={profile}
          className={styles["ClientInfo-wrapper-form-image"]}
        />
        <div className={styles["ClientInfo-wrapper-form"]}>
          <div className={styles["ClientInfo-wrapper-form-container"]}>
            <div className={styles["ClientInfo-wrapper-form-text"]}>
              {" "}
              <label for="name">Full Name</label>
              <label for="gender">Gender</label>
              <label for="email">Email</label>
              <label for="number">Phone Number</label>
              <label for="address">Local Address</label>
              <label for="dob">Date of Birth</label>
            </div>
            <div className={styles["ClientInfo-wrapper-form-input"]}>
              <input
                type="text"
                name="name"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
              <input
                type="text"
                name="gender"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
              <input
                type="text"
                name="email"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
              <input
                type="text"
                name="number"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
              <input
                type="text"
                name="address"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
              <input
                type="date"
                name="dob"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
            </div>
          </div>
          <div className={styles["ClientInfo-wrapper-form-container-annv"]}>
            <div className={styles["ClientInfo-wrapper-form-text"]}>
              <label for="Annv">Anniversary</label>
            </div>
            <div className={styles["ClientInfo-wrapper-form-input"]}>
              <input
                type="date"
                name="Annv"
                className={styles["ClientInfo-wrapper-form-text-input"]}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["ClientInfo-wrapper-form-notes"]}>
        <p className={styles["ClientInfo-wrapper-form-notes-text"]}>
          Personal Notes
        </p>
        <textarea></textarea>
      </div>
    </div>
  );
}
