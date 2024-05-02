import React, { useContext, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import arrowUp from "./images/arrow-up.png";
import arrowDown from "./images/arrow-down.png";
import playIcon from "./images/play-icon.png";

import { AuthContext } from "../../../../context/authContext";
import { storeVideoProgress } from "../../../../Firebase/kpi";

import { useLocation, useNavigate } from "react-router-dom";
import { getSectionsForCourse } from "../../../../Firebase/courseLogic";
import secureLocalStorage from "react-secure-storage";

export default function CourseDetail() {
  const selectedCourseData = useLocation().state.course;
  // console.log("Course data", selectedCourseData);

  const [currentCourse, setCurrentCourse] = useState({});

  // use memo to fetch the course data from the context
  useMemo(() => {
    setCurrentCourse(selectedCourseData);

    if (!sessionStorage.getItem(`${selectedCourseData?.id}`)) {
      getSectionsForCourse(selectedCourseData?.id).then((sections) => {
        sessionStorage.setItem(
          `${selectedCourseData?.id}`,
          JSON.stringify({ sections })
        );
        setCurrentCourse({ ...selectedCourseData, sections });
      });
    } else {
      const { sections } = JSON.parse(
        sessionStorage.getItem(`${selectedCourseData?.id}`)
      );
      console.log("Sections ", sections);
      setCurrentCourse({ ...selectedCourseData, sections });
    }
  }, [selectedCourseData]);

  const currentUser = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState({
    id: "SampleVideoID2",
    src: "https://firebasestorage.googleapis.com/v0/b/trainingportalpi.appspot.com/o/courseVideos%2FGolden%20rule%20in%20Finance%2Bf7432a38-0ecf-4ef8-b596-ee6601acb0f7%2B3b87f1cf-07ee-4b6b-b6e4-6bed77ffc025%2B1712954519526?alt=media&token=546c8c16-cf46-455b-8731-e7e8781bf45e",
  });
  const [dropdown, setDropdown] = useState([-1]);
  const handleDropdown = (index) => {
    if (dropdown.includes(index)) {
      const newDropdown = dropdown.filter((item) => item !== index);
      setDropdown(newDropdown);
      console.log("Removed:", index);
      return;
    }
    setDropdown((prev) => [...prev, index]); // Update using spread syntax to avoid mutating the state directly
    console.log(dropdown);
  };

  const handleCurrentVideoWatched = async () => {
    console.log("Video watched");
    // Mark the video as watched
    const videoID = currentVideo?.id;
    const courseID = currentCourse?.id;
    const storeVideoProgressResponse = await storeVideoProgress(
      currentUser?.uid,
      courseID,
      videoID
    );
    console.log(
      storeVideoProgressResponse,
      currentUser?.uid,
      courseID,
      videoID
    );
  };

  const renderSections = currentCourse?.sections_rank?.map((section, index) => {
    return (
      <div
        className={styles["courseDetail--section-dropdown"]}
        onClick={() => handleDropdown(index)}
        key={index}
      >
        <div className={styles["courseDetail--section-name-container"]}>
          <p className={styles["courseDetail--section-title"]}>
            {currentCourse?.sections?.[section]?.title}
          </p>
          <img
            src={dropdown.includes(index) ? arrowUp : arrowDown}
            className={styles["courseDetail--arrow-icon"]}
          />
        </div>
        <div
          className={styles["courseDetail--video-list-container"]}
          style={{
            transition: "opacity 0.5s ease-in-out, height 0.5s ease-in-out",
            opacity: dropdown.includes(index) ? 1 : 0,
            height: dropdown.includes(index) ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          {currentCourse?.sections?.[section]?.video_rank?.map(
            (video, index) => (
              <div className={styles["courseDetail--video-list"]}>
                <div
                  key={index}
                  className={styles["courseDetail--video-icon-name-container"]}
                >
                  <img
                    src={playIcon}
                    className={styles["courseDetail--play-icon"]}
                    alt="Play Icon"
                  />
                  <div>{video.split("+")[0]}</div>
                </div>
                <p className={styles["courseDetail--video-time"]}>30 min</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  });
  const navigate = useNavigate();
  return (
    <div className={styles["courseDetail--main-container"]}>
      <p
        className={styles["courseDetail--go-back"]}
        onClick={() => navigate("/courses")}
      >
        {"<"}Go Back
      </p>
      <p className={styles["courseDetail--course-title"]}>
        {currentCourse?.title}
      </p>
      <div className={styles["courseDetail--inner-container"]}>
        <div className={styles["courseDetail--video-desc-container"]}>
          <div className={styles["courseDetail--video-container"]}>
            <video
              className={styles["courseDetail--course-video"]}
              controls
              onEnded={handleCurrentVideoWatched}
            >
              <source src={currentVideo.src} />
            </video>
          </div>
          <div className={styles["courseDetail--course-desc-container"]}>
            <p className={styles["courseDetail--course-desc-title"]}>
              Course Description
            </p>
            <p className={styles["courseDetail--course-desc-text"]}>
              {currentCourse?.description}
            </p>
          </div>
        </div>
        <div className={styles["courseDetail--section-feedback-container"]}>
          <div className={styles["courseDetail--section-list-container"]}>
            <p className={styles["courseDetail--course-videos-title"]}>
              Course Videos
            </p>
            {renderSections}
          </div>
          <div className={styles["courseDetail--feedback-container"]}>
            <p className={styles["courseDetail--feedback-title"]}>
              Leave a feedback
            </p>
            <textarea
              className={styles["courseDetail--feedback-input"]}
              placeholder="Describe what you liked or disliked?.."
            />
            <button className={styles["courseDetail--submit-button"]}>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
