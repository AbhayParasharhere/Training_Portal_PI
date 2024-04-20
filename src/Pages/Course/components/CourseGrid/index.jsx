import React from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import filterIcon from "./images/filter-icon.png";
import coursePlaceholder from "./images/course-placeholder.png";

export default function CourseGrid() {
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
      <div className={styles["courseGrid--grid-container"]}>
        <div className={styles["courseGrid--course-container"]}>
          <img
            src={coursePlaceholder}
            className={styles["courseGrid--course-placeholder"]}
          />
          <div className={styles["courseGrid--course-catagory"]}>catagory</div>
          <p className={styles["courseGrid--course-title"]}>Course title</p>
        </div>
        <div className={styles["courseGrid--course-container"]}>
          <img
            src={coursePlaceholder}
            className={styles["courseGrid--course-placeholder"]}
          />
          <div className={styles["courseGrid--course-catagory"]}>catagory</div>
          <p className={styles["courseGrid--course-title"]}>Course title</p>
        </div>{" "}
        <div className={styles["courseGrid--course-container"]}>
          <img
            src={coursePlaceholder}
            className={styles["courseGrid--course-placeholder"]}
          />
          <div className={styles["courseGrid--course-catagory"]}>catagory</div>
          <p className={styles["courseGrid--course-title"]}>Course title</p>
        </div>{" "}
        <div className={styles["courseGrid--course-container"]}>
          <img
            src={coursePlaceholder}
            className={styles["courseGrid--course-placeholder"]}
          />
          <div className={styles["courseGrid--course-catagory"]}>catagory</div>
          <p className={styles["courseGrid--course-title"]}>Course title</p>
        </div>{" "}
        <div className={styles["courseGrid--course-container"]}>
          <img
            src={coursePlaceholder}
            className={styles["courseGrid--course-placeholder"]}
          />
          <div className={styles["courseGrid--course-catagory"]}>catagory</div>
          <p className={styles["courseGrid--course-title"]}>Course title</p>
        </div>
      </div>
    </div>
  );
}
