import React from "react";
import styles from "./styles.module.scss";
import checkIcon from "./images/check.png";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";

export default function SalesDetails() {
  const inputData = [
    { text: "Broker Name", type: "text" },
    { text: "Broker ID", type: "text" },
    { text: "Policy Type", type: "dropdown", options: ["Insaurance", "Loan"] },
    {
      text: "Sales Channel",
      type: "text",
      options: ["In-person", "Online", "Phone"],
    },
    { text: "Policy No.", type: "text" },
    { text: "Premium Account", type: "text" },
    { text: "Effective Date", type: "date" },
    { text: "End Date", type: "date" },
    { text: "Commision Earned", type: "text" },
  ];
  const renderSalesInput = inputData.map((input) => {
    if (input.type === "dropdown") {
      return (
        <div
          className={styles["clientDetails--input-inner-container"]}
          key={index}
        >
          <p className={styles["clientDetails--input-text"]}>{input.text}</p>
          <div
            className={styles["clientDetails--input-dropdown"]}
            style={{
              height: input.height,
              border: arrowChange ? "1px solid #3064D4" : "1px solid #A1A1A1",
            }}
            onClick={toggleArrowChange}
          >
            {dropdownValue}
            <div
              className={styles["clientDetails--input-options-container"]}
              style={{
                display: arrowChange ? "flex" : "none",
              }}
            >
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Male")}
                style={{
                  backgroundColor:
                    dropdownValue === "Male" ? "#F9FAFB" : "white",
                }}
              >
                Male
                {dropdownValue === "Male" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Female")}
                style={{
                  backgroundColor:
                    dropdownValue === "Female" ? "#F9FAFB" : "white",
                }}
              >
                Female
                {dropdownValue === "Female" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Other")}
                style={{
                  backgroundColor:
                    dropdownValue === "Other" ? "#F9FAFB" : "white",
                }}
              >
                Other
                {dropdownValue === "Other" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
            </div>
            <img
              src={arrowChange ? arrowUp : arrowDown}
              className={styles["clientDetails--input-arrow"]}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={styles["salesDetails--inner-input-container"]}>
        <p className={styles["salesDetails--input-text"]}>{input.text}</p>
        <input className={styles["salesDetails--input"]} />
      </div>
    );
  });
  return (
    <div className={styles["salesDetails--main-container"]}>
      <p className={styles["clientDetails--navigation-text"]}>
        Client details {">"}
        <span className={styles["blue"]}> Sales Details</span>
      </p>{" "}
      <div className={styles["salesDetails--inner-container"]}>
        <p className={styles["salesDetails--title-text"]}>Client Details</p>
        <div className={styles["salesDetails--input-main-container"]}>
          {renderSalesInput}
          <button className={styles["salesDetails--save-button"]}>
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
}
