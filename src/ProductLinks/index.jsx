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
      <div className={styles["ProductLinks-wrapper"]}>
        <ToolsTopbar />
        <div className={styles["ProductLinks-wrapper-main"]}>
          {list.map((item) => (
            <div className={styles["ProductLinks-wrapper-main-content"]}>
              <img
                src={Product}
                className={styles["ProductLinks-wrapper-main-content-img"]}
              />

              <div className={styles["ProductLinks-wrapper-main-content-div"]}>
                <div
                  className={
                    styles["ProductLinks-wrapper-main-content-div-name"]
                  }
                >
                  {item.productName}
                </div>
                <div
                  className={
                    styles["ProductLinks-wrapper-main-content-div-description"]
                  }
                >
                  {item.productDescription}
                </div>
                <button
                  className={
                    styles["ProductLinks-wrapper-main-content-div-join"]
                  }
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
