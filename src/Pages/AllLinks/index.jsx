import React from "react";
import styles from "./styles.module.scss";

export default function AllLinks() {
  return (
    <div className={styles["allLinks--main-container"]}>
      <div className={styles["allLinks--link-container"]}>
        <p className={styles["allLinks--heading"]}>Heading 1</p>
        <div className={styles["allLinks--link-inner-container"]}>
          <p className={styles["allLinks--sub-heading"]}>Sub heading</p>
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>{" "}
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>{" "}
          <a
            className={styles["allLinks--link-text"]}
            href="http://www.labdrill.com"
            target="_blank"
          >
            http://www.labdrill.com
          </a>
        </div>
      </div>
    </div>
  );
}
