import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import arrowUp from "./images/arrow-up.png";
import arrowDown from "./images/arrow-down.png";
import playIcon from "./images/play-icon.png";

import { AuthContext } from "../../../../context/authContext";
import { storeVideoProgress } from "../../../../Firebase/kpi";

import { useLocation, useNavigate } from "react-router-dom";
import {
  addFeedback,
  getSectionsForCourse,
} from "../../../../Firebase/courseLogic";
import secureLocalStorage from "react-secure-storage";

export default function CourseDetail() {
  const [feedback, setFeedback] = useState("");
  console.log("This is the feedback: ", feedback);
  const selectedCourseData = useLocation().state.course;

  const [currentCourse, setCurrentCourse] = useState({});
  // use memo to fetch the course data from the context
  const [currentVideo, setCurrentVideo] = useState({ src: "", id: "" });

  console.log(
    "Session Storage",
    JSON.parse(sessionStorage.getItem("video_progress"))
  );
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("video_progress"))) {
      const lastVideoData = JSON.parse(
        sessionStorage?.getItem("video_progress")
      )?.filter((video) => video.courseId === selectedCourseData?.id);
      let lastVideo = [];
      if (lastVideoData) {
        console.log("Coming here");
        lastVideo = lastVideoData.reduce(
          (prev, current) =>
            prev?.created_at > current?.created_at ? prev : current,
          {}
        );
      }
      console.log("Video Progress", lastVideo);
      const lastVideoSrc = selectedCourseData?.videos_array?.find(
        (video) => video.videoID === lastVideo?.videoID
      )?.videoURL;
      if (lastVideo) {
        setCurrentVideo({
          src: lastVideoSrc,
          id: lastVideo?.videoID,
        });
        console.log("initial video set done");
      }
    }
  }, [selectedCourseData]);
  useMemo(() => {
    // Set the current video to the last watched video if it exists

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
  const [dropdown, setDropdown] = useState([-1]);

  const submitFeedback = () => {
    addFeedback(feedback, currentUser?.uid, selectedCourseData?.id);
  };
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
  const handleVideoChange = (videoID) => {
    const video = currentCourse?.videos_array?.find(
      (video) => video.videoID === videoID
    );
    console.log("Video changed", video, videoID);
    setCurrentVideo({ id: video?.videoID, src: video?.videoURL });
  };
  console.log("Current video", currentVideo);
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
            (video, index) => {
              const videoName = video.split("+")[0];
              const videoID = video;
              return (
                <div
                  className={styles["courseDetail--video-list"]}
                  onClick={() => handleVideoChange(videoID)}
                >
                  <div
                    key={index}
                    className={
                      styles["courseDetail--video-icon-name-container"]
                    }
                  >
                    <img
                      src={playIcon}
                      className={styles["courseDetail--play-icon"]}
                      alt="Play Icon"
                    />
                    <div>{videoName}</div>
                  </div>
                  <p className={styles["courseDetail--video-time"]}>30 min</p>
                </div>
              );
            }
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
        onClick={() => navigate(-1)}
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
              key={currentVideo?.src}
              className={styles["courseDetail--course-video"]}
              controls
              onEnded={handleCurrentVideoWatched}
            >
              <source src={currentVideo?.src} />
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
              onChange={(event) => setFeedback(event.target.value)}
            />
            <button
              className={styles["courseDetail--submit-button"]}
              onClick={submitFeedback}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
