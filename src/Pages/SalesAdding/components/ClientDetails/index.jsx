import React, { useState } from "react";
import styles from "./styles.module.scss";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";

export default function ClientDetails() {
  const [arrowChange, setArrowChange] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");

  const toggleArrowChange = () => {
    setArrowChange((prev) => !prev);
  };
  const handleBlur = () => {
    console.log("blurred");
    setArrowChange(false);
  };
  const handleDropdownValue = (value) => {
    setDropdownValue(value);
  };
  const clientInputData = [
    { text: "Client Name", type: "text", height: 35 },
    { text: "Gender", type: "dropdown", height: 35 },
    { text: "Email Address", type: "text", height: 35 },
    { text: "Phone Number", type: "text", height: 35 },
    { text: "Local Address", type: "text", height: 50 },
    { text: "Date of Birth", type: "text", height: 35 },
    { text: "Anniversary", type: "text", height: 35 },
  ];
  const renderClientInput = clientInputData.map((input, index) => {
    if (input.type === "dropdown") {
      return (
        <div
          className={styles["clientDetails--input-inner-container"]}
          key={index}
        >
          <p className={styles["clientDetails--input-text"]}>{input.text}</p>
          <div
            className={styles["clientDetails--input-dropdown"]}
            style={{ height: input.height }}
            onClick={toggleArrowChange}
            onBlur={handleBlur}
          >
            {dropdownValue}
            <div
              className={styles["clientDetails--input-options-container"]}
              style={{ display: arrowChange ? "flex" : "none" }}
            >
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Male")}
              >
                Male
              </div>
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Female")}
              >
                Female
              </div>
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Other")}
              >
                Other
              </div>
            </div>
          </div>
          <img
            src={arrowChange ? arrowUp : arrowDown}
            className={styles["clientDetails--input-arrow"]}
          />
        </div>
      );
    }
    return (
      <div className={styles["clientDetails--input-inner-container"]}>
        <p className={styles["clientDetails--input-text"]}>{input.text}</p>
        <input
          className={styles["clientDetails--input"]}
          style={{ height: input.height }}
        />
      </div>
    );
  });
  return (
    <div
      className={styles["clientDetails--main-container"]}
      onClick={() => {
        if (arrowChange) {
          setArrowChange(false);
        }
      }}
    >
      <p className={styles["clientDetails--navigation-text"]}>
        <span className={styles["blue"]}>Client details</span> {">"} Sales
        Details
      </p>
      <div className={styles["clientDetails--inner-container"]}>
        <p className={styles["clientDetails--title-text"]}>Client Details</p>
        <div className={styles["clientDetails--input-choosing-container"]}>
          <div className={styles["clientDetails--input-container"]}>
            {renderClientInput}
          </div>
          <p>Or</p>
          <div className={styles["clientDetails-client-choosing-container"]}>
            <p>Client Name</p>
            <input />
          </div>
        </div>
      </div>
    </div>
  );
}
