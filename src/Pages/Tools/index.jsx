import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import ToolsTopbar from "../../CommonComponents/ToolsTopbar";
import Group from "./Images/Group.png";
import LinkIcon from "./Images/all-links-fill-icon.svg";
import arrow_right from "./Images/arrow_right.png";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ProductLinks from "../ProductLinks";

export default function Tools() {
  const navigate = useNavigate();
  const primaryData = useContext(PrimaryDataContext);
  const documents = primaryData?.documents;
  const [documentType, setDocumentType] = useState("sales");

  const filteredDocument = documents?.filter(
    (document) => document?.category === documentType
  );
  const allLinksData = [
    {
      name: "Sales",
      type: "sales",
      subsections: [
        {
          title: "Insurance Sales",
          description:
            "This resource contains basic information about sales in the insurance industry.",
          link: "https://www.google.com",
        },
        {
          title: "Sales Training",
          description:
            "This resource contains basic information about sales training.",
          link: "https://www.google.com",
        },
        {
          title: "Sales Strategy",
          description:
            "This resource contains basic information about sales strategy.",
          link: "https://www.google.com",
        },
      ],
    },
    {
      name: "Marketing",
      type: "marketing",
      subsections: [
        {
          title: "Marketing Strategy",
          description:
            "This resource contains basic information about marketing strategy.",
          link: "https://www.google.com",
        },
        {
          title: "Marketing Training",
          description:
            "This resource contains basic information about marketing training.",
          link: "https://www.google.com",
        },
        {
          title: "Marketing Sales",
          description:
            "This resource contains basic information about marketing sales.",
          link: "https://www.google.com",
        },
      ],
    },
    {
      name: "Finance",
      type: "sales",
      subsections: [
        {
          title: "Finance Strategy",
          description:
            "This resource contains basic information about finance strategy.",
          link: "https://www.google.com",
        },
        {
          title: "Finance Training",
          description:
            "This resource contains basic information about finance training.",
          link: "https://www.google.com",
        },
        {
          title: "Finance Sales",
          description:
            "This resource contains basic information about finance sales.",
          link: "https://www.google.com",
        },
      ],
    },
    {
      name: "Operations",
      type: "calculator",
      subsections: [
        {
          title: "Operations Strategy",
          description:
            "This resource contains basic information about operations strategy.",
          link: "https://www.google.com",
        },
        {
          title: "Operations Training",
          description:
            "This resource contains basic information about operations training.",
          link: "https://www.google.com",
        },
        {
          title: "Operations Sales",
          description:
            "This resource contains basic information about operations sales.",
          link: "https://www.google.com",
        },
      ],
    },
  ];

  const filteredLinks = allLinksData.filter(
    (link) => link?.type === documentType
  );

  const renderFilteredLinks = filteredLinks?.map((link) => {
    return (
      <div onClick={() => navigate("/internal-links", { state: { link } })}>
        <div className={styles["Tools-wrapper-main-content"]}>
          <div className={styles["Tools-wrapper-main-content-div"]}>
            <div className={styles["Tools-wrapper-main-content-image"]}>
              <img src={LinkIcon} height="28px" />
            </div>
            <div className={styles["Tools-wrapper-main-content-file"]}>
              {link?.name}
            </div>
          </div>
          <img
            src={arrow_right}
            className={styles["Tools-wrapper-main-content-arrow"]}
          />
        </div>
      </div>
    );
  });

  console.log("These are the documents: ", documents);

  return (
    <div className={styles["Tools-wrapper"]}>
      <ToolsTopbar
        setDocumentType={setDocumentType}
        documentType={documentType}
      />
      {documentType === "productLinks" ? (
        <ProductLinks />
      ) : (
        filteredDocument?.map((item) => (
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
        ))
      )}
      {renderFilteredLinks}
    </div>
  );
}
