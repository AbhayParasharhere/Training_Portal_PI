import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { postDoubts } from "../../../../Firebase/postDoubtsLogic";
import { AuthContext } from "../../../../context/authContext";
import secureLocalStorage from "react-secure-storage";

export default function AddPost(props) {
  const [doubt, setDoubt] = useState("");
  const [postCategory, setPostCategory] = useState("compliance");
  const [loading, setLoading] = useState(false);
  const currentUser = useContext(AuthContext);

  const handleCategoryChange = (event) => {
    setPostCategory(event.target.value);
  };

  const handlePostAdd = async () => {
    try {
      if (doubt === "") {
        toast.error("Doubt cannot be empty");
        return;
      }
      if (postCategory === "") {
        toast.error("Please select a category");
        return;
      }

      const currentUserName = secureLocalStorage.getItem("userDetails")?.[0];
      const currentUserPhoto = secureLocalStorage.getItem("userDetails")?.[1];
      setLoading(true);
      await postDoubts({
        userName: currentUserName,
        photo: currentUserPhoto,
        uid: currentUser.uid,
        category: postCategory,
        post: doubt,
      });
      setLoading(false);
      props.setDisplayPage("list");
      console.log("Post added", doubt, postCategory);
    } catch (err) {
      setLoading(false);
    }
    // props.addPost(doubt, postCategory);
  };
  // console.log(doubt, postCategory);
  return (
    <div className={styles["addPost--main-container"]}>
      <p className={styles["addPost--doubt-title"]}>Doubt</p>
      <textarea
        className={styles["addPost--text-area"]}
        onChange={(e) => setDoubt(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <p className={styles["addPost--choose-title"]}>Choose post category:</p>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="compliance"
            name="compliance"
            value="Compliance and Policies"
            checked={postCategory === "Compliance and Policies"}
            onChange={handleCategoryChange}
          />
          <label for="compliance" className={styles["addPost--label-text"]}>
            Compliance and Policies
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="technical_issue"
            name="technical_issue"
            value="Technical Support"
            checked={postCategory === "Technical Support"}
            onChange={handleCategoryChange}
          />
          <label
            for="technical_issue"
            className={styles["addPost--label-text"]}
          >
            Technical Issue
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="general"
            name="general"
            value="General Inquiries"
            checked={postCategory === "General Inquiries"}
            onChange={handleCategoryChange}
          />
          <label for="general" className={styles["addPost--label-text"]}>
            General Inquiries
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="insurance"
            name="insurance"
            value="Platform Navigation"
            checked={postCategory === "Platform Navigation"}
            onChange={handleCategoryChange}
          />
          <label for="insurance" className={styles["addPost--label-text"]}>
            Platform Navigation
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="traning"
            name="insurance"
            value="Training and Courses"
            checked={postCategory === "Training and Courses"}
            onChange={handleCategoryChange}
          />
          <label for="traning" className={styles["addPost--label-text"]}>
            Training and Courses
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="insurance"
            name="insurance"
            value="Announcements/Updates"
            checked={postCategory === "Announcements/Updates"}
            onChange={handleCategoryChange}
          />
          <label for="insurance" className={styles["addPost--label-text"]}>
            Announcements/Updates
          </label>
        </div>
      </div>
      <div className={styles["addPost--button-container"]}>
        <button
          className={styles["addPost--post-button"]}
          onClick={handlePostAdd}
        >
          {loading ? "Posting..." : "Post"}
        </button>
        <button
          className={styles["addPost--cancel-button"]}
          onClick={() => props.setDisplayPage("list")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
