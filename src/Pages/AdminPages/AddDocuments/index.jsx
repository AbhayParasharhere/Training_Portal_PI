import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FileUploader } from "react-drag-drop-files";
import documentIcon from "./images/document-icon.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { uploadDocument } from "../../../Firebase/addGetDocuments";
import { toast } from "react-toastify";

export default function AddDocuments() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [progressPercent, setProgressPercent] = useState(0);
  const [file, setFile] = useState(null);
  const [displayProgress, setDisplayProgress] = useState(false);
  const [documentDetails, setDocumentDetails] = useState({
    documentName: "",
    category: "",
  });
  const handleChange = (file) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (!documentDetails.documentName || !documentDetails) {
      toast.error("Fill all the requirements");
      return;
    }
    setDisplayProgress(true);
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
    const uploadData = { ...documentDetails, file: file };
    console.log("This is the data being uploaded ", uploadData);
    await uploadDocument(uploadData);
    setProgressPercent(100);
    setDisplayProgress(false);
    setDocumentDetails({ documentName: "", category: "" });
    setFile(null);
  };
  console.log(documentDetails);

  const handleDocumentChange = (event) => {
    setDocumentDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
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
        label="Select the document and click upload"
      />
      <div className={styles["addDocument--input-container"]}>
        <p className={styles["addDocument--input-label"]}>Document Name</p>
        <input
          className={styles["addDocument--input"]}
          name="documentName"
          onChange={() => handleDocumentChange(event)}
        />
      </div>
      <div className={styles["addDocument--input-container"]}>
        <p className={styles["addDocument--input-label"]}>Document Category</p>
        <select
          className={styles["addDocument--input"]}
          name="category"
          onChange={(event) =>
            setDocumentDetails((prev) => {
              return { ...prev, category: event.target.value };
            })
          }
          value={documentDetails.category}
        >
          <option value="">Select Category</option>
          <option value="sales">Sales</option>
          <option value="compliance">Compliance</option>
          <option value="policies">Policies</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <button
        className={styles["addDocuments--upload-button"]}
        onClick={handleUpload}
      >
        Upload
      </button>
      {displayProgress ? (
        <div className={styles["addDocument--upload-progress-container"]}>
          <div className={styles["addDocument--document-info-container"]}>
            <img src={documentIcon} className={styles["addDocument-icon"]} />
            <p>{documentDetails.name}</p>
          </div>
          <ProgressBar completed={progressPercent} />
        </div>
      ) : null}
    </div>
  );
}
