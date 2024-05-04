import React, { useState } from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import Dropdown from "../../../../CommonComponents/Dropdown";
import samplePhoto from "./images/sample-profile.png";
import combinedProfile from "./images/combine-profile.png";
import optionsIcon from "./images/options-icon.png";
import reportIcon from "./images/report-icon.png";
import plusIcon from "./images/plus-icon.png";

export default function AddComment(props) {
  const post = props.selectedPost;
  const [reportContainer, setReportContainer] = useState();
  console.log("these are the props: ", props);

  return (
    <div className={styles["addComment--main-container"]}>
      {" "}
      <div
        className={styles["postList--post-container"]}
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
                {post?.userName}
              </p>
              <p className={styles["postList--post-time"]}>
                Posted {post?.time}
              </p>
            </div>
          </div>
          <div className={styles["postList--catagory-container"]}>
            <div className={styles["postList--catagory"]}>
              {post?.catagory1}
            </div>
            <div className={styles["postList--catagory"]}>
              {post?.catagory2}
            </div>
          </div>
        </div>
        <div className={styles["postList--post-details-container"]}>
          <p className={styles["postList--post-text"]}>{post?.post}</p>
          <hr className={styles["postList--divider"]} />
          <div className={styles["postList--answer-container"]}>
            <div className={styles["postList--total-answers-container"]}>
              <img
                src={combinedProfile}
                className={styles["postList--combined-profile"]}
              />
              <p className={styles["postList--total-answers"]}>
                +{post?.totalAnswers} Answered
              </p>
            </div>
          </div>
        </div>
        <div className={styles["addComment--comment-list-container"]}>
          {post?.comments?.map((comment) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 30,
                }}
              >
                <div className={styles["postList--profile-details-container"]}>
                  <div
                    className={styles["postList--profile-image-name-container"]}
                  >
                    <img
                      src={samplePhoto}
                      style={{ height: 30 }}
                      className={styles["postList--profile-image"]}
                    />
                    <div>
                      <p className={styles["postList--profile-name"]}>
                        {comment.name}
                      </p>
                    </div>
                  </div>
                  <div className={styles["postList--catagory-container"]}>
                    <p className={styles["postList--post-time"]}>
                      Posted {comment.time}
                    </p>
                  </div>
                </div>
                <div
                  className={styles["postList--post-details-container"]}
                  style={{ marginTop: 20 }}
                >
                  <p className={styles["postList--post-text"]}>
                    {comment?.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
      <div className={styles["addComment--input-container"]}>
        <textarea
          className={styles["addComment--input"]}
          placeholder="Write your answer"
        ></textarea>
        <div
          style={{ display: "flex", gap: 10 }}
          className={styles["addComment--button-container"]}
        >
          <button className={styles["addComment--add-post-button"]}>
            Post
          </button>
          <button
            style={{
              background: "transparent",
              color: "#3064D4",
              border: "2px solid #3064D4",
            }}
            className={styles["addComment--add-post-button"]}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
