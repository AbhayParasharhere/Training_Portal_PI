import React from "react";
import styles from "./styles.module.scss";

export default function ToolsTopbar(props) {
  return (
    <>
      <div className={styles["Tools-wrapper-topbar-div"]}>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("sales")}
          style={{
            color: props.documentType === "sales" ? "#123c97" : "#a1a1a1",
            borderColor: props.documentType === "sales" ? "#123c97" : "#a1a1a1",
          }}
        >
          Sales Resources
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("marketing")}
          style={{
            color: props.documentType === "marketing" ? "#123c97" : "#a1a1a1",
            borderColor:
              props.documentType === "marketing" ? "#123c97" : "#a1a1a1",
          }}
        >
          Marketing Resources
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("productLinks")}
          style={{
            color:
              props.documentType === "productLinks" ? "#123c97" : "#a1a1a1",
            borderColor:
              props.documentType === "productLinks" ? "#123c97" : "#a1a1a1",
          }}
        >
          Product Links
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("calculator")}
          style={{
            color: props.documentType === "calculator" ? "#123c97" : "#a1a1a1",
            borderColor:
              props.documentType === "calculator" ? "#123c97" : "#a1a1a1",
          }}
        >
          Finance Calculator
        </div>
      </div>
      <div className={styles["Tools-wrapper-topbar-div-mobile"]}>
        <div className={styles["Tools-wrapper-topbar-text"]}>Sales</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Marketing</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Product</div>
        <div className={styles["Tools-wrapper-topbar-text"]}>Calculator</div>
      </div>
    </>
  );
}
