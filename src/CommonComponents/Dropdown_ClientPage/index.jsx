import React from "react";
import styles from "./styles.module.scss";
import arrowUp from "./images/arrow-up.png";
import arrowDown from "./images/arrow-down.png";

export default function Dropdown_ClientPage(props) {
  return (
    <div
      style={{ width: props.width, height: props.height }}
      className={styles["dropdown--main-container"]}
      onClick={() => props.setArrowState((prev) => !prev)}
    >
      <p>{props.filter.value ? props.filter.option : "Search by filter"}</p>
      <img
        className={styles["dropdown--arrow-icon"]}
        src={props.arrowState ? arrowUp : arrowDown}
      />
      <div
        className={styles["dropdown--options-container"]}
        style={{ display: props.arrowState ? "block" : "none" }}
      >
        {props.options.map((option) => {
          return (
            <div
              onClick={() =>
                props.setFilter({ option: option.text, value: option.value })
              }
              className={styles["dropdown--options"]}
              style={{
                backgroundColor:
                  props.filter.value === option.value ? "#F0F7FF" : "white",
              }}
            >
              {option.text}
            </div>
          );
        })}
        {/* <div className={styles["dropdown--options"]}>All</div>
          <div className={styles["dropdown--options"]}>Technical Support</div> */}
      </div>
    </div>
  );
}
