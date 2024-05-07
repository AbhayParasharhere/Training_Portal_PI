import React, { useContext } from "react";
import styles from "./styles.module.scss";
import CourseGrid from "../Course/components/CourseGrid";
import { PrimaryDataContext } from "../../context/primaryDataContext";

export default function ProductCourses() {
  const allCourses = useContext(PrimaryDataContext)?.courses;
  const filteredCourses = allCourses?.filter((course) => course.products);
  console.log("These are all the courses: ", filteredCourses);
  return (
    <div className={styles["course--main-container"]}>
      <CourseGrid courses={filteredCourses} goBack="/productCourses" />
    </div>
  );
}
