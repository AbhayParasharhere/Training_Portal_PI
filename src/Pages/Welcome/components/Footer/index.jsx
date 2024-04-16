import React from "react";
import styles from "./styles.module.scss";
import PILogo from "/assets/logo.png";
import instagramLogo from "./images/instagram-logo.png";
import twitterLogo from "./images/twitter-logo.png";
import linkedInLogo from "./images/linkedIn-icon.png";

export default function Footer() {
  return (
    <div className={styles["footer--main-container"]}>
      <div className={styles["footer--links-container"]}>
        <div className={styles["footer--left-links-container"]}>
          <img src={PILogo} className={styles["footer--logo"]} />
          <div className={styles["footer--left-links-inner-container"]}>
            <p className={styles["footer--links"]}>Contact</p>
            <p className={styles["footer--links"]}>Help</p>
            <p className={styles["footer--links"]}>FAQS</p>
          </div>
        </div>
        <div className={styles["footer--right-links-container"]}>
          <div className={styles["footer--right-links-inner-container"]}>
            <p className={styles["footer--links"]}>PRIVACY & POLICY</p>
            <p className={styles["footer--links"]}>TERMS & CONDITIONS</p>
          </div>
          <div className={styles["footer--social-media-icons-container"]}>
            <img
              className={styles["footer--social-media-icons"]}
              src={twitterLogo}
            />
            <img
              className={styles["footer--social-media-icons"]}
              src={instagramLogo}
            />{" "}
            <img
              className={styles["footer--social-media-icons"]}
              src={linkedInLogo}
            />
          </div>
        </div>
      </div>
      <div className={styles["footer--mobile-container"]}>
        <div className={styles["footer--mobile-left-links-container"]}>
          {" "}
          <p className={styles["footer--links"]}>Contact</p>
          <p className={styles["footer--links"]}>Help</p>
          <p className={styles["footer--links"]}>FAQS</p>
        </div>
        <div className={styles["footer--mobile-center-links-container"]}>
          {" "}
          <p className={styles["footer--links"]}>PRIVACY & POLICY</p>
          <p className={styles["footer--links"]}>TERMS & CONDITIONS</p>
        </div>
        <div className={styles["footer--mobile-social-media-container"]}>
          {" "}
          <img
            className={styles["footer--social-media-icons"]}
            src={twitterLogo}
          />
          <img
            className={styles["footer--social-media-icons"]}
            src={instagramLogo}
          />{" "}
          <img
            className={styles["footer--social-media-icons"]}
            src={linkedInLogo}
          />
        </div>
      </div>
      <p className={styles["footer--copyright-text-mobile"]}>
        Copyright © 2024
      </p>
      <p className={styles["footer--copyright-text-mobile"]}>
        Punjab Insurance All Rights Reserved
      </p>
      <p className={styles["footer--copyright-text"]}>
        Copyright © 2024 Punjab Insurance All Rights Reserved
      </p>
    </div>
  );
}
