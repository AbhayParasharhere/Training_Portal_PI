import React, { useContext, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import profileImage from "./images/sample-image.png";
import StatisticsChart from "./component/chart";
import { getVideosWatched } from "../../Firebase/kpi";
import { AuthContext } from "../../context/authContext";
import secureLocalStorage from "react-secure-storage";
import Spinner from "../../CommonComponents/Spinner";
import {
  PrimaryDataContext,
  RealTimeDataContext,
} from "../../context/primaryDataContext";

export default function Statistics() {
  const currentUser = useContext(AuthContext);
  const primaryData = useContext(PrimaryDataContext);
  const realTimeData = useContext(RealTimeDataContext);
  const clients = realTimeData?.clients;
  const sales = realTimeData?.sales;
  console.log("This is the sales data: ", sales);
  const courses = primaryData?.courses;
  const [loading, setLoading] = useState(true);
  let videoWatched = [];
  if (
    sessionStorage.getItem("video_progress") &&
    sessionStorage.getItem("video_progress") !== "undefined"
  ) {
    videoWatched = JSON.parse(sessionStorage.getItem("video_progress"));
  }
  const [clientGraphTime, setClientGraphTime] = useState("week");
  const [salesGraphTime, setSalesGraphTime] = useState("week");
  const [statData, setStatData] = useState({});
  const clientWeekGraphRef = useRef();
  const salesWeekGraphRef = useRef();
  const clientYearGraphRef = useRef();
  const salesYearGraphRef = useRef();

  const uniqueVideos = new Set();

  // Iterate through the videoWatched array and add each video ID to the Set
  videoWatched.forEach((video) => {
    uniqueVideos.add(video.videoID);
  });

  // Get the size of the Set, which represents the number of unique videos watched
  const numberOfUniqueVideosWatched = uniqueVideos.size;

  console.log(
    "Number of unique videos watched: ",
    uniqueVideos,
    numberOfUniqueVideosWatched
  );

  // Initialize an object to store unique videos watched for each course
  const uniqueVideosByCourse = {};

  // Iterate through the videoWatched array
  videoWatched.forEach((video) => {
    const courseId = video.courseId;
    const videoId = video.videoID;

    // Check if the course exists in the object, if not, initialize it with an empty Set
    if (!uniqueVideosByCourse[courseId]) {
      uniqueVideosByCourse[courseId] = new Set();
    }

    // Add the videoID to the Set of unique videos for the course
    uniqueVideosByCourse[courseId].add(videoId);
  });

  // Calculate the number of unique videos watched for each course
  const numberOfUniqueVideosByCourse = {};

  for (const courseId in uniqueVideosByCourse) {
    numberOfUniqueVideosByCourse[courseId] =
      uniqueVideosByCourse[courseId].size;
  }
  let courseCompleted = 0;
  if (courses) {
    console.log("All courses");
    courses.map((course) => {
      if (course.videos_array) {
        console.log(
          "course: ",
          course.id,
          "course name",
          course.title,
          "videos: ",
          course.videos_array.length
        );
        if (
          course?.videos_array?.length ===
          numberOfUniqueVideosByCourse?.[course.id]
        ) {
          courseCompleted++;
        }
      }
    });
  }
  console.log(
    "Number of courses completed: ",
    courseCompleted,
    numberOfUniqueVideosByCourse
  );

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

  const getWeeklyAddedClientsSales = (clients) => {
    if (!clients) return console.log("No clients");
    const weeklyClients = [0, 0, 0, 0, 0, 0, 0]; // Initialize with 7 days
    const mondayDate = getMondayDate();
    // console.log("Monday date: ", mondayDate);
    const upcomingSundayDate = new Date(mondayDate);
    upcomingSundayDate.setDate(mondayDate.getDate() + 6);
    // console.log("Upcoming sunday date: ", upcomingSundayDate);
    clients
      .filter((client) => {
        console.log("sales Dates: ", new Date(client?.created_at.toDate()));
        console.log(
          "Comparison: Monday date comparison",
          "Sales Date: ",
          new Date(client?.created_at.toDate()),
          "Monday Date: ",
          mondayDate,
          new Date(client?.created_at.toDate()).getDate() >=
            mondayDate.getDate()
        );
        return (
          new Date(client?.created_at.toDate()).getDate() >=
            mondayDate.getDate() &&
          new Date(client?.created_at.toDate()).getDate() <=
            upcomingSundayDate.getDate()
        );
      })
      .map((client) => {
        const clientCreatedDate = client?.created_at?.toDate().getDay();
        console.log("Sales created date: ", clientCreatedDate);

        weeklyClients[clientCreatedDate] += 1;
      });
    return weeklyClients;
  };

  const getYearlyClientSalesData = (statData) => {
    if (!statData) return;
    const currentDate = new Date();
    const yearlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const currentYearStat = statData?.filter(
      (statDate) =>
        statDate?.created_at?.toDate().getFullYear() ===
        currentDate.getFullYear()
    );
    currentYearStat.map((data, index) => {
      const dataCreatedYear = data?.created_at?.toDate().getMonth();
      yearlyData[dataCreatedYear] += 1;
    });
    return yearlyData;
  };
  let weekClientData = [];
  let yearClientData = [];
  let weekSalesData = [];
  let yearSalesData = [];
  if (clients) {
    weekClientData = getWeeklyAddedClientsSales(clients);
    yearClientData = getYearlyClientSalesData(clients);
  }
  if (sales) {
    weekSalesData = getWeeklyAddedClientsSales(sales);
    yearSalesData = getYearlyClientSalesData(sales);
    console.log("Weekly: ", weekSalesData);
  }
  // useMemo(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const currentDate = new Date();
  //       const previousDate = new Date();
  //       previousDate.setDate(currentDate.getDate() - 7);

  //       // Get total videos watched by the user
  //       const videoData = await getVideosWatched(
  //         currentUser?.uid,
  //         previousDate,
  //         currentDate
  //       );

  //       setStatData((prev) => ({
  //         ...prev,
  //         videoCount: videoData?.count,
  //       }));
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [currentUser]);

  const generalStatData = [
    {
      stat: courseCompleted,
      title1: "Courses",
      title2: "Completed",
      bar: true,
    },
    {
      stat: numberOfUniqueVideosWatched || "X",
      title1: "Videos",
      title2: "Watched",
      bar: true,
    },
    {
      stat: "0",
      title1: "Posts",
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
          ? ["S", "M", "T", "W", "T", "F", "S"]
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
      data: clientGraphTime === "week" ? weekClientData : yearClientData,
    },
    {
      title: "Sales Status",
      labels:
        salesGraphTime === "week"
          ? ["S", "M", "T", "W", "T", "F", "S"]
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
      data: salesGraphTime === "week" ? weekSalesData : yearSalesData,
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
              src={
                secureLocalStorage.getItem("userDetails")?.[1] || profileImage
              }
              className={styles["statistics--profile-image"]}
            />
            <p className={styles["statistics--user-name"]}>
              {" "}
              {secureLocalStorage.getItem("userDetails")?.[0] || "Broker"}
            </p>
          </div>
        </div>
        {renderGraph}
      </div>
    </>
  );
}
