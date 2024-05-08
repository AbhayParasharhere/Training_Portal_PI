import React, { useState } from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import Dropdown from "../../../../CommonComponents/Dropdown";
import samplePhoto from "./images/sample-profile.png";
import combinedProfile from "./images/combine-profile.png";
import optionsIcon from "./images/options-icon.png";
import reportIcon from "./images/report-icon.png";
import plusIcon from "./images/plus-icon.png";
import { getTimeDifference } from "../../../Dashboard/components/TabletImportantUpdates";
import { toast } from "react-toastify";
import { addComment } from "../../../../Firebase/postDoubtsLogic";
import secureLocalStorage from "react-secure-storage";

export default function AddComment(props) {
  const post = props.allPosts.find(
    (post) => post.id === props.selectedPost?.id
  );
  const handleAddComment = async () => {
    if (!commentData.comment) {
      toast.error("Please enter a comment");
      return;
    }

    console.log("Comment data", commentData);
    const userName = secureLocalStorage.getItem("userDetails")[0];
    const userPhoto = secureLocalStorage.getItem("userDetails")[1];
    await addComment({ ...commentData, userName, userPhoto }, post?.id);
    setCommentData({});
  };

  const [commentData, setCommentData] = useState({});
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
              src={post?.photo || samplePhoto}
              className={styles["postList--profile-image"]}
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
                      src={comment?.userPhoto || samplePhoto}
                      style={{ height: 30, borderRadius: "50%" }}
                      className={styles["postList--profile-image"]}
                    />
                    <div>
                      <p className={styles["postList--profile-name"]}>
                        {comment?.userName}
                      </p>
                    </div>
                  </div>
                  <div className={styles["postList--catagory-container"]}>
                    <p className={styles["postList--post-time"]}>
                      Posted {getTimeDifference(comment?.created_at.toDate())}
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
          name="comment"
          value={commentData.comment}
          onChange={(e) => {
            setCommentData({ ...commentData, comment: e.target.value });
          }}
        />
        <div
          style={{ display: "flex", gap: 10 }}
          className={styles["addComment--button-container"]}
        >
          <button
            className={styles["addComment--add-post-button"]}
            onClick={handleAddComment}
          >
            Post
          </button>
          <button
            style={{
              background: "transparent",
              color: "#3064D4",
              border: "2px solid #3064D4",
            }}
            className={styles["addComment--add-post-button"]}
            onClick={() => props?.setDisplayPage("list")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
