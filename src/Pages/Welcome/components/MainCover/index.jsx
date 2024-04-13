import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PILogo from "/assets/logo.png";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJs.register(CategoryScale, LinearScale, BarElement);

export default function MainCover() {
  const [graphData, setGraphData] = useState([
    { name: "M", value: "10" },
    { name: "T", value: "5" },
    { name: "W", value: "15" },
    { name: "T", value: "9" },
    { name: "F", value: "6" },
    { name: "S", value: "20" },
    { name: "S", value: "10" },
  ]);
  const [dataChange, setDataChange] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      if (dataChange === 1) {
        setGraphData([
          { name: "M", value: "10" },
          { name: "T", value: "5" },
          { name: "W", value: "15" },
          { name: "T", value: "9" },
          { name: "F", value: "6" },
          { name: "S", value: "20" },
          { name: "S", value: "10" },
        ]);
        setDataChange(2);
      } else if (dataChange === 2) {
        setGraphData([
          { name: "M", value: "20" },
          { name: "T", value: "7" },
          { name: "W", value: "12" },
          { name: "T", value: "6" },
          { name: "F", value: "15" },
          { name: "S", value: "4" },
          { name: "S", value: "7" },
        ]);
        setDataChange(3);
      } else if (dataChange === 3) {
        setGraphData([
          { name: "M", value: "5" },
          { name: "T", value: "17" },
          { name: "W", value: "15" },
          { name: "T", value: "10" },
          { name: "F", value: "20" },
          { name: "S", value: "15" },
          { name: "S", value: "17" },
        ]);
        setDataChange(1);
      }
    }, 1700);
    return () => clearInterval(interval);
  }, graphData);
  return (
    <div className={styles["wcover--main-container"]}>
      <div className={styles["wcover--graph-heading-container"]}>
        <div className={styles["wcover--logo-graph-container"]}>
          <img src={PILogo} className={styles["wcover--logo"]} />
          <div>
            <p className={styles["wcover--heading-text"]}>
              Say goodbye to scattered materials and regulatory headaches
            </p>
            <div className={styles["wcover--button-container"]}>
              <button className={styles["wcover--signup-button"]}>
                Sign Up
              </button>
              <button className={styles["wcover--login-button"]}>Log In</button>
            </div>
          </div>
          <div className={styles["wcover--graph-container"]}>
            Weekly Sales
            <Bar
              height={200}
              width={400}
              data={{
                labels: graphData.map((data) => data.name),
                datasets: [
                  {
                    data: graphData.map((data) => data.value),
                    backgroundColor: [
                      "rgba(18, 60, 151, 1)",
                      "rgba(48, 100, 212, 1)",
                    ],
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
            />
          </div>
        </div>
        <div className={styles["wcover--image-desc-container"]}>
          <div className={styles["wcover--cover-image"]}></div>
          <p className={styles["wcover--desc-text"]}>
            Our platform streamlines access to training modules,tracks progress
            with precision, and ensures compliance effortlessly. By
            consolidating resources and simplifying processes, we empower
            brokers to excel in their roles, driving success in selling life
            insurance products while staying ahead of industry standards.
            Elevate your brokerage experience with us, and let's navigate the
            path to success together.
          </p>
        </div>
      </div>
    </div>
  );
}
