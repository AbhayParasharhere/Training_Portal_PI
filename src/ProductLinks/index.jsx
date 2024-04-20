import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "../CommonComponents/Sidebar";
import ToolsTopbar from "../CommonComponents/ToolsTopbar";
import Product from "./Images/Product.png";

export default function ProductLinks() {
  const list = [
    {
      image: "Product.png",
      productName: "Name of product",
      productDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  return (
    <div className={styles["Tools-main"]}>
      <Sidebar />
      <div className={styles["ClientInfo-wrapper"]}>
        <ToolsTopbar />
        <div className={styles["ClientInfo-wrapper-main"]}>
          {list.map((item) => (
            <div className={styles["ClientInfo-wrapper-main"]}>
              <div className={styles["ClientInfo-wrapper-main-content"]}>
                <div className={styles["ClientInfo-wrapper-main-content-div"]}>
                  <div
                    className={styles["ClientInfo-wrapper-main-content-image"]}
                  >
                    <img src={Group} height="28px" />
                  </div>
                  <div
                    className={styles["ClientInfo-wrapper-main-content-file"]}
                  >
                    {item.filename}
                  </div>
                </div>
                <img src={arrow_right} height="28px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
