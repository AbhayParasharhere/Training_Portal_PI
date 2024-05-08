import React from "react";
import styles from "./styles.module.scss";
import Product from "./Images/Product.png";

export default function ProductLinks() {
  const list = [
    {
      image: "Product.png",
      productName: "Marketing Wizard",
      productDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      productLink: "https://google.com",
    },
    {
      image: "Product.png",
      productName: "Sales Wizard",
      productDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      productLink: "https://google.com",
    },
    {
      image: "Product.png",
      productName: "Product Wizard",
      productDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      productLink: "https://google.com",
    },
  ];

  return (
    <div className={styles["ProductLinks-wrapper"]}>
      <div className={styles["ProductLinks-wrapper-main"]}>
        {list.map((item) => (
          <div className={styles["ProductLinks-wrapper-main-content"]}>
            <img
              src={Product}
              className={styles["ProductLinks-wrapper-main-content-img"]}
            />

            <div className={styles["ProductLinks-wrapper-main-content-div"]}>
              <div
                className={styles["ProductLinks-wrapper-main-content-div-name"]}
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
              <a href={item.productLink} style={{ textDecoration: "none" }}>
                <button
                  className={
                    styles["ProductLinks-wrapper-main-content-div-join"]
                  }
                >
                  Join
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
