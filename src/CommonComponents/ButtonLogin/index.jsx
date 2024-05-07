import React from "react";
import styles from "./styles.module.scss";

export default function ButtonLogin(props) {
  return (
    <button className={styles["button"]} onClick={props?.onClick}>
      {props?.value}
    </button>
  );
}
