import React, { useContext } from "react";
import styles from "./styles.module.scss";
import arrow_right from "./Images/arrow_right.png";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import menuIcon from "./Images/menu-icon.png";

export default function PurchasedPolicy() {
  const primaryData = useContext(PrimaryDataContext);
  const client = useOutletContext();
  const currentUser = useContext(AuthContext);
  const clientId = client?.clientData?.id;
  const salesData = primaryData?.sales;
  const filteredSales = salesData?.filter(
    (sales) => sales?.cid === clientId && sales?.uid === currentUser?.uid
  );
  console.log("This is the filtered sales data: ", filteredSales);
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
      <div className={styles["PurchasedPolicy-wrapper-main"]}>
        <div className={styles["PurchasedPolicy-wrapper-main-title"]}>
          Total number of policies purchased:{" "}
          <span className={styles["PurchasedPolicy-wrapper-main-text"]}>
            {filteredSales?.length}
          </span>
        </div>
        {filteredSales.map((item) => (
          <div className={styles["PurchasedPolicy-wrapper-main-policy"]}>
            <div className={styles["PurchasedPolicy-wrapper-main-policy-type"]}>
              {item?.policy_type}
              <button className={styles["purchasedPolicy--edit-button"]}>
                <img
                  src={menuIcon}
                  className={styles["purchasedPolicy--edit-icon"]}
                />
              </button>
              <div className={styles["purchasedPolicy--option-container"]}>
                View details
              </div>
            </div>
            <div className={styles["PurchasedPolicy-wrapper-main-policy-div"]}>
              <div className={styles["PurchasedPolicy-wrapper-main-policy-id"]}>
                <div
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-number"]
                  }
                >
                  Policy Number:{" "}
                  <span
                    className={
                      styles["PurchasedPolicy-wrapper-main-policy-number-span"]
                    }
                  >
                    {" "}
                    {item.policy_number}{" "}
                  </span>
                </div>
                <div
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-term-duration"]
                  }
                >
                  Policy Term:{" "}
                  <span
                    className={
                      styles[
                        "PurchasedPolicy-wrapper-main-policy-effective-span"
                      ]
                    }
                  >
                    {new Date(item?.effective_date).getFullYear() -
                      new Date(item?.end_date).getFullYear()}{" "}
                    years
                  </span>
                </div>
              </div>

              <div
                className={styles["PurchasedPolicy-wrapper-main-policy-term"]}
              >
                <div
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-effective"]
                  }
                >
                  Policy Effective Date:{" "}
                  <span
                    className={
                      styles[
                        "PurchasedPolicy-wrapper-main-policy-effective-span"
                      ]
                    }
                  >
                    {item.effective_date}
                  </span>
                </div>

                <div
                  className={
                    styles["PurchasedPolicy-wrapper-main-policy-expiry"]
                  }
                >
                  Policy Expiration Date:{" "}
                  <span
                    className={
                      styles[
                        "PurchasedPolicy-wrapper-main-policy-effective-span"
                      ]
                    }
                  >
                    {item.end_date}
                  </span>
                </div>
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
                  ${item.premium_account} per month{" "}
                </span>
              </div>
              <img
                src={arrow_right}
                height="24px"
                className={styles["PurchasedPolicy-wrapper-main-policy-image"]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
