import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";
import clientImage from "./images/sample-client-avatar.png";
import checkIcon from "./images/check.png";
import { saveClientData } from "../../../../Firebase/addSalesClients";
import { AuthContext } from "../../../../context/authContext";
import { toast } from "react-toastify";

export default function ClientDetails(props) {
  const [arrowChange, setArrowChange] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [arrowChangeClientChoosing, setArrowChangeClientChoosing] =
    useState(false);
  const currentUser = useContext(AuthContext);

  const [dropdownValue, setDropdownValue] = useState();
  const [clientDetails, setClientDetails] = useState({
    client_gender: dropdownValue || "",
    client_name: "",
    client_address: "",
    client_number: "",
    client_DOB: "",
    client_anniversary: "",
    client_email: "",
  });
  const [clientDropdownValue, setClientDropdownValue] = useState("");

  const toggleArrowChange = () => {
    setArrowChange((prev) => !prev);
  };
  const toggleClientArrowChange = () => {
    setArrowChangeClientChoosing((prev) => !prev);
  };

  const handleDropdownValue = (value) => {
    setDropdownValue(value);
    setClientDetails({ ...clientDetails, client_gender: value });
    console.log(dropdownValue);
  };
  const handleClientDropdownValue = (img, text) => {
    setClientDropdownValue({ img: img, text: text });
  };
  const clientInputData = [
    {
      text: "Client Name",
      type: "text",
      height: 35,
      name: "client_name",
      required: true,
    },
    {
      text: "Choosing from existing client",
      type: "mobile",
      height: 35,
    },
    {
      text: "Gender",
      type: "dropdown",
      height: 35,
      name: "client_gender",
      required: true,
    },
    {
      text: "Email Address",
      type: "text",
      height: 35,
      name: "client_email",
      required: true,
    },
    {
      text: "Phone Number",
      type: "text",
      height: 35,
      name: "client_number",
      required: true,
    },
    {
      text: "Local Address",
      type: "text",
      height: 50,
      name: "client_address",
      required: true,
    },
    { text: "Date of Birth", type: "date", height: 35, name: "client_DOB" },
    {
      text: "Anniversary",
      type: "date",
      height: 35,
      name: "client_anniversary",
    },
    {
      text: "Client Image",
      type: "file",
      height: 35,
      name: "client_image",
    },
  ];
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleClientChange = (event) => {
    setClientDetails((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type === "file"
            ? event.target.files[0]
            : event.target.value,
      };
    });
    console.log(clientDetails);
  };

  const handleClientSubmit = async () => {
    try {
      if (
        clientDetails.client_name === "" ||
        clientDetails.client_gender === "" ||
        clientDetails.client_email === "" ||
        clientDetails.client_number === "" ||
        clientDetails.client_address === ""
      ) {
        toast.error("Fill the requirements");
        return;
      } else {
        if (!validateEmail(clientDetails.client_email)) {
          setErrorState({ input: "client_email", text: "Invalid Email" });
          toast.error("Invalid Email");
          return;
        }
      }
      if (clientDropdownValue) {
        console.log("There is a client selected");
      }
      const clientId = await saveClientData(clientDetails, currentUser?.uid);
      props.setDisplayComponent("sales");
      props.setClientId(clientId);
    } catch (err) {
      console.log(err);
    }
  };
  const renderClientInput = clientInputData.map((input, index) => {
    if (input.type === "dropdown") {
      return (
        <div
          className={styles["clientDetails--input-inner-container"]}
          key={index}
        >
          <p className={styles["clientDetails--input-text"]}>
            {input.text}{" "}
            {input.required && <span style={{ color: "red" }}>*</span>}
          </p>
          <div
            className={styles["clientDetails--input-dropdown"]}
            style={{
              height: input.height,
              border: arrowChange ? "1px solid #3064D4" : "1px solid #A1A1A1",
            }}
            onClick={toggleArrowChange}
          >
            {dropdownValue}
            <div
              className={styles["clientDetails--input-options-container"]}
              style={{
                display: arrowChange ? "flex" : "none",
              }}
            >
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Male")}
                style={{
                  backgroundColor:
                    dropdownValue === "Male" ? "#F9FAFB" : "white",
                }}
              >
                Male
                {dropdownValue === "Male" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Female")}
                style={{
                  backgroundColor:
                    dropdownValue === "Female" ? "#F9FAFB" : "white",
                }}
              >
                Female
                {dropdownValue === "Female" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() => handleDropdownValue("Other")}
                style={{
                  backgroundColor:
                    dropdownValue === "Other" ? "#F9FAFB" : "white",
                }}
              >
                Other
                {dropdownValue === "Other" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
            </div>
            <img
              src={arrowChange ? arrowUp : arrowDown}
              className={styles["clientDetails--input-arrow"]}
            />
          </div>
        </div>
      );
    } else if (input.type === "mobile") {
      return (
        <div className={styles["clientDetails--input-inner-container-mobile"]}>
          <p className={styles["clientDetails--or-text-mobile"]}>Or</p>
          <p className={styles["clientDetails--client-choosing-title"]}>
            Choose from existing clients
          </p>
          <div
            className={styles["clientDetails--client-choosing-dropdown"]}
            onClick={toggleClientArrowChange}
            style={{
              border: arrowChangeClientChoosing
                ? "1px solid #3064D4"
                : "1px solid #A1A1A1",
            }}
          >
            <img src={clientDropdownValue.img} />
            {clientDropdownValue.text}
            <div
              className={styles["clientDetails--input-options-container"]}
              style={{ display: arrowChangeClientChoosing ? "flex" : "none" }}
            >
              <div
                className={styles["clientDetails--input-options"]}
                onClick={() =>
                  handleClientDropdownValue(clientImage, "Client Name")
                }
                style={{
                  backgroundColor:
                    clientDropdownValue.text === "Client Name"
                      ? "#F9FAFB"
                      : "white",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={clientImage} />
                  Client Name
                </div>
                {clientDropdownValue.text === "Client Name" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
            </div>
            <img
              src={arrowChangeClientChoosing ? arrowUp : arrowDown}
              className={styles["clientDetails--input-arrow"]}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={styles["clientDetails--input-inner-container"]}>
        <p className={styles["clientDetails--input-text"]}>
          {input.text}{" "}
          {input.required && <span style={{ color: "red" }}>*</span>}
        </p>
        <input
          className={styles["clientDetails--input"]}
          style={{ height: input.height }}
          type={input.type}
          name={input.name}
          onChange={handleClientChange}
        />
        {errorState?.input === input.name && <p>{errorState.text}</p>}
      </div>
    );
  });
  return (
    <div
      className={styles["clientDetails--main-container"]}
      onClick={() => {
        if (arrowChange) {
          setArrowChange(false);
        }
        if (arrowChangeClientChoosing) {
          setArrowChangeClientChoosing(false);
        }
      }}
    >
      <p className={styles["clientDetails--navigation-text"]}>
        <span className={styles["blue"]}>Client details</span> {">"}{" "}
        <span
          className={styles["clientDetails--sales-navigate"]}
          onClick={() => props.setDisplayComponent("sales")}
        >
          Sales Details
        </span>
      </p>
      <div className={styles["clientDetails--inner-container"]}>
        <p className={styles["clientDetails--title-text"]}>Client Details</p>
        <div className={styles["clientDetails--input-choosing-container"]}>
          <div className={styles["clientDetails--input-container"]}>
            {renderClientInput}
            <button
              className={styles["clientDetails--next-button"]}
              onClick={handleClientSubmit}
            >
              Next
            </button>
          </div>
          <p className={styles["clientDetails--or-text"]}>Or</p>
          <div className={styles["clientDetails--client-choosing-container"]}>
            <p className={styles["clientDetails--client-choosing-title"]}>
              Choose from existing clients
            </p>
            <div
              className={styles["clientDetails--client-choosing-dropdown"]}
              onClick={toggleClientArrowChange}
              style={{
                border: arrowChangeClientChoosing
                  ? "1px solid #3064D4"
                  : "1px solid #A1A1A1",
              }}
            >
              <img src={clientDropdownValue.img} />
              {clientDropdownValue.text}
              <div
                className={styles["clientDetails--input-options-container"]}
                style={{ display: arrowChangeClientChoosing ? "flex" : "none" }}
              >
                <div
                  className={styles["clientDetails--input-options"]}
                  onClick={() =>
                    handleClientDropdownValue(clientImage, "Client Name")
                  }
                  style={{
                    backgroundColor:
                      clientDropdownValue.text === "Client Name"
                        ? "#F9FAFB"
                        : "white",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <img src={clientImage} />
                    Client Name
                  </div>
                  {clientDropdownValue.text === "Client Name" && (
                    <img
                      src={checkIcon}
                      className={styles["clientDetails--check-icon"]}
                    />
                  )}
                </div>
              </div>
              <img
                src={arrowChangeClientChoosing ? arrowUp : arrowDown}
                className={styles["clientDetails--input-arrow"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
