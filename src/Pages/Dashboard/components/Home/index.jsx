import React from "react";
import styles from "./styles.module.scss";
import congratulationsEmoji from "./images/congratulations-emoji.png";
import playIcon from "./images/play-icon.png";
import clientPhoto from "./images/client-sample-image.png";
import cakeIcon from "./images/cakeIcon.png";

export default function Home() {
  return (
    <div className={styles["home--main-container"]}>
      <div className={styles["home--welcome-container"]}>
        <div className={styles["home--greetings-container"]}>
          <p className={styles["home--greetings-title"]}>
            Good Morning Gurpreet
          </p>
          <div className={styles["home--greetings-desc-container"]}>
            <p className={styles["home--greetings-desc"]}>
              Welcome to your Dashboard!
            </p>
            <p className={styles["home--greetings-desc"]}>
              Your hub for Managing Clients, Monitoring Sales, and Acheiving
              Sucess. Let's Get Started
            </p>
          </div>
        </div>
        <div className={styles["home--course-greeting-container"]}>
          <img
            src={congratulationsEmoji}
            className={styles["home--congratulations-emoji"]}
          />
          <div className={styles["home--course-greeting-text-container"]}>
            <p className={styles["home--course-greeting-title"]}>
              Mastering Risk Management in Insurance
            </p>
            <p className={styles["home--course-greeting-desc"]}>
              "Congratulations on completing your online course! Wishing you
              continued success!"
            </p>
          </div>
        </div>
      </div>

      {/*Welcome and Greeting part completed */}

      <div className={styles["home--recent-notifications-main-container"]}>
        <div className={styles["home--sales-course-notification-container"]}>
          <div className={styles["home--notification-links-container"]}>
            <p className={styles["home--notification-links"]}>
              Course Progress
              <hr className={styles["home--notification-links-underline"]} />
            </p>
            <p className={styles["home--notification-links"]}>
              Recent Sales{" "}
              <hr className={styles["home--notification-links-underline"]} />
            </p>
            <p className={styles["home--notification-links"]}>
              Latest Policies{" "}
              <hr className={styles["home--notification-links-underline"]} />
            </p>
          </div>
          <div className={styles["home--notification-lists-container"]}>
            <div className={styles["home--notification-lists"]}>
              <div className={styles["home--list-title-container"]}>
                <img src={playIcon} />
                <p>Regulatory Compliance 101</p>
              </div>
              <button className={styles["home--continue-button"]}>
                Continue
              </button>
            </div>
            <div></div>
            <div className={styles["home--notification-lists"]}>
              <div className={styles["home--list-title-container"]}>
                <img src={playIcon} />
                <p>Regulatory Compliance 101</p>
              </div>
              <button className={styles["home--continue-button"]}>
                Continue
              </button>
            </div>{" "}
            <div className={styles["home--notification-lists"]}>
              <div className={styles["home--list-title-container"]}>
                <img src={playIcon} />
                <p>Regulatory Compliance 101</p>
              </div>
              <button className={styles["home--continue-button"]}>
                Continue
              </button>
            </div>
          </div>
        </div>
        <div className={styles["home--client-birthday-container"]}>
          <p className={styles["home--client-birthday-title"]}>
            Upcoming Clients Bithdays And Anniversary
          </p>
          <div className={styles["home--client-birthday-list"]}>
            <div className={styles["home--client-birthday"]}>
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>
            <div className={styles["home--client-birthday"]}>
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>{" "}
            <div className={styles["home--client-birthday"]}>
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>{" "}
            <div className={styles["home--client-birthday"]}>
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>{" "}
            <div className={styles["home--client-birthday"]}>
              <div className={styles["home--client-birthday-inner-container"]}>
                <img
                  src={clientPhoto}
                  className={styles["home--client-image"]}
                />
                <div className={styles["home--birthday-name-date-container"]}>
                  <p className={styles["home--client-name"]}>Client Name</p>
                  <p className={styles["home--birthday-date"]}>
                    April 24, 2024
                  </p>{" "}
                </div>
              </div>
              <img src={cakeIcon} className={styles["home--cake-icon"]} />
            </div>
          </div>
        </div>
      </div>

      {/*Notification part completed */}

      <div className={styles["home--important-updates-container"]}>
        <p className={styles["home--important-updates-title"]}>
          Import Updates
        </p>
        <div className={styles["home--annoucement-list-container"]}>
          <div className={styles["home--annoucement-container"]}>
            <div className={styles["home--annoucement-details-container"]}>
              <p className={styles["home--annoucement-details-text"]}>Admin</p>
              <p className={styles["home--annoucement-details-text"]}>
                20 min ago{" "}
              </p>
            </div>
            <div>
              <ui>
                <li className={styles["home--annoucement-text"]}>
                  The upcoming webinar on customer retention strategies is
                  scheduled for next Tuesday at 10 AM EST.
                </li>
              </ui>
            </div>
          </div>
          <div className={styles["home--annoucement-container"]}>
            <div className={styles["home--annoucement-details-container"]}>
              <p className={styles["home--annoucement-details-text"]}>Admin</p>
              <p className={styles["home--annoucement-details-text"]}>
                20 min ago{" "}
              </p>
            </div>
            <div>
              <ui>
                <li className={styles["home--annoucement-text"]}>
                  The upcoming webinar on customer retention strategies is
                  scheduled for next Tuesday at 10 AM EST.
                </li>
              </ui>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
