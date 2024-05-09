import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FileUploader } from "react-drag-drop-files";
import documentIcon from "./images/document-icon.png";
import ProgressBar from "@ramonak/react-progress-bar";

export default function AddDocuments() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [progressPercent, setProgressPercent] = useState(0);
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleUpload = () => {
    let currentProgress = 0;
    const increment = 1; // Progress increment per interval
    const intervalDuration = 20; // Interval duration in milliseconds
    const totalDuration = 2000; // Total duration for the progress to reach 90

    const intervalId = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 85) {
        clearInterval(intervalId);
      }
      setProgressPercent(currentProgress);
    }, intervalDuration);

    setTimeout(() => {
      const randomProgress = Math.floor(Math.random() * (95 - 85 + 1)) + 85;
      setProgressPercent(randomProgress);
    }, totalDuration);
  };

  return (
    <div className={styles["addDocuments--main-container"]}>
      Upload
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        className={"addDocuments--file-upload"}
        maxSize={10}
      />
      <button
        className={styles["addDocuments--upload-button"]}
        onClick={handleUpload}
      >
        Upload
      </button>
      <div className={styles["addDocument--upload-progress-container"]}>
        <div className={styles["addDocument--document-info-container"]}>
          <img src={documentIcon} className={styles["addDocument-icon"]} />
          <p>Document Name</p>
        </div>
        <ProgressBar completed={progressPercent} />
      </div>
    </div>
  );
}
