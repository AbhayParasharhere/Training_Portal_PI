import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import filterIcon from "./images/filter-icon.png";
import coursePlaceholder from "./images/course-placeholder.png";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryDataContext } from "../../../../context/primaryDataContext";

export default function CourseGrid(props) {
  const primaryData = useContext(PrimaryDataContext);
  const initialCourseData = props.courses;
  const [courseData, setCourseData] = useState(initialCourseData);
  const [search, setSearch] = useState("");
  const defaultPlaceholder = coursePlaceholder;
  const navigate = useNavigate();
  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") return setCourseData(initialCourseData);
    const filteredCourses = initialCourseData?.filter((course) => {
      return course.title.toLowerCase().includes(value.toLowerCase());
    });
    setCourseData(filteredCourses);
  };
  const renderCourse = courseData?.map((course, index) => {
    return (
      <div
        className={styles["courseGrid--course-container"]}
        key={index}
        onClick={() => {
          return navigate(`/courses/${course.title}`, {
            state: { course },
          });
        }}
      >
        <div
          className={styles["courseGrid--course-placeholder"]}
          style={{
            backgroundImage: `url(${
              course?.thumbnailURL || defaultPlaceholder
            })`,
          }}
        />
        <div className={styles["courseGrid--course-category"]}>
          {course.category}
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
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
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
