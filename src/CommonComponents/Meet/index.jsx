import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import line from "./Images/line.png";
import google from "./Images/google.png";
import { useParams } from "react-router-dom";
import { addAppointments } from "../../Firebase/appointments";
import { toast } from "react-toastify";
import addToCalendar from "../CalendarModal";
import { RealTimeDataContext } from "../../context/primaryDataContext";

export default function Meet(props) {
  const { clientId } = useParams();
  const clientEmail = useContext(RealTimeDataContext)?.clients?.find(
    (client) => client.id === clientId
  )?.email;
  const [appointmentData, setAppointmentData] = useState({});
  const handleCreateAppointments = async () => {
    const updatedAppoinmentData = {
      topic: appointmentData?.topic || "No Topic",
      description: appointmentData?.description || "No Description",
      date: new Date(appointmentData?.date + " " + appointmentData?.time),
      clientID: clientId,
    };

    await addAppointments(updatedAppoinmentData);
    console.log("Create Appointments", updatedAppoinmentData);
    addToCalendar(updatedAppoinmentData, clientEmail);
    props.setModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  };
  console.log(appointmentData);
  return (
    <div className={styles["meet-wrapper"]}>
      <div className={styles["meet-wrapper-head"]}>
        Schedule a meeting with your client <br />
        Select a date and time that works best for both of you.
      </div>
      <div className={styles["meet-wrapper-form"]}>
        <div className={styles["meet-wrapper-form-topic"]}>
          <label className={styles["meet-wrapper-form-label"]}>Topic</label>
          <input
            className={styles["meet-wrapper-form-input"]}
            name="topic"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles["meet-wrapper-form-description"]}>
          <label className={styles["meet-wrapper-form-label-desc"]}>
            Description <br />
            (Optional)
          </label>
          <label className={styles["meet-wrapper-form-label-desc-mobile"]}>
            Description (Optional)
          </label>
          <textarea
            className={styles["meet-wrapper-form-input"]}
            name="description"
            onChange={(e) => handleChange}
          />
        </div>
        <div className={styles["meet-wrapper-form-date-div"]}>
          <div className={styles["meet-wrapper-form-date"]}>
            <label className={styles["meet-wrapper-form-label"]}>Date</label>
            <input
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              className={styles["meet-wrapper-form-input-date"]}
            />
          </div>
          <div className={styles["meet-wrapper-form-time"]}>
            <label className={styles["meet-wrapper-form-label"]}>Time</label>
            <input
              type="time"
              name="time"
              onChange={(e) => handleChange(e)}
              className={styles["meet-wrapper-form-input-date"]}
            />
          </div>
        </div>
        <div className={styles["meet-wrapper-form-button"]}>
          <div
            className={styles["meet-wrapper-form-button-meet"]}
            onClick={handleCreateAppointments}
          >
            Create Meeting
          </div>
          <div
            className={styles["meet-wrapper-form-button-cancel"]}
            onClick={() => props.setModalOpen(false)}
          >
            Cancel
          </div>
        </div>
      </div>
      <img src={line} className={styles["meet-wrapper-line"]} />
      <div className={styles["meet-wrapper-google-button"]}>
        <img src={google} height="24px" /> Meet with Google
      </div>
    </div>
  );
}
