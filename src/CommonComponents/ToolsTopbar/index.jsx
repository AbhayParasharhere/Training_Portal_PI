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
            color: props.documentType === "sales" ? "#212529" : "#a1a1a1",
            borderColor: props.documentType === "sales" ? "#212529" : "#a1a1a1",
          }}
        >
          Sales Resources
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("marketing")}
          style={{
            color: props.documentType === "marketing" ? "#212529" : "#a1a1a1",
            borderColor:
              props.documentType === "marketing" ? "#212529" : "#a1a1a1",
          }}
        >
          Marketing Resources
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("productLinks")}
          style={{
            color:
              props.documentType === "productLinks" ? "#212529" : "#a1a1a1",
            borderColor:
              props.documentType === "productLinks" ? "#212529" : "#a1a1a1",
          }}
        >
          Product Links
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("calculator")}
          style={{
            color: props.documentType === "calculator" ? "#212529" : "#a1a1a1",
            borderColor:
              props.documentType === "calculator" ? "#212529" : "#a1a1a1",
          }}
        >
          Finance Calculator
        </div>
      </div>
      <div className={styles["Tools-wrapper-topbar-div-mobile"]}>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("sales")}
          style={{
            color: props.documentType === "sales" ? "#212529" : "#a1a1a1",
            borderColor: props.documentType === "sales" ? "#212529" : "#a1a1a1",
          }}
        >
          Sales
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("marketing")}
          style={{
            color: props.documentType === "marketing" ? "#212529" : "#a1a1a1",
            borderColor:
              props.documentType === "marketing" ? "#212529" : "#a1a1a1",
          }}
        >
          Marketing
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          style={{
            color:
              props.documentType === "productLinks" ? "#212529" : "#a1a1a1",
            borderColor:
              props.documentType === "productLinks" ? "#212529" : "#a1a1a1",
          }}
          onClick={() => props.setDocumentType("productLinks")}
        >
          Product
        </div>
        <div
          className={styles["Tools-wrapper-topbar-text"]}
          onClick={() => props.setDocumentType("calculator")}
          style={{
            color: props.documentType === "calculator" ? "#212529" : "#a1a1a1",
            borderColor:
              props.documentType === "calculator" ? "#212529" : "#a1a1a1",
          }}
        >
          Calculator
        </div>
      </div>
    </>
  );
}
