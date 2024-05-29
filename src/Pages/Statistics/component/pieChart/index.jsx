import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
ChartJs.register(ArcElement, Tooltip, Legend);
import styles from "./styles.module.scss";

export default function PieChart() {
  const data = {
    labels: [
      "Client added",
      "Courses Completed",
      "Sales made",
      "Videos completed",
    ],
    datasets: [
      {
        data: [3, 2, 4, 2],
        backgroundColor: ["#00203C", "#F9C257", "#849BB1", "#E19500"],
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      style={{ spacing: "0px", borderWidth: 0 }}
      options={{ plugins: { legend: { display: false } } }}
      className={styles["pie-chart"]}
    />
  );
}
