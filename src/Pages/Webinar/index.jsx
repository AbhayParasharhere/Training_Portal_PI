import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { RealTimeDataContext } from "../../context/primaryDataContext";

export default function Webinar() {
  const [readMore, setReadMore] = useState([-1]);

  const webinarData = useContext(RealTimeDataContext)?.webinars;
  console.log("Webinar Data:", webinarData);

  const handleClick = (index) => {
    if (readMore.includes(index)) {
      const newReadmore = readMore.filter((item) => item !== index);
      setReadMore(newReadmore);
      console.log("Removed:", index);
      return;
    }
    setReadMore((prev) => [...prev, index]);
  };

  const renderWebinar = webinarData?.map((webinar, index) => {
    return (
      <div className={styles["webinar--container"]} key={index}>
        <p className={styles["webinar--title"]}>{webinar.title}</p>
        <div className={styles["webinar--details-container"]}>
          <p className={styles["webinar--desc-text"]}>
            Host: {webinar?.host} {webinar?.hostPosition}
          </p>
          <p className={styles["webinar--desc-text"]}>
            Date: {new Date(webinar?.time)?.toLocaleDateString()}
          </p>
          <p className={styles["webinar--desc-text"]}>
            Time: {new Date(webinar?.time)?.toLocaleTimeString()}
          </p>
        </div>
        <div className={styles["webinar--agenda-container"]}>
          <p className={styles["webinar--agenda-text"]}>Agenda:</p>
          <ol>
            {webinar.agenda.map((agenda) => {
              return <li className={styles["webinar--desc-text"]}>{agenda}</li>;
            })}
            <p
              className={styles["webinar--read-more"]}
              onClick={() => handleClick(index)}
            >
              {readMore.includes(index) ? "Show less" : "Read More..."}
            </p>
          </ol>
        </div>
        <div className={styles["webinar--description-container"]}>
          <p
            className={styles["webinar--desc-text"]}
            style={{
              color: "#393E46",
              display: readMore.includes(index) ? "inline" : "none",
            }}
          >
            <span className={styles["webinar--agenda-text"]}>Description:</span>{" "}
            {webinar.description}
          </p>
        </div>
        <button className={styles["webinar--join-button"]}>Join Link</button>
      </div>
    );
  });
  return (
    <div className={styles["webinar--main-container"]}>{renderWebinar}</div>
  );
}
