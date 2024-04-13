import React from "react";
import styles from "./styles.module.scss";
import profile from "./Images/profile.png";

export default function PurchasedPolicy() {
  const list = [
    {
      number: "LI-12345678",
      effective: "January 1, 2024",
      expiry: "January 1, 2054",
      amount: "50",
      term: "30",
    },
    {
      number: "LI-12345679",
      effective: "January 2, 2024",
      expiry: "January 2, 2054",
      amount: "50",
      term: "30",
    },
  ];
  return (
    <div className={styles["PurchasedPolicy-wrapper"]}>
      <div className={styles["PurchasedPolicy-wrapper-topbar"]}>
        <div className={styles["PurchasedPolicy-wrapper-topbar-div"]}>
          <div className={styles["PurchasedPolicy-wrapper-topbar-text"]}>
            Client Information
          </div>
          <div className={styles["PurchasedPolicy-wrapper-topbar-text"]}>
            Purchased Policies
          </div>
          <div className={styles["PurchasedPolicy-wrapper-topbar-text"]}>
            Financial Goals
          </div>
        </div>
        <div className={styles["PurchasedPolicy-wrapper-topbar-buttons"]}>
          <button
            className={styles["PurchasedPolicy-wrapper-topbar-buttons-save"]}
          >
            Save Changes
          </button>
          <button
            className={styles["PurchasedPolicy-wrapper-topbar-buttons-meet"]}
          >
            Organize Meet
          </button>
        </div>
      </div>
      <div className={styles["PurchasedPolicy-wrapper-main"]}>
        <div className={styles["PurchasedPolicy-wrapper-main-title"]}>
          Total number of policies purchased:{" "}
          <span className={styles["PurchasedPolicy-wrapper-main-text"]}>
            {list.length}
          </span>
        </div>
        {list.map((item) => (
          <div className={styles["PurchasedPolicy-wrapper-main-policy"]}>
            <div className={styles["PurchasedPolicy-wrapper-main-policy-type"]}>
              Term Life Insurance
            </div>
            <div className={styles["PurchasedPolicy-wrapper-main-policy-id"]}>
              <div
                className={styles["PurchasedPolicy-wrapper-main-policy-number"]}
              >
                Policy Number:{" "}
                <span
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-number-span"]
                  }
                >
                  {" "}
                  {item.number}{" "}
                </span>
              </div>
              <div
                className={
                  styles["PurchasedPolicy-wrapper-main-policy-effective"]
                }
              >
                Policy Effective Date:{" "}
                <span
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-effective-span"]
                  }
                >
                  {item.effective}
                </span>
              </div>
              <div
                className={
                  styles["PurchasedPolicy-wrapper-main-policy-premium"]
                }
              >
                Premium amount:{" "}
                <span
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-effective-span"]
                  }
                >
                  {" "}
                  ${item.amount} per month{" "}
                </span>
              </div>
            </div>
            <div className={styles["PurchasedPolicy-wrapper-main-policy-term"]}>
              <div
                className={
                  styles["PurchasedPolicy-wrapper-main-policy-term-duration"]
                }
              >
                Policy Term:{" "}
                <span
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-effective-span"]
                  }
                >
                  {item.term} years
                </span>
              </div>
              <div
                className={styles["PurchasedPolicy-wrapper-main-policy-expiry"]}
              >
                Policy Expiration Date:{" "}
                <span
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-effective-span"]
                  }
                >
                  {item.expiry}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
