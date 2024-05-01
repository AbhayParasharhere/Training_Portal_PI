import React from "react";
import styles from "./styles.module.scss";
import PostList from "./components/PostList";

export default function PostQues() {
  return (
    <div className={styles["post--main-container"]}>
      <PostList />
    </div>
  );
}
