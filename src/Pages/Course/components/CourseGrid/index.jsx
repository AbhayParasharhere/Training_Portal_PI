import React from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import filterIcon from "./images/filter-icon.png";
import coursePlaceholder from "./images/course-placeholder.png";
import { useNavigate } from "react-router-dom";

export default function CourseGrid() {
  const courseData = [
    {
      placeholder: coursePlaceholder,
      catagory: "Finance and ",
      title: "The basics of finanace and insurance",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
    {
      placeholder: coursePlaceholder,
      catagory: "Finance",
      title: "The basics of finanace",
    },
  ];
  const navigate = useNavigate();
  const renderCourse = courseData.map((course, index) => {
    return (
      <div
        className={styles["courseGrid--course-container"]}
        key={index}
        onClick={() => navigate(`/courses/${index}`)}
      >
        <div
          className={styles["courseGrid--course-placeholder"]}
          style={{ backgroundImage: `url(${course.placeholder})` }}
        ></div>
        <div className={styles["courseGrid--course-catagory"]}>
          {course.catagory}
        </div>
        <p className={styles["courseGrid--course-title"]}>{course.title}</p>
      </div>
    );
  });
  return (
    <div className={styles["courseGrid--main-container"]}>
      <div className={styles["courseGrid--title-container"]}>
        Take charge of your growth and development by enrolling in our
        specialized courses available on the Learning Hub of the Extranet.
      </div>
      <div className={styles["courseGrid--search-filter-container"]}>
        <input
          className={styles["courseGrid--search-input"]}
          placeholder="Search courses here"
        />
        <img className={styles["courseGrid--search-icon"]} src={searchIcon} />
        <button className={styles["courseGrid--filter-button"]}>
          <img src={filterIcon} className={styles["courseGrid--filter-icon"]} />
          View courses by filter
        </button>
      </div>
      <div className={styles["courseGrid--grid-container"]}>{renderCourse}</div>
    </div>
  );
}
