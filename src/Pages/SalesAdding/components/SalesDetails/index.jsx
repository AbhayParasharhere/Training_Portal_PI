import React, { useState } from "react";
import styles from "./styles.module.scss";
import checkIcon from "./images/check.png";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";

export default function SalesDetails() {
  const [changeSalesArrowPolicy, setChangeSalesArrowPolicy] = useState(false);
  const [changeSalesArrowChannel, setChangeSalesArrowChannel] = useState(false);
  const [salesDetailsData, setSalesDetailsData] = useState({});

  const toggleArrowChangePolicy = () => {
    setChangeSalesArrowPolicy((prev) => !prev);
  };

  const toggleArrowChangeChannel = () => {
    setChangeSalesArrowChannel((prev) => !prev);
  };
  const handleDropdownChange = (inputName, value) => {
    setSalesDetailsData({ ...salesDetailsData, [inputName]: value });
    console.log(salesDetailsData);
  };
  const inputData = [
    { text: "Broker Name", type: "text", name: "broker_name" },
    { text: "Broker ID", type: "text", name: "broker_ID" },
    {
      text: "Policy Type",
      type: "dropdown",
      options: ["Insaurance", "Loan"],
      arrowState: changeSalesArrowPolicy,
      function: toggleArrowChangePolicy,
      name: "policy_type",
    },
    {
      text: "Sales Channel",
      type: "dropdown",
      options: ["In-person", "Online", "Phone"],
      arrowState: changeSalesArrowChannel,
      function: toggleArrowChangeChannel,
      name: "sales_channel",
    },
    { text: "Policy No.", type: "text", name: "policy_number" },
    { text: "Premium Account", type: "text", name: "premium_account" },
    { text: "Effective Date", type: "date", name: "effective_date" },
    { text: "End Date", type: "date", name: "end_date" },
    { text: "Commision Earned", type: "text", name: "commision_earned" },
  ];

  const handleChange = (event) => {
    console.log(salesDetailsData);
    setSalesDetailsData({
      ...salesDetailsData,
      [event.target.name]: event.target.value,
    });
  };
  const renderSalesInput = inputData.map((input, index) => {
    if (input.type === "dropdown") {
      return (
        <div
          className={styles["salesDetails--inner-input-container"]}
          key={index}
        >
          <p className={styles["salesDetails--input-text"]}>{input.text}</p>
          <div
            className={styles["salesDetails--input-dropdown"]}
            onClick={input.function}
            style={{ border: input.arrowState && "1px solid #3064D4" }}
          >
            <div
              className={styles["salesDetails--input-drodown-option-container"]}
              style={{ display: input.arrowState ? "flex" : "none" }}
            >
              {input.options.map((option) => {
                return (
                  <div
                    className={styles["salesDetails--dropdown-options"]}
                    onClick={() => handleDropdownChange(input.name, option)}
                    style={{
                      backgroundColor:
                        salesDetailsData[input.name] === option
                          ? "#F9FAFB"
                          : "white",
                    }}
                  >
                    {option}
                    {salesDetailsData[input.name] === option && (
                      <img
                        src={checkIcon}
                        className={styles["clientDetails--check-icon"]}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <img
              src={input.arrowState ? arrowUp : arrowDown}
              className={styles["salesDetails--input-arrow"]}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={styles["salesDetails--inner-input-container"]}
        key={index}
      >
        <p className={styles["salesDetails--input-text"]}>{input.text}</p>
        <input
          name={input.name}
          className={styles["salesDetails--input"]}
          type={input.type}
          onChange={handleChange}
        />
      </div>
    );
  });
  return (
    <div
      className={styles["salesDetails--main-container"]}
      onClick={() => {
        if (changeSalesArrowChannel) {
          setChangeSalesArrowChannel(false);
        }
        if (changeSalesArrowPolicy) {
          setChangeSalesArrowPolicy(false);
        }
      }}
    >
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
