import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { addWebinar } from "../../../Firebase/webinar";
import { RealTimeDataContext } from "../../../context/primaryDataContext";
import { toast } from "react-toastify";

function HostWebinar() {
  //   const webinars = useContext(RealTimeDataContext).webinars;
  const [loading, setLoading] = useState(false);
  //   console.log("Webinars in WebinarForm", webinars);
  // Initialize form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    host: "",
    hostPosition: "",
    link: "",
    time: "",
    agenda: [""],
  });

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle changes for agenda array
  const handleAgendaChange = (index, event) => {
    const updatedAgenda = [...formData.agenda];
    updatedAgenda[index] = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      agenda: updatedAgenda,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !formData?.title ||
        !formData?.description ||
        !formData?.agenda ||
        !formData?.host ||
        !formData?.hostPosition ||
        !formData?.link ||
        !formData?.time
      ) {
        toast.error("Please enter all the details");

        return;
      }
      const confirmation = window.confirm(
        "Are you sure you want to this webinar?"
      );
      if (!confirmation) return;
      setLoading(true);
      await addWebinar(formData);
      setFormData({
        title: "",
        description: "",
        host: "",
        hostPosition: "",
        link: "",
        time: "",
        agenda: [""],
      });
      setLoading(false);
      console.log("Form submitted:", formData);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles["hostWebinar--main-container"]}
    >
      <div className={styles["hostWebinar--input-container"]}>
        <label className={styles["hostWebinar--input-label"]}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          className={styles["hostWebinar--input"]}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["hostWebinar--input-container"]}>
        <label className={styles["hostWebinar--input-label"]}>
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          className={styles["hostWebinar--input"]}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["hostWebinar--input-container"]}>
        <label className={styles["hostWebinar--input-label"]}>Host:</label>
        <input
          type="text"
          name="host"
          value={formData.host}
          className={styles["hostWebinar--input"]}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["hostWebinar--input-container"]}>
        <label className={styles["hostWebinar--input-label"]}>
          Host Position:
        </label>
        <input
          type="text"
          name="hostPosition"
          className={styles["hostWebinar--input"]}
          value={formData.hostPosition}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["hostWebinar--input-container"]}>
        <label className={styles["hostWebinar--input-label"]}>Link:</label>
        <input
          type="url"
          name="link"
          className={styles["hostWebinar--input"]}
          value={formData.link}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["hostWebinar--input-container"]}>
        <label className={styles["hostWebinar--input-label"]}>Time:</label>
        <input
          type="datetime-local"
          name="time"
          className={styles["hostWebinar--input"]}
          value={formData.time}
          onChange={handleInputChange}
        />
      </div>

      <div
        className={styles["hostWebinar--input-container"]}
        style={{ flexDirection: "column", gap: 10, alignItems: "flex-start" }}
      >
        <label className={styles["hostWebinar--input-label"]}>Agenda:</label>
        {formData.agenda.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              className={styles["hostWebinar--input"]}
              value={item}
              onChange={(e) => handleAgendaChange(index, e)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              agenda: [...prevFormData.agenda, ""],
            }))
          }
          className={styles["hostWebinar--add-agenda-button"]}
        >
          Add Agenda Point
        </button>
      </div>
      <button type="submit" className={styles["hostWebinar--submit-button"]}>
        {loading ? "Loading.." : "Schedule Webinar"}
      </button>
    </form>
  );
}

export default HostWebinar;
