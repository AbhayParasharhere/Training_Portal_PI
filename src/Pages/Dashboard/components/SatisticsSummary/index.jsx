import React, { useState } from "react";
import styles from "./styles.module.scss";
import samplePhoto from "./images/profile-photo.png";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJs.register(CategoryScale, LinearScale, BarElement);

export default function StatsSummary() {
  const [graphData, setGraphData] = useState([
    { name: "M", value: "12" },
    { name: "T", value: "5" },
    { name: "W", value: "9" },
    { name: "T", value: "15" },
    { name: "F", value: "6" },
    { name: "S", value: "9" },
    { name: "S", value: "7" },
  ]);
  return (
    <div className={styles["statsSummary--main-container"]}>
      <div className={styles["statsSummary--profile-container"]}>
        <p className={styles["statsSummary--title"]}>Statistics</p>
        <div className={styles["statsSummary--profile-inner-container"]}>
          <img
            src={samplePhoto}
            className={styles["statsSummary--profile-image"]}
          />
          <p className={styles["statsSummary--name"]}>Gurpreet Singh</p>
          <p className={styles["statsSummary--desc"]}>
            Check out your weekly sales snapshot
          </p>
        </div>
        <div className={styles["statsSummary--sales-graph-container"]}>
          Weekly Sales Status
          <Bar
            data={{
              labels: graphData.map((data) => data.name),
              datasets: [
                {
                  data: graphData.map((data) => data.value),
                  backgroundColor: "#2D355C",
                  borderRadius: 3,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  display: false,
                  grid: {
                    display: false,
                  },
                },
              },
            }}
            style={{ width: "300px", height: "500px" }}
          />
        </div>
      </div>
      <div className={styles["statsSummary--notifications-container"]}>
        <div className={styles["statsSummary--notifications-inner-container"]}>
          <p className={styles["statsSummary--notifications-title"]}>
            Notifications
          </p>
          <div className={styles["statsSummary--lists-container"]}>
            <div className={styles["statsSummary--list"]}>
              <p className={styles["statsSummary--list-title"]}>
                Upcoming event/meeting
              </p>
              <p className={styles["statsSummary--list-desc"]}>
                Your webinar is about to get started very soon. Join the link
                from Webinar page
              </p>
            </div>
            <div className={styles["statsSummary--list"]}>
              <p className={styles["statsSummary--list-title"]}>
                Upcoming event/meeting
              </p>
              <p className={styles["statsSummary--list-desc"]}>
                Your webinar is about to get started very soon. Join the link
                from Webinar page
              </p>
            </div>{" "}
            <div className={styles["statsSummary--list"]}>
              <p className={styles["statsSummary--list-title"]}>
                Upcoming event/meeting
              </p>
              <p className={styles["statsSummary--list-desc"]}>
                Your webinar is about to get started very soon. Join the link
                from Webinar page
              </p>
            </div>{" "}
            <div className={styles["statsSummary--list"]}>
              <p className={styles["statsSummary--list-title"]}>
                Upcoming event/meeting
              </p>
              <p className={styles["statsSummary--list-desc"]}>
                Your webinar is about to get started very soon. Join the link
                from Webinar page
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["statsSummary--appointment-container"]}>
        <div className={styles["statsSummary--appointment-inner-container"]}>
          <p className={styles["statsSummary--appointment-title"]}>
            Clients Appointment
          </p>
          <div>
            <p className={styles["statsSummary--meeting-title"]}>
              Meeting Name
            </p>
            <p className={styles["statsSummary--appointment-desc-text"]}>
              Client Name: John Williams|Time:120 min
            </p>
          </div>
          <div>
            <ul className={styles["statsSummary--unordered-list"]}>
              <li className={styles["statsSummary--appointment-marker"]}>
                Web, Apr 3
              </li>
              <li className={styles["statsSummary--appointment-marker"]}>
                11 AM - 12:45
              </li>
            </ul>
            <button className={styles["statsSummary--appointment-button"]}>
              Join Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
