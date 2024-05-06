import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import line from "./Images/line.png";
import google from "./Images/google.png";
import { useParams } from "react-router-dom";
import { addAppointments } from "../../Firebase/appointments";
import { toast } from "react-toastify";
import addToCalendar from "../CalendarModal";
import { RealTimeDataContext } from "../../context/primaryDataContext";
import { AuthContext } from "../../context/authContext";

export default function Meet(props) {
  const { clientId } = useParams();
  const currentUser = useContext(AuthContext);
  const clientEmail = useContext(RealTimeDataContext)?.clients?.find(
    (client) => client.id === clientId
  )?.email;
  const [appointmentData, setAppointmentData] = useState({});
  const handleCreateAppointmentsWithCalendar = async () => {
    try {
      const updatedAppoinmentData = {
        topic: appointmentData?.topic || "No Topic",
        description: appointmentData?.description || "No Description",
        date: new Date(appointmentData?.date + " " + appointmentData?.time),
        link: appointmentData?.link || "No Link",
        clientID: clientId,
        uid: currentUser?.uid,
      };

      await addAppointments(updatedAppoinmentData);
      console.log("Create Appointments", updatedAppoinmentData);
      addToCalendar(updatedAppoinmentData, clientEmail);
      props.setModalOpen(false);
      toast.success("Appointment created with calendar event");
    } catch (err) {
      toast.error("Error creating Appointment");
    }
  };

  const handleCreateAppointment = async () => {
    try {
      if (
        !appointmentData?.topic ||
        !appointmentData?.date ||
        !appointmentData?.time
      ) {
        toast.error("Please fill the requirements");
        return;
      }
      const updatedAppoinmentData = {
        topic: appointmentData?.topic || "No Topic",
        description: appointmentData?.description || "No Description",
        date: new Date(appointmentData?.date + " " + appointmentData?.time),
        link: appointmentData?.link || "No Link",
        clientID: clientId,
        uid: currentUser?.uid,
      };

      await addAppointments(updatedAppoinmentData);
      props.setModalOpen(false);
      toast.success("Appointment created successfully");
    } catch (err) {
      toast.error("Error creating Appointment");
    }
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
          <label
            className={styles["meet-wrapper-form-label"]}
            style={{ width: 150 }}
          >
            Topic <span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={styles["meet-wrapper-form-input"]}
            name="topic"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles["meet-wrapper-form-topic"]}>
          <label
            className={styles["meet-wrapper-form-label"]}
            style={{ width: 150 }}
          >
            Meeting Link
          </label>
          <input
            className={styles["meet-wrapper-form-input"]}
            name="link"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles["meet-wrapper-form-description"]}>
          <label
            className={styles["meet-wrapper-form-label-desc"]}
            style={{ width: 150 }}
          >
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
            <label
              className={styles["meet-wrapper-form-label"]}
              style={{ width: 60 }}
            >
              Date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              className={styles["meet-wrapper-form-input-date"]}
            />
          </div>
          <div className={styles["meet-wrapper-form-time"]}>
            <label
              className={styles["meet-wrapper-form-label"]}
              style={{ width: 60 }}
            >
              Time <span style={{ color: "red" }}>*</span>
            </label>
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
            onClick={handleCreateAppointment}
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
      <div
        className={styles["meet-wrapper-google-button"]}
        style={{ cursor: "pointer" }}
        onClick={handleCreateAppointmentsWithCalendar}
      >
        <img src={google} height="24px" /> Create with Calendar
      </div>
    </div>
  );
}
