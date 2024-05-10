import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import {
  getAllUsers,
  getTotalClientData,
  getTotalSales,
  getTotalVideosWatched,
} from "../../../Firebase/getOtherStats";
import searchIcon from "./images/search-icon.png";
import sampleUserPhoto from "./images/profile-photo.png";
import { useOutletContext } from "react-router-dom";
import StatisticsGeneral from "../GeneralStats";
import {
  getMondayDate,
  getWeeklyAddedClientsSales,
  getYearlyClientSalesData,
} from "../../Statistics";
import { getLastWeekPostRealTime } from "../../../Firebase/postDoubtsLogic";
import { PrimaryDataContext } from "../../../context/primaryDataContext";
import { toast } from "react-toastify";

export default function PeopleStats() {
  const getAllUsers = useOutletContext()?.getUsers;
  const initialAllUsers = useOutletContext()?.users;
  const [totalVideos, setTotalVideos] = useState(0);
  const [lastWeekUserPost, setLastWeekUserPost] = useState([]);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const mondayDate = getMondayDate();
  const primaryData = useContext(PrimaryDataContext);
  const courses = primaryData?.courses;
  const [weeklyClientData, setWeeklyClientData] = useState([]);
  const [weeklySalesData, setWeeklySalesData] = useState([]);

  const [yearlyClientData, setYearlyClientData] = useState([]);
  const [yearlySalesData, setYearlySalesData] = useState([]);

  const [clientGraphTime, setClientGraphTime] = useState("week");
  const [salesGraphTime, setSalesGraphTime] = useState("week");

  const [userName, setUserName] = useState("Name");
  const [userId, setUserId] = useState("");

  const clientWeekGraphRef = useRef();
  const salesWeekGraphRef = useRef();
  const clientYearGraphRef = useRef();
  const salesYearGraphRef = useRef();

  const uniqueVideosByCourse = {};
  const numberOfUniqueVideosByCourse = {};

  const handleWeeklyData = (graph) => {
    if (graph === "Client Status") {
      setClientGraphTime("week");
      if (clientWeekGraphRef.current && clientYearGraphRef.current) {
        clientWeekGraphRef.current.style.border = "1px solid #2D355C54";
        clientYearGraphRef.current.style.border = "none";
      }
    } else if (graph === "Sales Status") {
      setSalesGraphTime("week");
      if (salesWeekGraphRef.current && salesYearGraphRef) {
        salesWeekGraphRef.current.style.border = "1px solid #2D355C54";
        salesYearGraphRef.current.style.border = "none";
      }
    }
  };
  const handleYearlyData = (graph) => {
    if (graph === "Client Status") {
      setClientGraphTime("year");
      if (clientWeekGraphRef.current && clientYearGraphRef.current) {
        clientWeekGraphRef.current.style.border = "none";
        clientYearGraphRef.current.style.border = "1px solid #2D355C54";
      }
    } else if (graph === "Sales Status") {
      setSalesGraphTime("year");
      if (salesWeekGraphRef.current && salesYearGraphRef) {
        salesWeekGraphRef.current.style.border = "none";
        salesYearGraphRef.current.style.border = "1px solid #2D355C54";
      }
    }
  };

  const handlePersonStat = async (id, name) => {
    //Total video watched logic
    setUserName(name);
    if (id === userId) {
      toast.error("Already viewing the stats of this person");
      return;
    }
    setUserId(id);
    const totalVideosWatched = await getTotalVideosWatched(id);
    const uniqueVideos = new Set();
    totalVideosWatched?.forEach((video) => uniqueVideos?.add(video.videoID));
    setTotalVideos(uniqueVideos?.size);

    //Total posts
    await getLastWeekPostRealTime(setLastWeekUserPost, id, mondayDate);

    //Total courses completed
    totalVideosWatched.forEach((video) => {
      const courseId = video.courseId;
      const videoId = video.videoID;

      // Check if the course exists in the object, if not, initialize it with an empty Set
      if (!uniqueVideosByCourse[courseId]) {
        uniqueVideosByCourse[courseId] = new Set();
      }

      // Add the videoID to the Set of unique videos for the course
      uniqueVideosByCourse[courseId].add(videoId);
    });
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
    setCoursesCompleted(courseCompleted);
    console.log("Number of courseds completed: ", courseCompleted);

    //Weekly sales clients logic

    const userClients = await getTotalClientData(id);
    const weeklyClients = getWeeklyAddedClientsSales(userClients);
    setWeeklyClientData(weeklyClients);

    //Weekly sales
    const userSales = await getTotalSales(id);
    const weeklySales = getWeeklyAddedClientsSales(userSales);
    setWeeklySalesData(weeklySales);

    //Yearly client
    const yearlyClient = getYearlyClientSalesData(userClients);
    setYearlyClientData(yearlyClient);

    //Yearly Sales
    const yearlySalesData = getYearlyClientSalesData(userSales);
    setYearlySalesData(yearlySalesData);

    setSearch("");
  };

  const generalStatData = [
    {
      stat: coursesCompleted || "0",
      title1: "Courses",
      title2: "Completed",
      bar: true,
    },
    {
      stat: totalVideos || "0",
      title1: "Videos",
      title2: "Watched",
      bar: true,
    },
    {
      stat: lastWeekUserPost?.length || "0",
      title1: "Posts",
      title2: "this week",
      bar: false,
    },
  ];
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
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],

      data: clientGraphTime === "week" ? weeklyClientData : yearlyClientData,
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
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
      data: salesGraphTime === "week" ? weeklySalesData : yearlySalesData,
    },
  ];
  const [allUsers, setAllUsers] = useState(initialAllUsers);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!allUsers) {
      getAllUsers();
    }
  }, [allUsers]);
  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") return setAllUsers([]);
    const filteredUser = initialAllUsers?.filter((user) => {
      return user?.name?.toLowerCase().includes(value?.toLowerCase());
    });
    setAllUsers(filteredUser);
  };

  return (
    <div className={styles["adminStats--main-container"]}>
      <div className={styles["adminStats--input-container"]}>
        <input
          className={styles["adminStats--input"]}
          placeholder="Search broker name"
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <img src={searchIcon} className={styles["adminStats--search-icon"]} />
        <div
          className={styles["adminStats--search-user-container"]}
          style={{ display: search === "" ? "none" : "" }}
        >
          {allUsers?.map((user) => {
            return (
              <div
                className={styles["adminStats--user-details"]}
                onClick={() => handlePersonStat(user?.id, user?.name)}
              >
                <img
                  src={sampleUserPhoto}
                  className={styles["adminStats--profile-image"]}
                />
                {user?.name}
              </div>
            );
          })}
        </div>
      </div>
      <StatisticsGeneral
        generalStats={generalStatData}
        profileImageSrc={sampleUserPhoto}
        userName={userName}
        graphData={graphData}
        handleYearlyData={handleYearlyData}
        handleWeeklyData={handleWeeklyData}
        clientWeekGraphRef={clientWeekGraphRef}
        clientYearGraphRef={clientYearGraphRef}
        salesWeekGraphRef={salesWeekGraphRef}
        salesYearGraphRef={salesYearGraphRef}
      />
    </div>
  );
}
