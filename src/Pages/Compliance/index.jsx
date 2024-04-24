import React, { useState } from "react";
import styles from "./styles.module.scss";
import fileIcon from "./images/file-icon.png";
import arrowIcon from "./images/arrow-icon.png";

export default function Compliance() {
  const [navigationState, setNavigationState] = useState("compliance");

  const handleNavigationClick = (value) => {
    setNavigationState(value);
  };
  return (
    <div className={styles["compliance--main-container"]}>
      <div className={styles["compliance--navigation-container"]}>
        <p
          className={styles["compliance--navigation-text"]}
          onClick={() => handleNavigationClick("compliance")}
          style={{
            color: navigationState === "compliance" ? "#123C97" : "#A1A1A1",
            fontWeight: navigationState === "compliance" ? "600" : "500",
          }}
        >
          Compliance
          <hr
            className={styles["compliance--navigation-underline"]}
            style={{
              borderColor:
                navigationState === "compliance" ? "#123C97" : "#A1A1A1",
            }}
          />
        </p>
        <p
          className={styles["compliance--navigation-text"]}
          onClick={() => handleNavigationClick("policies")}
          style={{
            color: navigationState === "policies" ? "#123C97" : "#A1A1A1",
            fontWeight: navigationState === "policies" ? "600" : "500",
          }}
        >
          Policies
          <hr
            className={styles["compliance--navigation-underline"]}
            style={{
              borderColor:
                navigationState === "policies" ? "#123C97" : "#A1A1A1",
            }}
          />
        </p>
      </div>
      <div className={styles["compliance--document-list"]}>
        <div className={styles["compliance--document-container"]}>
          <div className={styles["compliance--document-icon-name-container"]}>
            <img
              className={styles["compliance--document-icon"]}
              src={fileIcon}
            />
            <p>File Name</p>
          </div>
          <img
            src={arrowIcon}
            className={styles["compliance--document-icon"]}
          />
        </div>
        <div className={styles["compliance--document-container"]}>
          <div className={styles["compliance--document-icon-name-container"]}>
            <img
              className={styles["compliance--document-icon"]}
              src={fileIcon}
            />
            <p>File Name</p>
          </div>
          <img
            src={arrowIcon}
            className={styles["compliance--document-icon"]}
          />
        </div>{" "}
        <div className={styles["compliance--document-container"]}>
          <div className={styles["compliance--document-icon-name-container"]}>
            <img
              className={styles["compliance--document-icon"]}
              src={fileIcon}
            />
            <p>File Name</p>
          </div>
          <img
            src={arrowIcon}
            className={styles["compliance--document-icon"]}
          />
        </div>{" "}
        <div className={styles["compliance--document-container"]}>
          <div className={styles["compliance--document-icon-name-container"]}>
            <img
              className={styles["compliance--document-icon"]}
              src={fileIcon}
            />
            <p>File Name</p>
          </div>
          <img
            src={arrowIcon}
            className={styles["compliance--document-icon"]}
          />
        </div>
      </div>
    </div>
  );
}
