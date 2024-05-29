import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import fileIcon from "./images/file-icon.png";
import arrowIcon from "./images/arrow-icon.png";
import { PrimaryDataContext } from "../../context/primaryDataContext";

export default function Compliance() {
  const [navigationState, setNavigationState] = useState("compliance");

  const handleNavigationClick = (value) => {
    setNavigationState(value);
  };
  const primaryData = useContext(PrimaryDataContext);
  const allDocuments = primaryData?.documents;
  const filteredDocument = allDocuments?.filter(
    (document) => document?.category === navigationState
  );
  const renderDocuments = filteredDocument?.map((document) => {
    return (
      <a
        href={document?.download_URL}
        style={{ textDecoration: "none", color: "black" }}
        target="_blank"
        className={styles["compliance--document-container"]}
      >
        <div className={styles["compliance--document-icon-name-container"]}>
          <img className={styles["compliance--document-icon"]} src={fileIcon} />
          <p className={styles["compliance--document-name"]}>
            {document?.documentName}
          </p>
        </div>
        <img src={arrowIcon} className={styles["compliance--document-icon"]} />
      </a>
    );
  });
  return (
    <div className={styles["compliance--main-container"]}>
      <div className={styles["compliance--navigation-container"]}>
        <p
          className={styles["compliance--navigation-text"]}
          onClick={() => handleNavigationClick("compliance")}
          style={{
            color: navigationState === "compliance" ? "#212529" : "#A1A1A1",
            fontWeight: navigationState === "compliance" ? "600" : "500",
          }}
        >
          Compliance
          <hr
            className={styles["compliance--navigation-underline"]}
            style={{
              borderColor:
                navigationState === "compliance" ? "#212529" : "#A1A1A1",
            }}
          />
        </p>
        <p
          className={styles["compliance--navigation-text"]}
          onClick={() => handleNavigationClick("policies")}
          style={{
            color: navigationState === "policies" ? "#212529" : "#A1A1A1",
            fontWeight: navigationState === "policies" ? "600" : "500",
          }}
        >
          Policies
          <hr
            className={styles["compliance--navigation-underline"]}
            style={{
              borderColor:
                navigationState === "policies" ? "#212529" : "#A1A1A1",
            }}
          />
        </p>
      </div>
      <div className={styles["compliance--document-list"]}>
        {renderDocuments}
      </div>
    </div>
  );
}
