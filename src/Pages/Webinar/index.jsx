import React, { useState } from "react";
import styles from "./styles.module.scss";

export default function Webinar() {
  const [readMore, setReadMore] = useState([-1]);

  const webinarData = [
    {
      title: "Mastering Sales Techniques for Life Insurance Brokers",
      host: "John Doe, Senior Sales Trainer",
      date: "May 5, 2024",
      time: "10:00 AM - 11:30 AM EST",
      agenda: [
        "Introduction to Effective Selling: Understanding the psychology of selling and building rapport with clients.  ",
        "Overcoming Objections: Techniques for addressing common objections and objections unique to the life insurance industry.",
        "Q&A Session: An interactive Q&A session where attendees can ask questions and get personalized advice from the host.",
      ],
      description:
        "Join us for an interactive webinar session led by John Doe, aseasoned sales trainer with over 15 years of experience in theinsurance industry. In this webinar, John will share valuableinsights and practical tips for mastering sales techniquesspecifically tailored for life insurance brokers. Whether you're aseasoned professional or just starting out in the industry, thiswebinar will equip you with the knowledge and skills you need toexcel in selling life insurance products. Don't miss thisopportunity to learn from one of the best in the field and take yoursales game to the next level!",
    },
    {
      title: "Mastering Sales Techniques for Life Insurance Brokers",
      host: "John Doe, Senior Sales Trainer",
      date: "May 5, 2024",
      time: "10:00 AM - 11:30 AM EST",
      agenda: [
        "Introduction to Effective Selling: Understanding the psychology of selling and building rapport with clients.  ",
        "Overcoming Objections: Techniques for addressing common objections and objections unique to the life insurance industry.",
        "Q&A Session: An interactive Q&A session where attendees can ask questions and get personalized advice from the host.",
      ],
      description:
        "Join us for an interactive webinar session led by John Doe, aseasoned sales trainer with over 15 years of experience in theinsurance industry. In this webinar, John will share valuableinsights and practical tips for mastering sales techniquesspecifically tailored for life insurance brokers. Whether you're aseasoned professional or just starting out in the industry, thiswebinar will equip you with the knowledge and skills you need toexcel in selling life insurance products. Don't miss thisopportunity to learn from one of the best in the field and take yoursales game to the next level!",
    },
    {
      title: "Mastering Sales Techniques for Life Insurance Brokers",
      host: "John Doe, Senior Sales Trainer",
      date: "May 5, 2024",
      time: "10:00 AM - 11:30 AM EST",
      agenda: [
        "Introduction to Effective Selling: Understanding the psychology of selling and building rapport with clients.  ",
        "Overcoming Objections: Techniques for addressing common objections and objections unique to the life insurance industry.",
        "Q&A Session: An interactive Q&A session where attendees can ask questions and get personalized advice from the host.",
      ],
      description:
        "Join us for an interactive webinar session led by John Doe, aseasoned sales trainer with over 15 years of experience in theinsurance industry. In this webinar, John will share valuableinsights and practical tips for mastering sales techniquesspecifically tailored for life insurance brokers. Whether you're aseasoned professional or just starting out in the industry, thiswebinar will equip you with the knowledge and skills you need toexcel in selling life insurance products. Don't miss thisopportunity to learn from one of the best in the field and take yoursales game to the next level!",
    },
  ];

  const handleClick = (index) => {
    if (readMore.includes(index)) {
      const newReadmore = readMore.filter((item) => item !== index);
      setReadMore(newReadmore);
      console.log("Removed:", index);
      return;
    }
    setReadMore((prev) => [...prev, index]);
  };

  const renderWebinar = webinarData.map((webinar, index) => {
    return (
      <div className={styles["webinar--container"]} key={index}>
        <p className={styles["webinar--title"]}>{webinar.title}</p>
        <div className={styles["webinar--details-container"]}>
          <p className={styles["webinar--desc-text"]}>Host: {webinar.host}</p>
          <p className={styles["webinar--desc-text"]}>Date: {webinar.date}</p>
          <p className={styles["webinar--desc-text"]}>Time: {webinar.time}</p>
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
