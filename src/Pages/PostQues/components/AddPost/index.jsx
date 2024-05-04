import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { postDoubts } from "../../../../Firebase/postDoubtsLogic";
import { AuthContext } from "../../../../context/authContext";

export default function AddPost(props) {
  const [doubt, setDoubt] = React.useState("");
  const [postCategory, setPostCategory] = React.useState("compliance");
  const currentUser = useContext(AuthContext);

  const handleCategoryChange = (event) => {
    setPostCategory(event.target.value);
  };

  const handlePostAdd = async () => {
    if (doubt === "") {
      toast.error("Doubt cannot be empty");
      return;
    }
    if (postCategory === "") {
      toast.error("Please select a category");
      return;
    }
    const res = await postDoubts(currentUser.uid, postCategory, doubt);
    console.log("Post added", doubt, postCategory);
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
            value="compliance"
            checked={postCategory === "compliance"}
            onChange={handleCategoryChange}
          />
          <label for="compliance" className={styles["addPost--label-text"]}>
            Compliance
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="technical_issue"
            name="technical_issue"
            value="technical_issue"
            checked={postCategory === "technical_issue"}
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
            value="general"
            checked={postCategory === "general"}
            onChange={handleCategoryChange}
          />
          <label for="general" className={styles["addPost--label-text"]}>
            General
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="radio"
            id="insurance"
            name="insurance"
            value="insurance"
            checked={postCategory === "insurance"}
            onChange={handleCategoryChange}
          />
          <label for="insurance" className={styles["addPost--label-text"]}>
            Insurance
          </label>
        </div>
      </div>
      <div className={styles["addPost--button-container"]}>
        <button
          className={styles["addPost--post-button"]}
          onClick={handlePostAdd}
        >
          Post
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
