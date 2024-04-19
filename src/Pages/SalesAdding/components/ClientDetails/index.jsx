import React, { useState } from "react";
import styles from "./styles.module.scss";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";
import clientImage from "./images/sample-client-avatar.png";
import checkIcon from "./images/check.png";

export default function ClientDetails() {
  const [arrowChange, setArrowChange] = useState(false);
  const [arrowChangeClientChoosing, setArrowChangeClientChoosing] =
    useState(false);

  const [dropdownValue, setDropdownValue] = useState("");
  const [clientDropdownValue, setClientDropdownValue] = useState("");

  const toggleArrowChange = () => {
    setArrowChange((prev) => !prev);
  };
  const toggleClientArrowChange = () => {
    setArrowChangeClientChoosing((prev) => !prev);
  };

  const handleDropdownValue = (value) => {
    setDropdownValue(value);
  };
  const handleClientDropdownValue = (img, text) => {
    setClientDropdownValue({ img: img, text: text });
  };
  const clientInputData = [
    { text: "Client Name", type: "text", height: 35 },
    { text: "Choosing from existing client", type: "mobile", height: 35 },
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
    } else if (input.type === "mobile") {
      return (
        <div className={styles["clientDetails--input-inner-container-mobile"]}>
          <p className={styles["clientDetails--or-text-mobile"]}>Or</p>
          <p className={styles["clientDetails--client-choosing-title"]}>
            Choose from existing clients
          </p>
          <div
            className={styles["clientDetails--client-choosing-dropdown"]}
            onClick={toggleClientArrowChange}
            style={{
              border: arrowChangeClientChoosing
                ? "1px solid #3064D4"
                : "1px solid #A1A1A1",
            }}
          >
            <img src={clientDropdownValue.img} />
            {clientDropdownValue.text}
            <div
              className={styles["clientDetails--input-options-container"]}
              style={{ display: arrowChangeClientChoosing ? "flex" : "none" }}
            >
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() =>
                  handleClientDropdownValue(clientImage, "Client Name")
                }
                style={{
                  backgroundColor:
                    clientDropdownValue.text === "Client Name"
                      ? "#F9FAFB"
                      : "white",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={clientImage} />
                  Client Name
                </div>
                {clientDropdownValue.text === "Client Name" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
            </div>
            <img
              src={arrowChangeClientChoosing ? arrowUp : arrowDown}
              className={styles["clientDetails--input-arrow"]}
            />
          </div>
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
        if (arrowChangeClientChoosing) {
          setArrowChangeClientChoosing(false);
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
            <button className={styles["clientDetails--next-button"]}>
              Next
            </button>
          </div>
          <p className={styles["clientDetails--or-text"]}>Or</p>
          <div className={styles["clientDetails--client-choosing-container"]}>
            <p className={styles["clientDetails--client-choosing-title"]}>
              Choose from existing clients
            </p>
            <div
              className={styles["clientDetails--client-choosing-dropdown"]}
              onClick={toggleClientArrowChange}
              style={{
                border: arrowChangeClientChoosing
                  ? "1px solid #3064D4"
                  : "1px solid #A1A1A1",
              }}
            >
              <img src={clientDropdownValue.img} />
              {clientDropdownValue.text}
              <div
                className={styles["clientDetails--input-options-container"]}
                style={{ display: arrowChangeClientChoosing ? "flex" : "none" }}
              >
                <div
                  className={styles["clientDetails--input-options"]}
                  onClick={() =>
                    handleClientDropdownValue(clientImage, "Client Name")
                  }
                  style={{
                    backgroundColor:
                      clientDropdownValue.text === "Client Name"
                        ? "#F9FAFB"
                        : "white",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <img src={clientImage} />
                    Client Name
                  </div>
                  {clientDropdownValue.text === "Client Name" && (
                    <img
                      src={checkIcon}
                      className={styles["clientDetails--check-icon"]}
                    />
                  )}
                </div>
              </div>
              <img
                src={arrowChangeClientChoosing ? arrowUp : arrowDown}
                className={styles["clientDetails--input-arrow"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
