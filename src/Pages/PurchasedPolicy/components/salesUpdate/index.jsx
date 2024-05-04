import React, { useState } from "react";
import styles from "./styles.module.scss";
import arrowUp from "../images/arrow-up.png";
import arrowDown from "../images/arrow-down.png";
import checkIcon from "../images/check.png";
import { useNavigate } from "react-router-dom";
import { updateSales } from "../../../../Firebase/updateSalesClients";
import { toast } from "react-toastify";

export default function SalesUpdate(props) {
  const selectedSale = props?.filteredSales?.filter(
    (sale) => sale.id === props?.salesUpdate?.id
  )[0];
  const [salesUpdateArrow, setSalesUpdateArrow] = useState(false);
  const [salesUpdateData, setSalesUpdateData] = useState({
    policy_type: selectedSale?.policy_type,
    policy_number: selectedSale?.policy_number,
    premium_account: selectedSale?.premium_account,
    effective_date: selectedSale?.effective_date,
    end_date: selectedSale?.end_date,
  });

  const inputData = [
    {
      text: "Policy Type",
      type: "dropdown",
      option: ["Insurance", "Loan", "Visa"],
      name: "policy_type",
      value: salesUpdateData?.policy_type,
    },
    {
      text: "Policy No.",
      type: "text",
      name: "policy_number",
      value: salesUpdateData?.policy_number,
    },
    {
      text: "Premium Account",
      name: "premium_account",

      type: "Text",
      value: salesUpdateData?.premium_account,
    },
    {
      text: "Effetive Date",
      type: "date",
      name: "effective_date",

      value: salesUpdateData?.effective_date,
    },
    {
      text: "End Date",
      type: "date",
      name: "end_date",
      value: salesUpdateData?.end_date,
    },
  ];

  const handleSalesDropdown = () => {
    setSalesUpdateArrow((prev) => !prev);
  };
  const handleDropdownValue = (option) => {
    setSalesUpdateData((prev) => {
      return { ...prev, policy_type: option };
    });
  };
  const handleSalesUpdateChange = (event) => {
    setSalesUpdateData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const handleSalesUpdate = async () => {
    try {
      await updateSales(salesUpdateData, props?.salesUpdate?.id);
      toast.success("Updated Successfully");
      props.setSalesUpdate({ status: false, id: "" });
    } catch (err) {
      toast.error("Failed to update");
    }
  };
  return (
    <div className={styles["salesUpdate--main-container"]}>
      <div className={styles["salesUpdate--input-container"]}>
        {inputData.map((input, index) => {
          if (input.type === "dropdown") {
            return (
              <div
                key={index}
                className={styles["salesUpdate--input-inner-container"]}
              >
                <p className={styles["salesUpdate--input-text"]}>
                  {input.text}
                </p>
                <div
                  className={styles["salesUpdate--input-dropdown"]}
                  onClick={handleSalesDropdown}
                >
                  {input.value}
                  <img
                    src={salesUpdateArrow ? arrowUp : arrowDown}
                    className={styles["salesUpdate--arrow-icon"]}
                  />
                  <div
                    className={styles["salesUpdate--dropdown-option-container"]}
                    style={{ display: salesUpdateArrow ? "flex" : "none" }}
                  >
                    {input.option.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={styles["salesUpdate--dropdown-options"]}
                          onClick={() => handleDropdownValue(item)}
                          style={{
                            backgroundColor:
                              input.value === item ? "#F9FAFB" : "white",
                          }}
                        >
                          {item}
                          <img
                            style={{
                              display: input.value === item ? "flex" : "none",
                            }}
                            src={checkIcon}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className={styles["salesUpdate--input-inner-container"]}>
              <p className={styles["salesUpdate--input-text"]}>{input.text}</p>
              <input
                type={input.type}
                className={styles["salesUpdate--input"]}
                value={input.value}
                onChange={handleSalesUpdateChange}
                name={input.name}
              />
            </div>
          );
        })}
      </div>
      <div className={styles["salesUpdate--button-container"]}>
        <button
          className={styles["salesUpdate--cancel-button"]}
          onClick={() => props.setSalesUpdate({ status: false, id: "" })}
        >
          Cancel
        </button>
        <button
          className={styles["salesUpdate--update-button"]}
          onClick={() => handleSalesUpdate()}
        >
          Update Changes
        </button>
      </div>
    </div>
  );
}
