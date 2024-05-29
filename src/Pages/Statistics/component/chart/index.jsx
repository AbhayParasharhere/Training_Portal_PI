import React from "react";
import styles from "./styles.module.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJs.register(CategoryScale, LinearScale, BarElement);

export default function StatisticsChart(props) {
  return (
    <Bar
      className={styles["stats-canvas"]}
      //   style={{ height: 600, width: "100%" }}
      data={{
        labels: props.labels.map((label) => label),
        datasets: [
          {
            data: props.data.map((label) => label),
            backgroundColor: ["rgba(0, 32, 60, 1)", "rgba(225, 149, 0, 1)"],
            borderRadius: 3,
            maxBarThickness: 45,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: { legend: { display: false } },
      }}
    />
  );
}
