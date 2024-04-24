import React, { useContext, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import profileImage from "./images/sample-image.png";
import StatisticsChart from "./component/chart";
import { getLoggedInTime } from "../../Firebase/kpi";
import { AuthContext } from "../../context/authContext";
import { HashLoader } from "react-spinners";

export default function Statistics() {
  const currentUser = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [statData, setStatData] = useState({});

  useMemo(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, count } = await getLoggedInTime(
          currentUser?.uid,
          new Date("2021-01-01"),
          new Date()
        );
        setStatData((prev) => ({ ...prev, loginCount: count }));
        setLoading(false);
        console.log(data, count);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    fetchData();
  }, [currentUser]);
  console.log("StatData", statData);

  const generalStatData = [
    { stat: 11, title1: "Courses", title2: "Completed", bar: true },
    { stat: 22, title1: "Videos", title2: "Watched", bar: true },
    {
      stat: statData?.loginCount || "X",
      title1: "Login in",
      title2: "this week",
      bar: false,
    },
  ];

  const renderGeneralStat = generalStatData.map((stat) => {
    return (
      <div className={styles["statistics--general-progress-container"]}>
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
    );
  });
  const graphData = [
    {
      title: "Client Status",
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [10, 20, 15, 30, 18, 29, 40, 25, 30, 10, 11, 14],
    },
    {
      title: "Sales Status",
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      data: [20, 15, 30, 25, 30, 11, 14],
    },
  ];

  const renderGraph = graphData.map((graph) => {
    return (
      <div className={styles["statistics--graph-container"]}>
        <div className={styles["statistics--client-graph-stat-switch"]}>
          <p className={styles["statistics--graph-title"]}>{graph.title}</p>
          <div className={styles["statistics--time-switch-button-container"]}>
            <button className={styles["statistics--time-switch-button"]}>
              Weekly
            </button>
            <button className={styles["statistics--time-switch-button"]}>
              Total
            </button>
          </div>
        </div>

        <StatisticsChart labels={graph.labels} data={graph.data} />
      </div>
    );
  });

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HashLoader color={"#3064d4"} loading={loading} size={300} />
        </div>
      ) : (
        <div className={styles["statistics--main-container"]}>
          <div className={styles["statistics--general-container"]}>
            <div className={styles["statistics--general-inner-container"]}>
              {renderGeneralStat}
            </div>
            <div className={styles["statistics--profile-container"]}>
              <img
                src={profileImage}
                className={styles["statistics--profile-image"]}
              />
              <p className={styles["statistics--user-name"]}>Gurpreet singh</p>
            </div>
          </div>
          {/* <div className={styles["statistics--graph-container"]}>
        <div className={styles["statistics--client-graph-stat-switch"]}>
        <p className={styles["statistics--graph-title"]}>Client Status</p>
        <div className={styles["statistics--time-switch-button-container"]}>
        <button className={styles["statistics--time-switch-button"]}>
              Weekly
            </button>
            <button className={styles["statistics--time-switch-button"]}>
            Total
            </button>
            </div>
            </div>
            
            <StatisticsChart />
          </div> */}
          {renderGraph}
        </div>
      )}
    </>
  );
}
