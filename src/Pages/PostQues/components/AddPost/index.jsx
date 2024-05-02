import React from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

export default function AddPost(props) {
  return (
    <div className={styles["addPost--main-container"]}>
      <p className={styles["addPost--doubt-title"]}>Doubt</p>
      <textarea className={styles["addPost--text-area"]} />
      <div style={{ marginTop: 10 }}>
        <p className={styles["addPost--choose-title"]}>Choose post catagory:</p>
        <div style={{ marginBottom: 20 }}>
          <input type="radio" id="compliance" />
          <label for="compliance" className={styles["addPost--label-text"]}>
            Compliance
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input type="radio" id="compliance" />
          <label for="compliance" className={styles["addPost--label-text"]}>
            Technical Issue
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input type="radio" id="compliance" />
          <label for="compliance" className={styles["addPost--label-text"]}>
            General
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input type="radio" id="compliance" />
          <label for="compliance" className={styles["addPost--label-text"]}>
            Insurance
          </label>
        </div>
      </div>
      <div className={styles["addPost--button-container"]}>
        <button
          className={styles["addPost--post-button"]}
          onClick={() => toast.success("Post added sucessfully")}
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
