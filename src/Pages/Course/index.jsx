import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../../CommonComponents/Sidebar";
import CourseGrid from "./components/CourseGrid";

export default function Course() {
  return (
    <div className={styles["course--main-container"]}>
      <Sidebar />
      <CourseGrid />
    </div>
  );
}
