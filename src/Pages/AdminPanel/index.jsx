import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import add from "./Images/cloud_add.png";
import upload from "./Images/upload_line.png";
import plus from "./Images/close_line.png";
import Sidebar from "../../CommonComponents/Sidebar";

const AdminPanel = () => {
  return (
    // <div className={styles["AdminPanel-main"]}>

    <div className={styles["AdminPanel-wrapper"]}>
      <label className={styles["AdminPanel-wrapper-course-title-label"]}>
        Course Cover
      </label>
      <div className={styles["AdminPanel-wrapper-cover"]}>
        <div className={styles["AdminPanel-wrapper-cover-div"]}>
          <div className={styles["AdminPanel-wrapper-course-cover"]}>
            <div className={styles["AdminPanel-wrapper-course-cover-div"]}>
              <img src={add} />
              <div
                className={styles["AdminPanel-wrapper-course-cover-div-head"]}
              >
                Choose a file or drag & drop it here
              </div>
              <div
                className={styles["AdminPanel-wrapper-course-cover-div-text"]}
              >
                JPEG, PNG and PDG formats, up to 50MB
              </div>
              <div className={styles["browseButton"]}>
                <Button
                  className={styles["browseAction"]}
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#54575c",
                    fontSize: "15",
                    background: "#fff",
                    border: "#cbd0dc solid 1px",
                    borderRadius: "8px",
                    "&:hover": { background: "#fff" },
                    height: 34,
                  }}
                >
                  Browse File
                </Button>
              </div>
            </div>

            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              >
                Course title
              </label>
              <input
                name="course-title"
                className={styles["AdminPanel-wrapper-course-title-input"]}
              ></input>
            </div>

            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              >
                Section title
              </label>
              <input
                name="course-title"
                className={styles["AdminPanel-wrapper-course-title-input"]}
              ></input>
            </div>
            {/* <div
                className={styles["AdminPanel-wrapper-course-field-add-button"]}
              >
                <img src={plus} height="24px" width="24px" />
              </div> */}

            {/* <div className={styles["AdminPanel-wrapper-course-upload-div"]}> */}
            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              ></label>
              <div className={styles["AdminPanel-wrapper-course-upload"]}>
                Upload Video <img src={upload} height="24px"></img>
              </div>
            </div>
            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              ></label>
              <div className={styles["AdminPanel-wrapper-course-upload"]}>
                Upload Video <img src={upload} height="24px"></img>
              </div>
            </div>
            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              ></label>
              <div className={styles["AdminPanel-wrapper-course-upload"]}>
                Upload Video <img src={upload} height="24px"></img>
              </div>
              {/* <div
                className={styles["AdminPanel-wrapper-course-field-add-button"]}
              >
                <img src={plus} height="24px" width="24px" />
              </div> */}
            </div>

            {/* <div className={styles["AdminPanel-wrapper-course-upload"]}>
            Upload Video <img src={upload} height="24px"></img>
          </div>

          <div className={styles["AdminPanel-wrapper-course-upload"]}>
            Upload Video <img src={upload} height="24px"></img>
          </div> */}
            {/* </div> */}
            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              >
                Uploaded to
              </label>
              <input
                name="course-title"
                className={styles["AdminPanel-wrapper-course-title-input"]}
              ></input>
            </div>
            <div className={styles["AdminPanel-wrapper-course-title"]}>
              <label
                for="course-title"
                className={styles["AdminPanel-wrapper-course-title-label"]}
              >
                Course Category
              </label>
              <input
                name="course-title"
                className={styles["AdminPanel-wrapper-course-title-input"]}
              ></input>
            </div>
          </div>
          <div className={styles["AdminPanel-wrapper-plus"]}>
            <div
              className={styles["AdminPanel-wrapper-course-field-add-button"]}
            >
              <img src={plus} height="24px" width="24px" />
            </div>
            <div
              className={styles["AdminPanel-wrapper-course-field-add-button"]}
            >
              <img src={plus} height="24px" width="24px" />
            </div>
          </div>
        </div>

        <div className={styles["AdminPanel-wrapper-description"]}>
          <div className={styles["AdminPanel-wrapper-course-description"]}>
            <label
              for="course-description"
              className={
                styles["AdminPanel-wrapper-course-title-label-description"]
              }
            >
              Course Description
            </label>
            <textarea
              rows="12"
              cols="30"
              name="course-title"
              className={
                styles["AdminPanel-wrapper-course-description-textarea"]
              }
            ></textarea>
            <textarea
              rows="12"
              cols="25"
              name="course-title"
              className={
                styles["AdminPanel-wrapper-course-description-textarea-mobile"]
              }
            ></textarea>
          </div>
          <div className={styles["AdminPanel-wrapper-course-title"]}>
            <label
              for="course-title"
              className={styles["AdminPanel-wrapper-course-title-label-date"]}
            >
              Date
            </label>
            <input
              type="date"
              className={styles["AdminPanel-wrapper-course-title-input-date"]}
            />
          </div>
        </div>
      </div>
      <button className={styles["ClientInfo-wrapper-topbar-buttons-save"]}>
        Save Changes
      </button>
    </div>
    // </div>
  );
};
export default AdminPanel;
