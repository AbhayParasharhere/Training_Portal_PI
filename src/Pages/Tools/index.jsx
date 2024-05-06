import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ToolsTopbar from "../../CommonComponents/ToolsTopbar";
import Group from "./Images/Group.png";
import arrow_right from "./Images/arrow_right.png";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Firebase/firebaseConfig";

export default function Tools() {
  const primaryData = useContext(PrimaryDataContext);
  const documents = primaryData?.documents;
  const [documentType, setDocumentType] = useState("sales");

  const filteredDocument = documents?.filter(
    (document) => document?.category === documentType
  );
  console.log("These are the documents: ", documents);

  return (
    <div className={styles["Tools-wrapper"]}>
      <ToolsTopbar
        setDocumentType={setDocumentType}
        documentType={documentType}
      />
      {filteredDocument?.map((item) => (
        <a
          href={item?.download_URL}
          target="_blank"
          style={{ textDecoration: "none" }}
          download={item?.documentName}
          className={styles["Tools-wrapper-main-content"]}
          key={item?.documentName}
          onClick={() =>
            downloadDocument(item?.documentURL, item?.documentName)
          }
        >
          <div className={styles["Tools-wrapper-main-content-div"]}>
            <div className={styles["Tools-wrapper-main-content-image"]}>
              <img src={Group} height="28px" />
            </div>
            <div className={styles["Tools-wrapper-main-content-file"]}>
              {item?.documentName}
            </div>
          </div>
          <img
            src={arrow_right}
            className={styles["Tools-wrapper-main-content-arrow"]}
          />
        </a>
      ))}
    </div>
  );
}
