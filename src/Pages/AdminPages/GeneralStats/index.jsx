import React from "react";
import styles from "./styles.module.scss";
import StatisticsChart from "./component/chart";

export default function StatisticsGeneral({
  generalStats,
  profileImageSrc,
  userName,
  graphData,
  handleYearlyData,
  handleWeeklyData,
  clientWeekGraphRef,
  clientYearGraphRef,
  salesWeekGraphRef,
  salesYearGraphRef,
}) {
  const renderGeneralStat = generalStats.map((stat, index) => (
    <div
      key={index}
      className={styles["statistics--general-progress-container"]}
    >
      <div className={styles["statistics--general-progress-inner-container"]}>
        <p className={styles["statistics--general-progress-number"]}>
          {stat.stat}
        </p>
        <div className={styles["statistics--general-stat-title-container"]}>
          <p className={styles["statistics--general-stat-title"]}>
            {stat.title1}
          </p>
          <p
            className={styles["statistics--general-stat-title"]}
            style={{ lineHeight: "40px" }}
          >
            {stat.title2}
          </p>
        </div>
      </div>
      {stat.bar && <hr className={styles["statistics--progress-bar"]} />}
    </div>
  ));

  const renderGraph = graphData.map((graph, index) => (
    <div key={index} className={styles["statistics--graph-container"]}>
      <div className={styles["statistics--client-graph-stat-switch"]}>
        <p className={styles["statistics--graph-title"]}>{graph.title}</p>
        <div className={styles["statistics--time-switch-button-container"]}>
          <button
            className={styles["statistics--time-switch-button"]}
            onClick={() => handleWeeklyData(graph.title)}
            style={{
              border: "1px solid #2D355C54",
            }}
            ref={
              graph.title === "Client Status"
                ? clientWeekGraphRef
                : salesWeekGraphRef
            }
          >
            Weekly
          </button>
          <button
            className={styles["statistics--time-switch-button"]}
            onClick={() => handleYearlyData(graph.title)}
            ref={
              graph.title === "Client Status"
                ? clientYearGraphRef
                : salesYearGraphRef
            }
          >
            Total
          </button>
        </div>
      </div>
      <StatisticsChart labels={graph.labels} data={graph.data} />
    </div>
  ));

  return (
    <div className={styles["statistics--main-container"]}>
      <div className={styles["statistics--general-container"]}>
        <div className={styles["statistics--general-inner-container"]}>
          {renderGeneralStat}
        </div>
        <div className={styles["statistics--profile-container"]}>
          <img
            src={profileImageSrc}
            className={styles["statistics--profile-image"]}
            alt="Profile"
          />
          <p className={styles["statistics--user-name"]}>{userName}</p>
        </div>
      </div>
      {renderGraph}
    </div>
  );
}
