import React, { useState } from "react";
import styles from "./styles.module.scss";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";

export default function PostQues() {
  const [displayPage, setDisplayPage] = useState("list");
  return (
    <div className={styles["post--main-container"]}>
      {displayPage === "list" ? (
        <PostList setDisplayPage={setDisplayPage} />
      ) : (
        <AddPost setDisplayPage={setDisplayPage} />
      )}
    </div>
  );
}
