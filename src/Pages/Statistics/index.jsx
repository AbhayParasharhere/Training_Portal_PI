import React, { useContext, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import profileImage from "./images/sample-image.png";
import StatisticsChart from "./component/chart";
import { getLoggedInTime, getVideosWatched } from "../../Firebase/kpi";
import { AuthContext } from "../../context/authContext";
import Spinner from "../../CommonComponents/Spinner";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { get } from "firebase/database";

export default function Statistics() {
  const currentUser = useContext(AuthContext);
  const primaryData = useContext(PrimaryDataContext);
  const clients = primaryData?.clients;
  console.log("This is the client data: ", clients);
  const [loading, setLoading] = useState(true);
  const [clientGraphTime, setClientGraphTime] = useState("week");
  const [salesGraphTime, setSalesGraphTime] = useState("week");
  const [statData, setStatData] = useState({});
  const clientWeekGraphRef = useRef();
  const salesWeekGraphRef = useRef();
  const clientYearGraphRef = useRef();
  const salesYearGraphRef = useRef();

  function getMondayDate() {
    // Create a new date object for today
    const today = new Date();

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = today.getDay();

    // Calculate the difference in days from today to the most recent Monday
    let daysToMonday = (currentDayOfWeek + 6) % 7;

    // Adjust the date by subtracting the calculated number of days
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - daysToMonday);

    // Return the date object for Monday
    return mondayDate;
  }

  const getWeeklyAddedClients = () => {
    if (!clients) return console.log("No clients");
    const weeklyClients = [0, 0, 0, 0, 0, 0, 0]; // Initialize with 7 days
    const mondayDate = getMondayDate();
    const upcomingSundayDate = new Date(mondayDate);
    upcomingSundayDate.setDate(mondayDate.getDate() + 7);
    clients
      .filter((client) => {
        if (client?.created_at) {
          const upcomingSundayDate = new Date(mondayDate);
          upcomingSundayDate.setDate(mondayDate.getDate() + 7);
          console.log(
            "Client",
            client,
            "Client name",
            client?.name,
            "Client created Date",
            client?.created_at?.toDate(),
            "After Monday Date",
            client?.created_at.toDate() >= mondayDate,
            "Before Upcoming Sunday Date",
            client?.created_at.toDate() <= upcomingSundayDate,
            "Monday Date",
            mondayDate
          );
        }
        return (
          client?.created_at?.toDate() >= mondayDate &&
          client?.created_at?.toDate() <= upcomingSundayDate
        );
      })
      .map((client) => {
        const clientCreatedDate = client?.created_at?.toDate().getDay();
        weeklyClients[clientCreatedDate] += 1;

        console.log("Client filtered", client);
      });
    console.log("Weekly Clients", weeklyClients, mondayDate);
    return weeklyClients;
  };
  let weekData = [];

  // if (clientWeekGraphRef.current !== undefined) {
  //   console.log("This is the clien week ref", clientWeekGraphRef);
  //   if (clientGraphTime === "week") {
  //     clientWeekGraphRef.current.style.border = "1px solid #2D355C54";
  //   } else {
  //     clientWeekGraphRef.current.style.border = "none";
  //   }
  // }
  if (clients) {
    weekData = getWeeklyAddedClients();
  }
  useMemo(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const currentDate = new Date();
        const previousDate = new Date();
        previousDate.setDate(currentDate.getDate() - 7);
        const { data, count } = await getLoggedInTime(
          currentUser?.uid,
          previousDate,
          currentDate
        );

        // Get total videos watched by the user
        const videoData = await getVideosWatched(
          currentUser?.uid,
          previousDate,
          currentDate
        );

        setStatData((prev) => ({
          ...prev,
          loginCount: count,
          videoCount: videoData?.count,
        }));
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
    { stat: 0, title1: "Courses", title2: "Completed", bar: true },
    {
      stat: statData?.videoCount || "X",
      title1: "Videos",
      title2: "Watched",
      bar: true,
    },
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
      labels:
        clientGraphTime === "week"
          ? ["M", "T", "W", "T", "F", "S", "S"]
          : [
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
      data: [10, 20, 15, 30, 18, 29, 40, 25, 30, 14],
    },
    {
      title: "Sales Status",
      labels:
        salesGraphTime === "week"
          ? ["M", "T", "W", "T", "F", "S", "S"]
          : [
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
      data: [20, 15, 30, 25, 30, 11, 14],
    },
  ];
  // graph.title === "Client Status"
  //                 ? setClientGraphTime("week")
  //                 : setSalesGraphTime("week")

  const handleWeeklyData = (graph) => {
    if (graph === "Client") {
      setClientGraphTime("week");
      if (clientWeekGraphRef.current && clientYearGraphRef.current) {
        clientWeekGraphRef.current.style.border = "1px solid #2D355C54";
        clientYearGraphRef.current.style.border = "none";
      }
    } else if (graph === "Sales") {
      setSalesGraphTime("week");
      if (salesWeekGraphRef.current && salesYearGraphRef) {
        salesWeekGraphRef.current.style.border = "1px solid #2D355C54";
        salesYearGraphRef.current.style.border = "none";
      }
    }
  };

  const handleYearlyData = (graph) => {
    if (graph === "Client") {
      setClientGraphTime("year");
      if (clientWeekGraphRef.current && clientYearGraphRef.current) {
        clientWeekGraphRef.current.style.border = "none";
        clientYearGraphRef.current.style.border = "1px solid #2D355C54";
      }
    } else if (graph === "Sales") {
      setSalesGraphTime("year");
      if (salesWeekGraphRef.current && salesYearGraphRef) {
        salesWeekGraphRef.current.style.border = "none";
        salesYearGraphRef.current.style.border = "1px solid #2D355C54";
      }
    }
  };
  const renderGraph = graphData.map((graph, index) => {
    return (
      <div className={styles["statistics--graph-container"]}>
        <div className={styles["statistics--client-graph-stat-switch"]}>
          <p className={styles["statistics--graph-title"]}>{graph.title}</p>
          <div className={styles["statistics--time-switch-button-container"]}>
            <button
              className={styles["statistics--time-switch-button"]}
              onClick={() =>
                handleWeeklyData(
                  graph.title === "Client Status" ? "Client" : "Sales"
                )
              }
              style={{ border: "1px solid #2D355C54" }}
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
              onClick={() =>
                handleYearlyData(
                  graph.title === "Client Status" ? "Client" : "Sales"
                )
              }
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
    );
  });

  return (
    <>
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
        {renderGraph}
      </div>
    </>
  );
}
