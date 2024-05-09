import React, { useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import { createAnnouncement } from "../../../Firebase/announcementLogic";

export default function MakeAnnouncements() {
  const [announcementDetails, setAnnouncementDetails] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  console.log(announcementDetails);
  const handleAnnouncementChange = (event) => {
    setAnnouncementDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const handleMakeAnnouncement = async () => {
    try {
      setLoading(true);
      if (
        announcementDetails.title === "" ||
        announcementDetails.description === "" ||
        !announcementDetails
      ) {
        toast.error("Please fill the details");
        return;
      }
      const currentUserName = secureLocalStorage.getItem("userDetails")[0];
      console.log("This is the current user: ", currentUserName);
      const confirmation = window.confirm(
        "Are you sure you want make this announcement?"
      );
      if (!confirmation) return;
      const submitAnnouncementData = {
        ...announcementDetails,
        created_by: currentUserName,
      };
      await createAnnouncement(submitAnnouncementData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ANnouncement error: ", err);
    }
  };
  return (
    <div className={styles["adminAnnouncement--main-container"]}>
      <div className={styles["adminAnnouncement--input-container"]}>
        <div className={styles["adminAnnouncement--input-inner-container"]}>
          <p className={styles["adminAnnouncement--label"]}>Title</p>
          <input
            className={styles["adminAnnouncement--input"]}
            name="title"
            onChange={handleAnnouncementChange}
            value={announcementDetails.title}
          />
        </div>
        <div
          className={styles["adminAnnouncement--input-inner-container"]}
          style={{ alignItems: "flex-start" }}
        >
          <p className={styles["adminAnnouncement--label"]}>Description</p>
          <textarea
            name="description"
            onChange={(event) => handleAnnouncementChange(event)}
            className={styles["adminAnnouncement--input"]}
            style={{ height: "150px", resize: "none" }}
            value={announcementDetails.description}
          />
        </div>
      </div>
      <div className={styles["adminAnnouncement--button-container"]}>
        <button
          className={styles["adminAnnouncement--post-button"]}
          onClick={handleMakeAnnouncement}
        >
          {" "}
          {loading ? "Loading..." : "Post"}
        </button>
        <button
          className={styles["adminAnnouncement--cancel-button"]}
          onClick={() => setAnnouncementDetails({ title: "", description: "" })}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
