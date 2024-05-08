import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import arrow_right from "./Images/arrow_right.png";
import { PrimaryDataContext } from "../../context/primaryDataContext";
import { useOutletContext } from "react-router-dom";
import menuIcon from "./Images/menu-icon.png";
import searchIcon from "./Images/search-icon.png";
import editIcon from "./Images/edit-icon.png";
import deleteIcon from "./Images/delete-icon.png";
import { updateSales } from "../../Firebase/updateSalesClients";

export default function PurchasedPolicy() {
  const primaryData = useContext(PrimaryDataContext);
  const clientSales = useOutletContext();
  const clientId = clientSales?.clientData?.id;

  const filteredSales = clientSales?.filteredSales;
  console.log("This is the filtered sales data: ", filteredSales);

  const [displaySalesOption, setDisplayOptionContainer] = useState();

  const handleSalesOption = (salesId) => {
    if (displaySalesOption === salesId) {
      // const newOptions = displaySalesOption.filter(
      //   (option) => option !== salesId
      // );
      setDisplayOptionContainer("");
      console.log("removed: ", salesId);
      return;
    } else {
      setDisplayOptionContainer(salesId);
    }
  };

  return (
    <div className={styles["PurchasedPolicy-wrapper"]}>
      <div
        className={styles["PurchasedPolicy-wrapper-main"]}
        onClick={() => {
          console.log("This ran: ");
          if (displaySalesOption) setDisplayOptionContainer("");
        }}
      >
        <div className={styles["PurchasedPolicy-wrapper-main-title"]}>
          Total number of policies purchased:{" "}
          <span className={styles["PurchasedPolicy-wrapper-main-text"]}>
            {filteredSales?.length}
          </span>
        </div>
        {filteredSales?.map((item) => (
          <div
            className={styles["PurchasedPolicy-wrapper-main-policy"]}
            key={item.id}
          >
            <div className={styles["PurchasedPolicy-wrapper-main-policy-type"]}>
              {item?.policy_type}
              <button
                className={styles["purchasedPolicy--edit-button"]}
                onClick={() => handleSalesOption(item.id)}
              >
                <img
                  src={menuIcon}
                  className={styles["purchasedPolicy--edit-icon"]}
                />
              </button>
              <div
                style={{
                  display: displaySalesOption === item.id ? "flex" : "none",
                }}
                className={styles["purchasedPolicy--option-container"]}
              >
                <div
                  className={styles["purchasedPolicy--option-inner-container"]}
                  onClick={() =>
                    clientSales?.setSalesUpdate({ status: true, id: item.id })
                  }
                >
                  <img
                    src={searchIcon}
                    className={styles["purchasedPolicy--option-icon"]}
                  />
                  View details
                </div>
                <div
                  className={styles["purchasedPolicy--option-inner-container"]}
                  onClick={() =>
                    clientSales?.setSalesUpdate({ status: true, id: item.id })
                  }
                >
                  <img
                    src={editIcon}
                    className={styles["purchasedPolicy--option-icon"]}
                  />
                  Edit
                </div>
                <div
                  className={styles["purchasedPolicy--option-inner-container"]}
                  style={{ color: "#DA1212" }}
                >
                  <img
                    src={deleteIcon}
                    className={styles["purchasedPolicy--option-icon"]}
                    onClick={() => updateSales({ status: "deleted" }, item?.id)}
                  />
                  Delete
                </div>
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
