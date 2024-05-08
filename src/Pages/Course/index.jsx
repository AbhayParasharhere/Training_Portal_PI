import React, { useContext } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import CourseGrid from "./components/CourseGrid";
import CourseDetail from "./components/CourseDetail";
import { PrimaryDataContext } from "../../context/primaryDataContext";
export default function Course() {
  const allCourses = useContext(PrimaryDataContext)?.courses;
  const filteredCourses = allCourses?.filter((course) => !course.products);
  return (
    <div className={styles["course--main-container"]}>
      <CourseGrid courses={filteredCourses} goBack={"/courses"} />
    </div>
  );
}
