import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import AddComment from "./components/AddComment";
import { RealTimeDataContext } from "../../context/primaryDataContext";

export default function PostQues() {
  const [displayPage, setDisplayPage] = useState("list");
  const [selectedPost, setSelectedPost] = useState({});
  const { posts, fetchPosts } = useContext(RealTimeDataContext);

  useEffect(() => {
    if (!posts.length) {
      fetchPosts();
    }
  }, [fetchPosts, posts]);

  console.log("Posts", posts);
  if (displayPage === "comments") {
    return (
      <div className={styles["post--main-container"]}>
        <AddComment
          selectedPost={selectedPost}
          setDisplayPage={setDisplayPage}
          allPosts={posts}
        />
      </div>
    );
  }
  return (
    <div className={styles["post--main-container"]}>
      {displayPage === "list" ? (
        <PostList
          setDisplayPage={setDisplayPage}
          setSelectedPost={setSelectedPost}
          posts={posts}
        />
      ) : (
        <AddPost setDisplayPage={setDisplayPage} />
      )}
    </div>
  );
}
