// DashboardAnimation.js
import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss"; // Assuming you have your CSS in a separate file
import rectangleHorizontal from "./images/rectangle-horizontal.png";
import rectangleVertical from "./images/reactangle-vertical.png";

const DashboardAnimation = ({ children }) => {
  const interBubbleRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    const move = () => {
      setCurX((prevX) => prevX + (tgX - prevX) / 20);
      setCurY((prevY) => prevY + (tgY - prevY) / 20);
      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event) => {
      setTgX(event.clientX);
      setTgY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tgX, tgY]); // Only include tgX and tgY as dependencies

  return (
    <div className={styles["gradient-bg"]}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles["gradients-container"]}>
        <div className={styles["g1"]}></div>
        <div className={styles["g2"]}></div>
        <div className={styles["g3"]}></div>
        <div className={styles["g4"]}></div>
        <div className={styles["g5"]}></div>
        <div ref={interBubbleRef} className={styles["interactive"]}></div>
      </div>
      {/*The code for the animation ends here */}
      <div className={styles["dashpreview--main-container"]}>
        <img
          src={rectangleHorizontal}
          className={styles["dashpreview--rectangle-left-middle"]}
        />
        <img
          src={rectangleVertical}
          className={styles["dashpreview--rectangle-left-top"]}
        />
        <img
          src={rectangleVertical}
          className={styles["dashpreview--rectangle-right-top"]}
        />
        <img
          src={rectangleHorizontal}
          className={styles["dashpreview--rectangle-right-middle"]}
        />
        <img
          src={rectangleHorizontal}
          className={styles["dashpreview--rectangle-right-bottom"]}
        />
        Everything at one place{" "}
        <div className={styles["dashpreview--image-container"]}>
          <div className={styles["dashpreview--features-exlpore"]}>
            EXPLORE FEATURES
          </div>
          <div className={styles["dashpreview--features-track"]}>
            TRACK PROGRESS
          </div>
          <div className={styles["dashpreview--features-update"]}>
            STAY UPDATED
          </div>
          <div className={styles["dashpreview--image"]}></div>
        </div>
      </div>{" "}
    </div>
  );
};

export default DashboardAnimation;
