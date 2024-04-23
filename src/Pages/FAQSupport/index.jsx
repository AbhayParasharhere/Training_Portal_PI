import React from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import questionIcon from "./images/FAQ-icon.png";

export default function FAQSupport() {
  const questionData = [
    {
      icon: questionIcon,
      question:
        " Can I track my progress and performance on the extranet platform",
      answer:
        "Yes, you can track your progress and performance by accessing the dashboard. Here, you'll find metrics such as completed courses,sales done weekly and new clients added. Use this information to monitor your development and identify areas for improvement.",
    },
    {
      icon: questionIcon,
      question:
        " Can I track my progress and performance on the extranet platform",
      answer:
        "Yes, you can track your progress and performance by accessing the dashboard. Here, you'll find metrics such as completed courses,sales done weekly and new clients added. Use this information to monitor your development and identify areas for improvement.",
    },
    {
      icon: questionIcon,
      question:
        " Can I track my progress and performance on the extranet platform",
      answer:
        "Yes, you can track your progress and performance by accessing the dashboard. Here, you'll find metrics such as completed courses,sales done weekly and new clients added. Use this information to monitor your development and identify areas for improvement.",
    },
    {
      icon: questionIcon,
      question:
        " Can I track my progress and performance on the extranet platform",
      answer:
        "Yes, you can track your progress and performance by accessing the dashboard. Here, you'll find metrics such as completed courses,sales done weekly and new clients added. Use this information to monitor your development and identify areas for improvement.",
    },
    {
      icon: questionIcon,
      question:
        " Can I track my progress and performance on the extranet platform",
      answer:
        "Yes, you can track your progress and performance by accessing the dashboard. Here, you'll find metrics such as completed courses,sales done weekly and new clients added. Use this information to monitor your development and identify areas for improvement.",
    },
  ];
  const renderQuestions = questionData.map((question) => {
    return (
      <div className={styles["FAQ--question-container"]}>
        <img src={question.icon} className={styles["FAQ--question-icon"]} />
        <p className={styles["FAQ--question-text"]}>{question.question} </p>
        <p className={styles["FAQ--answer-text"]}>{question.answer}</p>
      </div>
    );
  });
  return (
    <div className={styles["FAQ--main-container"]}>
      <div className={styles["FAQ--title-search-container"]}>
        <p className={styles["FAQ--title"]}>
          Have Questions? We Are Here To Help
        </p>
        <input
          className={styles["FAQ--search-input"]}
          placeholder="Search your doubts"
        />
        <img src={searchIcon} className={styles["FAQ--search-icon"]} />
      </div>
      <div className={styles["FAQ--question-grid"]}>{renderQuestions}</div>
      <div className={styles["FAQ--get-support-container"]}>
        <p className={styles["FAQ--get-support-heading"]}>
          Still have questions?
        </p>
        <p className={styles["FAQ--get-support-desc"]}>
          Can’t find the answer you’re looking for? Please chat to our friendly
          team.
        </p>
        <button className={styles["FAQ--support-button"]}>Get in touch</button>
      </div>
    </div>
  );
}
