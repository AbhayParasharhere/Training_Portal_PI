import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import checkIcon from "./images/check.png";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";
import { toast } from "react-toastify";
import {
  saveSalesData,
  saveClientData,
} from "../../../../Firebase/addSalesClients";
import { AuthContext } from "../../../../context/authContext";

export default function SalesDetails(props) {
  const [errorState, setErrorState] = useState("");
  const [loading, setLoading] = useState("");
  const [changeSalesArrowPolicy, setChangeSalesArrowPolicy] = useState(false);
  const [changeSalesArrowChannel, setChangeSalesArrowChannel] = useState(false);

  const toggleArrowChangePolicy = () => {
    setChangeSalesArrowPolicy((prev) => !prev);
  };

  const toggleArrowChangeChannel = () => {
    setChangeSalesArrowChannel((prev) => !prev);
  };
  const handleDropdownChange = (inputName, value) => {
    props.setSalesDetailsData({
      ...props.salesDetailsData,
      [inputName]: value,
    });
    console.log(props.salesDetailsData);
  };
  const inputData = [
    { text: "Broker Name", type: "text", name: "broker_name" },
    { text: "Broker ID", type: "text", name: "broker_ID" },
    {
      text: "Policy Type",
      type: "dropdown",
      options: ["Insurance", "Loan"],
      arrowState: changeSalesArrowPolicy,
      function: toggleArrowChangePolicy,
      name: "policy_type",
    },
    {
      text: "Sales Channel",
      type: "dropdown",
      options: ["In-person", "Online", "Phone"],
      arrowState: changeSalesArrowChannel,
      function: toggleArrowChangeChannel,
      name: "sales_channel",
    },
    { text: "Policy No.", type: "text", name: "policy_number" },
    { text: "Premium Amount", type: "text", name: "premium_account" },
    { text: "Effective Date", type: "date", name: "effective_date" },
    { text: "End Date", type: "date", name: "end_date" },
    { text: "Commision Earned", type: "text", name: "commision_earned" },
  ];
  const currentUser = useContext(AuthContext);

  const handleChange = (event) => {
    console.log(props.salesDetailsData);
    props.setSalesDetailsData({
      ...props.salesDetailsData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSalesSubmit = async () => {
    try {
      if (
        props.salesDetailsData.broker_name === "" ||
        props.salesDetailsData.broker_ID === "" ||
        props.salesDetailsData.policy_type === "" ||
        props.salesDetailsData.sales_channel === "" ||
        props.salesDetailsData.policy_number === "" ||
        props.salesDetailsData.effective_date === "" ||
        props.salesDetailsData.end_date === "" ||
        props.salesDetailsData.commision_earned === ""
      ) {
        toast.error("Fill the requirements");
        return;
      }
      if (
        props.salesDetailsData.effective_date > props.salesDetailsData.end_date
      ) {
        toast.error("End date of policy cannot be less than effective date");
        return;
      }
      if (props.clientId === "") {
        console.log("No client added");
        setLoading(true);
        const clientId = await saveClientData(
          props.clientDetails,
          currentUser?.uid
        );
        console.log("Client added sucessfully");
        await saveSalesData(props.salesDetailsData, clientId, currentUser?.uid);
        console.log("Sales added sucessfully");
        toast.success("Details Saved");
        props.setClientId("");
        props.setSalesDetailsData({
          broker_name: "",
          broker_ID: "",
          policy_type: "",
          sales_channel: "",
          policy_number: "",
          premium_account: "",
          effective_date: "",
          end_date: "",
          commision_earned: "",
        });
        props.setClientDetails({
          client_gender: "",
          client_name: "",
          client_address: "",
          client_number: "",
          client_DOB: "",
          client_anniversary: "",
          client_email: "",
        });
        props.setDropdownValue();
        props.setDisplayComponent("client");
        setLoading(false);

        return;
      }
      setLoading(true);
      const salesResponse = await saveSalesData(
        props.salesDetailsData,
        props.clientId,
        currentUser?.uid
      );
      props.setClientId("");
      props.setSalesDetailsData({
        broker_name: "",
        broker_ID: "",
        policy_type: "",
        sales_channel: "",
        policy_number: "",
        premium_account: "",
        effective_date: "",
        end_date: "",
        commision_earned: "",
      });
      props.setClientDetails({
        client_gender: "",
        client_name: "",
        client_address: "",
        client_number: "",
        client_DOB: "",
        client_anniversary: "",
        client_email: "",
      });
      props.setDropdownValue();
      props.setClientDropdownValue("");
      toast.success("Details Saved");
      props.setDisplayComponent("client");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const renderSalesInput = inputData.map((input, index) => {
    if (input.type === "dropdown") {
      return (
        <div
          className={styles["salesDetails--inner-input-container"]}
          key={index}
        >
          <p className={styles["salesDetails--input-text"]}>
            {input.text}
            <span style={{ color: "red" }}>*</span>
          </p>
          <div
            className={styles["salesDetails--input-dropdown"]}
            onClick={input.function}
            style={{ border: input.arrowState && "1px solid #3064D4" }}
          >
            {props.salesDetailsData[input.name]}
            <div
              className={styles["salesDetails--input-drodown-option-container"]}
              style={{ display: input.arrowState ? "flex" : "none" }}
            >
              {input.options.map((option) => {
                return (
                  <div
                    className={styles["salesDetails--dropdown-options"]}
                    onClick={() => handleDropdownChange(input.name, option)}
                    style={{
                      backgroundColor:
                        props.salesDetailsData[input.name] === option
                          ? "#F9FAFB"
                          : "white",
                    }}
                  >
                    {option}
                    {props.salesDetailsData[input.name] === option && (
                      <img
                        src={checkIcon}
                        className={styles["clientDetails--check-icon"]}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <img
              src={input.arrowState ? arrowUp : arrowDown}
              className={styles["salesDetails--input-arrow"]}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={styles["salesDetails--inner-input-container"]}
        key={index}
      >
        <p className={styles["salesDetails--input-text"]}>
          {input.text} <span style={{ color: "red" }}>*</span>
        </p>
        <input
          name={input.name}
          className={styles["salesDetails--input"]}
          type={input.type}
          onChange={handleChange}
          value={props.salesDetailsData[input.name]}
        />
      </div>
    );
  });
  return (
    <div
      className={styles["salesDetails--main-container"]}
      onClick={() => {
        if (changeSalesArrowChannel) {
          setChangeSalesArrowChannel(false);
        }
        if (changeSalesArrowPolicy) {
          setChangeSalesArrowPolicy(false);
        }
      }}
    >
      <p
        className={styles["clientDetails--navigation-text"]}
        style={{ cursor: "pointer" }}
        onClick={() => props.setDisplayComponent("client")}
      >
        Client details {">"}
        <span className={styles["blue"]} style={{ cursor: "pointer" }}>
          {" "}
          Sales Details
        </span>
      </p>{" "}
      <div className={styles["salesDetails--inner-container"]}>
        <p className={styles["salesDetails--title-text"]}>Sales Details</p>
        <div className={styles["salesDetails--input-main-container"]}>
          {renderSalesInput}
          {errorState && (
            <p className={styles["clientDetails--error-text"]}>
              {errorState.text}
            </p>
          )}
          <button
            className={styles["salesDetails--save-button"]}
            onClick={handleSalesSubmit}
          >
            {loading ? "Loading.." : "Save Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
