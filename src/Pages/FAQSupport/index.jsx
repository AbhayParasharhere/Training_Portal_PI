import React, { useState } from "react";
import styles from "./styles.module.scss";
import searchIcon from "./images/search-icon.png";
import questionIcon from "./images/FAQ-icon.png";

export default function FAQSupport() {
  const initialQuestionData = [
    {
      icon: questionIcon,
      question:
        " Can I track my progress and performance on the extranet platform",
      answer:
        "Yes, you can track your progress and performance by accessing the dashboard. Here, you'll find metrics such as completed courses,sales done weekly and new clients added. Use this information to monitor your development and identify areas for improvement.",
    },
    {
      icon: questionIcon,
      question: "How do I access the courses on the extranet platform?",
      answer:
        "To access the courses on the extranet platform, you need to log in to your account. Once you're logged in, you'll be able to view all the available courses and enroll in the ones that interest you.",
    },
    {
      icon: questionIcon,
      question: "What if I have technical issues while accessing the courses?",
      answer:
        "If you encounter any technical issues while accessing the courses, please reach out to our support team. They will help you resolve the issue and ensure that you can continue your learning journey without any interruptions.",
    },
    {
      icon: questionIcon,
      question: "Can I access the courses on my mobile device?",
      answer:
        "Yes, you can access the courses on your mobile device. The extranet platform is mobile-friendly and can be accessed from any device with an internet connection. This allows you to learn on the go and access the courses at your convenience.",
    },
  ];
  const [questionData, setQuestionData] = useState(initialQuestionData);
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") return setQuestionData(initialQuestionData);
    const filteredQuestions = initialQuestionData?.filter((question) => {
      return question.question.toLowerCase().includes(value.toLowerCase());
    });
    setQuestionData(filteredQuestions);
  };

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
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
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
