import React, { useState } from "react";
import styles from "./styles.module.scss";
import arrowUp from "./images/arrow-up.png";
import arrowDown from "./images/arrow-down.png";
import playIcon from "./images/play-icon.png";
import { useNavigate } from "react-router-dom";

export default function CourseDetail() {
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

  const courseData = [
    { section1: ["S1v1", "S1v2", "S1v3"] },
    { section2: ["S2V1", "S2V2", "S2V3"] },
  ];
  const renderSections = courseData.map((section, index) => {
    return (
      <div
        className={styles["courseDetail--section-dropdown"]}
        onClick={() => handleDropdown(index)}
      >
        <div className={styles["courseDetail--section-name-container"]}>
          <p className={styles["courseDetail--section-title"]}>Section Name</p>
          <img
            src={dropdown.includes(index) ? arrowUp : arrowDown}
            className={styles["courseDetail--arrow-icon"]}
          />
        </div>
        <div
          className={styles["courseDetail--video-list-container"]}
          style={{ display: dropdown.includes(index) ? "flex" : "none" }}
        >
          <div className={styles["courseDetail--video-list"]}>
            <div className={styles["courseDetail--video-icon-name-container"]}>
              <img
                src={playIcon}
                className={styles["courseDetail--play-icon"]}
              />
              Video Name
            </div>
            <p className={styles["courseDetail--video-time"]}>30 min</p>
          </div>
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
      <p className={styles["courseDetail--course-title"]}>Course Title</p>
      <div className={styles["courseDetail--inner-container"]}>
        <div className={styles["courseDetail--video-desc-container"]}>
          <div className={styles["courseDetail--video-container"]}>
            <video className={styles["courseDetail--course-video"]} controls>
              <source
                src={
                  "https://firebasestorage.googleapis.com/v0/b/trainingportalpi.appspot.com/o/courseVideos%2FGolden%20rule%20in%20Finance%2Bf7432a38-0ecf-4ef8-b596-ee6601acb0f7%2B3b87f1cf-07ee-4b6b-b6e4-6bed77ffc025%2B1712954519526?alt=media&token=546c8c16-cf46-455b-8731-e7e8781bf45e"
                }
              />
            </video>
          </div>
          <div className={styles["courseDetail--course-desc-container"]}>
            <p className={styles["courseDetail--course-desc-title"]}>
              Course Description
            </p>
            <p className={styles["courseDetail--course-desc-text"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className={styles["courseDetail--section-feedback-container"]}>
          <div className={styles["courseDetail--section-list-container"]}>
            <p className={styles["courseDetail--course-videos-title"]}>
              Course Videos
            </p>
            {renderSections}
            {/* <div
              className={styles["courseDetail--section-dropdown"]}
              onClick={handleDropdown}
            >
              <div className={styles["courseDetail--section-name-container"]}>
                <p className={styles["courseDetail--section-title"]}>
                  Section Name
                </p>
                <img
                  src={dropdown ? arrowUp : arrowDown}
                  className={styles["courseDetail--arrow-icon"]}
                />
              </div>
              <div
                className={styles["courseDetail--video-list-container"]}
                style={{ display: dropdown ? "flex" : "none" }}
              >
                <div className={styles["courseDetail--video-list"]}>
                  <div
                    className={
                      styles["courseDetail--video-icon-name-container"]
                    }
                  >
                    <img
                      src={playIcon}
                      className={styles["courseDetail--play-icon"]}
                    />
                    Video Name
                  </div>
                  <p>30 min</p>
                </div>
              </div>
            </div> */}
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
