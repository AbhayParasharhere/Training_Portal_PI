import React, { useState } from "react";
import styles from "./styles.module.scss";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import AddComment from "./components/AddComment";

export default function PostQues() {
  const [displayPage, setDisplayPage] = useState("list");
  const [selectedPost, setSelectedPost] = useState({});
  if (displayPage === "comments") {
    return (
      <div className={styles["post--main-container"]}>
        <AddComment selectedPost={selectedPost} />
      </div>
    );
  }
  return (
    <div className={styles["post--main-container"]}>
      {displayPage === "list" ? (
        <PostList
          setDisplayPage={setDisplayPage}
          setSelectedPost={setSelectedPost}
        />
      ) : (
        <AddPost setDisplayPage={setDisplayPage} />
      )}
    </div>
  );
}
