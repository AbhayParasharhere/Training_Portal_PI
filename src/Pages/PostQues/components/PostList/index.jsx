import React, { useState } from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import Dropdown from "../../../../CommonComponents/Dropdown";
import samplePhoto from "./images/sample-profile.png";
import combinedProfile from "./images/combine-profile.png";
import optionsIcon from "./images/options-icon.png";
import reportIcon from "./images/report-icon.png";
import plusIcon from "./images/plus-icon.png";

export default function PostList(props) {
  const arrowOptions = [
    { text: "All", value: "" },
    { text: "Technical Support", value: "tech" },
    { text: "Platform Navigation", value: "platform" },
    { text: "Training and Courses", value: "training" },
    { text: "Annoucements/Updates", value: "updates" },
    { text: "General Inquiries", value: "general" },
  ];
  const postsData = [
    {
      userName: "Bessie Cooper",
      catagory1: "General",
      catagory2: "Technical",
      time: "20 mins ago",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv?",
      totalAnswers: "4",
      comments: [
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 1",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 2",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
        ,
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 2",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
        ,
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 2",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
        ,
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 2",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
        ,
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 2",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
        ,
        {
          img: samplePhoto,
          time: "2 mins ago",
          name: "Comment 2",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv",
        },
      ],
    },
    {
      userName: "Bessie Cooper",
      catagory1: "General",
      catagory2: "Technical",
      time: "20 mins ago",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv?",
      totalAnswers: "4",
    },
    {
      userName: "Bessie Cooper",
      catagory1: "General",
      catagory2: "Technical",
      time: "20 mins ago",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv?",
      totalAnswers: "4",
    },
    {
      userName: "Bessie Cooper",
      catagory1: "General",
      catagory2: "Technical",
      time: "20 mins ago",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv?",
      totalAnswers: "4",
    },
    {
      userName: "Bessie Cooper",
      catagory1: "General",
      catagory2: "Technical",
      time: "20 mins ago",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cftyb6u vnrighn4vghutbuiyhs 8 huihfiu gvhbnuingrv?",
      totalAnswers: "4",
    },
  ];
  const [reportContainer, setReportContainer] = useState();
  const handleCommentPage = (post) => {
    props.setDisplayPage("comments");
    props.setSelectedPost(post);
  };

  const renderPosts = postsData.map((post, index) => {
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
              src={samplePhoto}
              className={styles["postList--profile-image"]}
            />
            <div>
              <p className={styles["postList--profile-name"]}>
                {post.userName}
              </p>
              <p className={styles["postList--post-time"]}>
                Posted {post.time}
              </p>
            </div>
          </div>
          <div className={styles["postList--catagory-container"]}>
            <div className={styles["postList--catagory"]}>{post.catagory1}</div>
            <div className={styles["postList--catagory"]}>{post.catagory2}</div>
          </div>
        </div>
        <div className={styles["postList--post-details-container"]}>
          <p className={styles["postList--post-text"]}>{post.post}</p>
          <hr className={styles["postList--divider"]} />
          <div className={styles["postList--answer-container"]}>
            <div className={styles["postList--total-answers-container"]}>
              <img
                src={combinedProfile}
                className={styles["postList--combined-profile"]}
              />
              <p className={styles["postList--total-answers"]}>
                +{post.totalAnswers} Answered
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
  const [filter, setFilter] = useState("");
  console.log(filter);
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
