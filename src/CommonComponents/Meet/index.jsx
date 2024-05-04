import React from "react";
import styles from "./styles.module.scss";
import line from "./Images/line.png";
import google from "./Images/google.png";

export default function Meet(props) {
  return (
    <div className={styles["meet-wrapper"]}>
      <div className={styles["meet-wrapper-head"]}>
        Schedule a meeting with your client <br />
        Select a date and time that works best for both of you.
      </div>
      <div className={styles["meet-wrapper-form"]}>
        <div className={styles["meet-wrapper-form-topic"]}>
          <label className={styles["meet-wrapper-form-label"]}>Topic</label>
          <input className={styles["meet-wrapper-form-input"]}></input>
        </div>
        <div className={styles["meet-wrapper-form-description"]}>
          <label className={styles["meet-wrapper-form-label-desc"]}>
            Description <br />
            (Optional)
          </label>
          <label className={styles["meet-wrapper-form-label-desc-mobile"]}>
            Description (Optional)
          </label>
          <textarea className={styles["meet-wrapper-form-input"]}></textarea>
        </div>
        <div className={styles["meet-wrapper-form-date-div"]}>
          <div className={styles["meet-wrapper-form-date"]}>
            <label className={styles["meet-wrapper-form-label"]}>Date</label>
            <input
              type="date"
              className={styles["meet-wrapper-form-input-date"]}
            ></input>
          </div>
          <div className={styles["meet-wrapper-form-time"]}>
            <label className={styles["meet-wrapper-form-label"]}>Time</label>
            <input
              type="time"
              className={styles["meet-wrapper-form-input-date"]}
            ></input>
          </div>
        </div>
        <div className={styles["meet-wrapper-form-button"]}>
          <div className={styles["meet-wrapper-form-button-meet"]}>
            Create Meeting
          </div>
          <div
            className={styles["meet-wrapper-form-button-cancel"]}
            onClick={() => props.setModalOpen(false)}
          >
            Cancel
          </div>
        </div>
      </div>
      <img src={line} className={styles["meet-wrapper-line"]} />
      <div className={styles["meet-wrapper-google-button"]}>
        <img src={google} height="24px" /> Meet with Google
      </div>
    </div>
  );
}
