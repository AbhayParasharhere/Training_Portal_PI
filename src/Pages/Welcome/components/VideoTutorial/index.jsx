import React from "react";
import styles from "./styles.module.scss";
import cameraIcon from "./images/camera-icon.png";
import batteryIcon from "./images/battery-icon.png";
import circleIcon from "./images/circle-icon.png";
import commentIcon from "./images/comment-icon.png";

export default function VideoTutorial() {
  console.log(
    ReactPlayer.canPlay(
      "https://firebasestorage.googleapis.com/v0/b/trainingportalpi.appspot.com/o/courseVideos%2FGolden%20rule%20in%20Finance%2Bf7432a38-0ecf-4ef8-b596-ee6601acb0f7%2B3b87f1cf-07ee-4b6b-b6e4-6bed77ffc025%2B1712954519526?alt=media&token=546c8c16-cf46-455b-8731-e7e8781bf45e"
    )
  );

  const advantageBlockData = [
    {
      icon: cameraIcon,
      title: "Data Analytics",
      desc: "Gain insights about your performance and track  your sales progress easily.",
    },
    {
      icon: batteryIcon,
      title: "Regulatory Updates",
      desc: "Ensure compliance with real-time regulatory alerts.",
    },
    {
      icon: circleIcon,
      title: "Intuitive Design",
      desc: "Navigate through an intuitive dashboard designed for optimal efficiency.",
    },
    {
      icon: commentIcon,
      title: "Continuous Learning",
      desc: "Stay updated with training modules and market insights for continuous growth.",
    },
  ];
  const advantageBlock = advantageBlockData.map((advantage) => {
    return (
      <div className={styles["videoT--advantage-block"]}>
        <img
          src={advantage.icon}
          className={styles["videoT--advantage-icon"]}
        />
        <p className={styles["videoT--advantage-title-text"]}>
          {advantage.title}
        </p>
        <p className={styles["videoT--advantage-desc-text"]}>
          {advantage.desc}
        </p>
      </div>
    );
  });

  return (
    <div className={styles["videoT--main-container"]}>
      <div className={styles["videoT--title-video-container"]}>
        <div className={styles["videoT--title-container"]}>
          Getting Started is Easy
          <button className={styles["videoT--action-button"]}>
            See it in Action
          </button>
        </div>
        <div className={styles["videoT--video-container"]}>
          <video className={styles["videoT--tutorial-video"]} controls>
            <source
              src={
                "https://firebasestorage.googleapis.com/v0/b/trainingportalpi.appspot.com/o/courseVideos%2FGolden%20rule%20in%20Finance%2Bf7432a38-0ecf-4ef8-b596-ee6601acb0f7%2B3b87f1cf-07ee-4b6b-b6e4-6bed77ffc025%2B1712954519526?alt=media&token=546c8c16-cf46-455b-8731-e7e8781bf45e"
              }
            />
          </video>
        </div>
      </div>
      <div className={styles["videoT--advantage-container"]}>
        <div className={styles["videoT--advantage-inner-container"]}>
          {advantageBlock}
        </div>
      </div>
    </div>
  );
}
