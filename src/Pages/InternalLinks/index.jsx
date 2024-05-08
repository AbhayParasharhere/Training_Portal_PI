import React from "react";
import styles from "./styles.module.scss";
import fileIcon from "./images/file-icon.png";
import LinkIcon from "./images/all-links-red-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function InternalLinks() {
  const navigate = useNavigate();
  // const linksData = [
  //   {
  //     title: "Document 1",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   {
  //     title: "Document 2",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   {
  //     title: "Document 3",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   ,
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   ,
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   ,
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   ,
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   ,
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  //   ,
  //   {
  //     title: "Document 4",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  //     link: "https://youtube.com",
  //   },
  // ];
  const linksData = useLocation()?.state?.link;
  let renderLinks = [];
  if (linksData) {
    console.log("Links data", linksData);
    renderLinks = linksData?.subsections?.map((link) => {
      return (
        <div className={styles["internalLinks--link-container"]}>
          <p className={styles["internalLinks--link-title"]}>{link.title}</p>
          <div className={styles["internalLinks--link-desc-container"]}>
            <p className={styles["internalLinks--link-desc"]}>
              {link.description}
            </p>
            <a
              style={{ textDecoration: "none" }}
              className={styles["internalLinks--click"]}
              href={link.link}
              target="_blank"
            >
              Click to View
            </a>
          </div>
        </div>
      );
    });
  }
  return (
    <div className={styles["internalLinks--main-container"]}>
      <p
        className={styles["internalLinks--go-back"]}
        onClick={() => navigate(-1)}
      >
        {"<"}Go back
      </p>
      <div className={styles["internalLinks--inner-container"]}>
        <div className={styles["internalLinks--link-catagory"]}>
          <img src={LinkIcon} className={styles["internalLinks--file-icon"]} />
          <p className={styles["internalLinks--link-catagory-text"]}>
            {String(linksData?.name)[0].toUpperCase() +
              linksData?.name.slice(1)}
          </p>
        </div>
        <div className={styles["internalLinks--link-list-container"]}>
          {renderLinks}
        </div>
      </div>
    </div>
  );
}
