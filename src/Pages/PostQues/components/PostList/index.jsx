import React, { useState, useMemo, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import Dropdown from "../../../../CommonComponents/Dropdown";
import samplePhoto from "./images/sample-profile.png";
import combinedProfile from "./images/combine-profile.png";
import optionsIcon from "./images/options-icon.png";
import reportIcon from "./images/report-icon.png";
import plusIcon from "./images/plus-icon.png";
import { getPostedDoubtsRealtime } from "../../../../Firebase/postDoubtsLogic";
import { getTimeDifference } from "../../../Dashboard/components/TabletImportantUpdates";
import { RealTimeDataContext } from "../../../../context/primaryDataContext";

export default function PostList(props) {
  const { allPosts } = useContext(RealTimeDataContext);
  const [posts, setPosts] = useState(props?.posts);
  console.log("Initial posts: ", posts, "props posts: ", props?.posts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ value: "", text: "" });

  console.log(search);
  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") return setPosts(props?.posts);
    const filteredPosts = props?.posts?.filter((post) => {
      return post.post.toLowerCase().includes(value.toLowerCase());
    });
    setPosts(filteredPosts);
  };
  useEffect(() => {
    if (props?.posts) {
      setPosts(props.posts);
    }
  }, [props.posts]);
  useEffect(() => {
    console.log("initial filter", filter);
    if (filter.value === "" || !filter) return setPosts(props?.posts);
    const filterCategoryPost = props?.posts?.filter((post) => {
      return post.category === filter?.value;
    });
    setPosts(filterCategoryPost);
  }, [filter]);
  const arrowOptions = [
    { text: "All", value: "" },
    { text: "Technical Support", value: "Technical Support" },
    { text: "Platform Navigation", value: "Platform Navigation" },
    { text: "Training and Courses", value: "Training and Courses" },
    { text: "Announcements/Updates", value: "Announcements/Updates" },
    { text: "General Inquiries", value: "General Inquiries" },
    { text: "Compliance and Policies", value: "Compliance and Policies" },
  ];

  const [reportContainer, setReportContainer] = useState();
  const handleCommentPage = (post) => {
    props.setDisplayPage("comments");
    props.setSelectedPost(post);
  };

  const renderPosts = posts?.map((post, index) => {
    return (
      <div
        className={styles["postList--post-container"]}
        key={index}
        onClick={() => {
          reportContainer && setReportContainer(null);
        }}
      >
        <div className={styles["postList--profile-details-container"]}>
          <div className={styles["postList--profile-image-name-container"]}>
            <img
              src={post?.photo || samplePhoto}
              className={styles["postList--profile-image"]}
              style={post?.photo ? { borderRadius: "50%" } : {}}
            />
            <div>
              <p className={styles["postList--profile-name"]}>
                {post?.userName}
              </p>
              <p className={styles["postList--post-time"]}>
                Posted {getTimeDifference(post?.created_at.toDate())}
              </p>
            </div>
          </div>
          <div className={styles["postList--catagory-container"]}>
            <div className={styles["postList--catagory"]}>{post?.category}</div>
          </div>
        </div>
        <div className={styles["postList--post-details-container"]}>
          <p className={styles["postList--post-text"]}>{post?.post}</p>
          <hr className={styles["postList--divider"]} />
          <div className={styles["postList--answer-container"]}>
            <div className={styles["postList--total-answers-container"]}>
              {post?.comments?.length && (
                <img
                  src={combinedProfile}
                  className={styles["postList--combined-profile"]}
                />
              )}

              <p className={styles["postList--total-answers"]}>
                {post?.comments?.length
                  ? `+${post?.comments?.length} Answered`
                  : "No answers yet"}
              </p>
            </div>
            <div className={styles["postList--answer-button-container"]}>
              <button
                className={styles["postList--answer-button"]}
                onClick={() => handleCommentPage(post)}
              >
                Answer Question
              </button>
              <button
                className={styles["postList--option-button"]}
                onClick={() => {
                  setReportContainer(index + 1);
                }}
              >
                <img
                  src={optionsIcon}
                  className={styles["postList--option-icon"]}
                />
              </button>
              <div
                style={{
                  display: reportContainer === index + 1 ? "flex" : "none",
                }}
                className={styles["postList--report"]}
              >
                <img
                  src={reportIcon}
                  className={styles["postList--report-icon"]}
                />
                Report issue
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const [arrowState, setArrowState] = useState(false);
  console.log("filter: ", filter);
  console.log("Filter in posts active", filter);
  return (
    <div
      className={styles["postList--main-container"]}
      onClick={() => arrowState && setArrowState(false)}
    >
      <button
        className={styles["postList--add-post-button"]}
        onClick={() => props.setDisplayPage("addPost")}
      >
        <img src={plusIcon} className={styles["postList--add-post-icon"]} />
        Ask Doubts
      </button>
      <div className={styles["postList--search-container"]}>
        <input
          placeholder="Search your doubts"
          className={styles["postList--search-input"]}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <img src={searchIcon} className={styles["postList--search-icon"]} />
        <Dropdown
          width="200px"
          height="50px"
          arrowState={arrowState}
          setArrowState={setArrowState}
          options={arrowOptions}
          setFilter={setFilter}
          filter={filter}
        />
      </div>
      <div className={styles["postList--post-list-container"]}>
        {renderPosts}
      </div>
    </div>
  );
}
