import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import arrowDown from "./images/arrow-down.png";
import arrowUp from "./images/arrow-up.png";
import clientImage from "./images/sample-client-avatar.png";
import checkIcon from "./images/check.png";
import { saveClientData } from "../../../../Firebase/addSalesClients";
import { AuthContext } from "../../../../context/authContext";
import { toast } from "react-toastify";
import { PrimaryDataContext } from "../../../../context/primaryDataContext";

export default function ClientDetails(props) {
  const [arrowChange, setArrowChange] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [arrowChangeClientChoosing, setArrowChangeClientChoosing] =
    useState(false);
  const currentUser = useContext(AuthContext);
  const primaryData = useContext(PrimaryDataContext);
  console.log("Primary Data In addingg sales", primaryData);
  const allClients = primaryData?.clients;

  // const sampleClientData = [
  //   {
  //     client_gender: "Male",
  //     client_id: "1234567",
  //     client_name: "Abhi Parashar",
  //     client_address: "11/27 a-2 Sanjay colony tajganj agra",
  //     client_number: "7300748822",
  //     client_DOB: "10-12-2006",
  //     client_anniversary: "NA",
  //     client_email: "abhiparasharr@gmail.com",
  //     img: clientImage,
  //   },
  //   {
  //     client_gender: "Female",
  //     client_id: "89010",
  //     client_name: "Abhay Parashar",
  //     client_address: "11/27 a-2 Sanjay colony tajganj agra",
  //     client_number: "7300748822",
  //     client_DOB: "10-12-2006",
  //     client_anniversary: "NA",
  //     client_email: "abhayparasharr@gmail.com",
  //     img: clientImage,
  //   },
  //   {
  //     client_gender: "Other",
  //     client_id: "56789",
  //     client_name: "Sample client",
  //     client_address: "11/27 a-2 Sanjay colony tajganj agra",
  //     client_number: "7300748822",
  //     client_DOB: "10-12-2006",
  //     client_anniversary: "NA",
  //     client_email: "sample@gmail.com",
  //     img: clientImage,
  //   },
  // ];

  const toggleArrowChange = () => {
    setArrowChange((prev) => !prev);
  };
  const toggleClientArrowChange = () => {
    setArrowChangeClientChoosing((prev) => !prev);
  };

  const handleDropdownValue = (value) => {
    props.setDropdownValue(value);
    props.setClientDetails({ ...props.clientDetails, client_gender: value });
    console.log(props.dropdownValue);
  };
  const handleClientDropdownValue = (img, text, id) => {
    props.setClientDropdownValue({ img: img, text: text });
    const selectedClient = allClients?.filter((client) => {
      return client.id === id;
    });
    console.log("This is the selected client: ", selectedClient);
    props.setClientDetails({
      client_name: selectedClient[0].name,
      client_gender: selectedClient[0].gender,
      client_email: selectedClient[0].email,
      client_DOB: selectedClient[0].DOB,
      client_address: selectedClient[0].address,
      client_anniversary: selectedClient[0].anniversary,
      client_id: selectedClient[0].id,
      client_number: selectedClient[0].phone_number,
    });
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
  ];

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleClientChange = (event) => {
    props.setClientDetails((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type === "file"
            ? event.target.files[0]
            : event.target.value,
      };
    });
    console.log(props.clientDetails);
  };

  const handleClientSubmit = async () => {
    try {
      if (
        props.clientDetails.client_name === "" ||
        props.clientDetails.client_gender === "" ||
        props.clientDetails.client_email === "" ||
        props.clientDetails.client_number === "" ||
        props.clientDetails.client_address === ""
      ) {
        toast.error("Fill the requirements");
        return;
      } else {
        if (!validateEmail(props.clientDetails.client_email)) {
          setErrorState({
            input: "client_email",
            text: "Invalid email format. Please enter a valid email address.",
          });
          toast.error("Invalid email format.");
          return;
        } else if (props.clientDetails.client_number.length !== 10) {
          setErrorState({
            input: "client_number",
            text: "Invalid phone number. Please enter a 10 digit number",
          });
          toast.error("Invalid phone number format.");
          return;
        }
      }
      if (props.clientDropdownValue) {
        props.setDisplayComponent("sales");
        props.setClientId(props.clientDetails.client_id);
        return;
      }
      props.setDisplayComponent("sales");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigationCheck = () => {
    //To secure the use of navigation without filling form
    if (
      props.clientDetails.client_name === "" ||
      props.clientDetails.client_gender === "" ||
      props.clientDetails.client_email === "" ||
      props.clientDetails.client_number === "" ||
      props.clientDetails.client_address === ""
    ) {
      toast.error("Fill the requirements");
      return;
    } else {
      if (!validateEmail(props.clientDetails.client_email)) {
        setErrorState({
          input: "client_email",
          text: "Invalid email format. Please enter a valid email address.",
        });
        toast.error("Invalid email format.");
        return;
      } else if (props.clientDetails.client_number.length !== 10) {
        setErrorState({
          input: "client_number",
          text: "Invalid phone number. Please enter a 10 digit number",
        });
        toast.error("Invalid phone number format.");
        return;
      }
    }
    props.setDisplayComponent("sales");
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
          {props.clientDropdownValue ? (
            props.clientDetails[input.name]
          ) : (
            <div
              className={styles["clientDetails--input-dropdown"]}
              style={{
                height: input.height,
                border: arrowChange ? "1px solid #3064D4" : "1px solid #A1A1A1",
              }}
              onClick={toggleArrowChange}
            >
              {props.dropdownValue}
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
                      props.dropdownValue === "Male" ? "#F9FAFB" : "white",
                  }}
                >
                  Male
                  {props.dropdownValue === "Male" && (
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
                      props.sdropdownValue === "Female" ? "#F9FAFB" : "white",
                  }}
                >
                  Female
                  {props.dropdownValue === "Female" && (
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
                      props.dropdownValue === "Other" ? "#F9FAFB" : "white",
                  }}
                >
                  Other
                  {props.dropdownValue === "Other" && (
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
          )}
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
            <img src={props.clientDropdownValue.img} />
            {props.clientDropdownValue === ""
              ? "None"
              : props.clientDropdownValue.text}
            <div
              className={styles["clientDetails--input-options-container"]}
              style={{ display: arrowChangeClientChoosing ? "flex" : "none" }}
            >
              <div
                className={styles["clientDetails--input-options"]}
                style={{
                  backgroundColor:
                    props.clientDropdownValue === "" ? "#F9FAFB" : "white",
                }}
                onClick={() => {
                  props.setClientDropdownValue("");
                  props.setClientDetails({
                    client_gender: dropdownValue || "",
                    client_name: "",
                    client_address: "",
                    client_number: "",
                    client_DOB: "",
                    client_anniversary: "",
                    client_email: "",
                  });
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingLeft: 35,
                  }}
                >
                  None
                </div>
                {props.clientDropdownValue === "" && (
                  <img
                    src={checkIcon}
                    className={styles["clientDetails--check-icon"]}
                  />
                )}
              </div>
              {allClients?.map((client) => {
                return (
                  <div
                    className={styles["clientDetails--input-options"]}
                    onClick={() =>
                      handleClientDropdownValue(
                        client.img || clientImage,
                        client.name,
                        client.id
                      )
                    }
                    style={{
                      backgroundColor:
                        props.clientDropdownValue.text === client.name
                          ? "#F9FAFB"
                          : "white",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <img src={client.img || clientImage} />
                      {client.name}
                    </div>
                    {props.clientDropdownValue.text === client.name && (
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
        {props.clientDropdownValue ? (
          <div style={{ width: 200 }}>{props.clientDetails[input.name]}</div>
        ) : (
          <input
            className={styles["clientDetails--input"]}
            style={{
              height: input.height,
              border:
                errorState.input === input.name
                  ? "1px solid #FF5050"
                  : "1px solid #a1a1a1",
              backgroundColor:
                errorState.input === input.name ? "#FB717136" : "white",
            }}
            value={props.clientDetails[input.name]}
            type={input.type}
            name={input.name}
            onChange={handleClientChange}
          />
        )}
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
          onClick={() => handleNavigationCheck()}
        >
          Sales Details
        </span>
      </p>
      <div className={styles["clientDetails--inner-container"]}>
        <p className={styles["clientDetails--title-text"]}>Client Details</p>
        <div className={styles["clientDetails--input-choosing-container"]}>
          <div className={styles["clientDetails--input-container"]}>
            {renderClientInput}
            {errorState && (
              <p className={styles["clientDetails--error-text"]}>
                {errorState.text}
              </p>
            )}
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
              <img src={props.clientDropdownValue.img} />
              {props.clientDropdownValue
                ? props.clientDropdownValue.text
                : "None"}
              <div
                className={styles["clientDetails--input-options-container"]}
                style={{ display: arrowChangeClientChoosing ? "flex" : "none" }}
              >
                <div
                  className={styles["clientDetails--input-options"]}
                  style={{
                    backgroundColor:
                      props.clientDropdownValue === "" ? "#F9FAFB" : "white",
                  }}
                  onClick={() => {
                    props.setClientDropdownValue("");
                    props.setClientDetails({
                      client_gender: props.dropdownValue || "",
                      client_name: "",
                      client_address: "",
                      client_number: "",
                      client_DOB: "",
                      client_anniversary: "",
                      client_email: "",
                    });
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      paddingLeft: 35,
                    }}
                  >
                    None
                  </div>
                  {props.clientDropdownValue === "" && (
                    <img
                      src={checkIcon}
                      className={styles["clientDetails--check-icon"]}
                    />
                  )}
                </div>
                {allClients?.map((client) => {
                  return (
                    <div
                      className={styles["clientDetails--input-options"]}
                      onClick={() =>
                        handleClientDropdownValue(
                          client.img || clientImage,
                          client.name,
                          client.id
                        )
                      }
                      style={{
                        backgroundColor:
                          props.clientDropdownValue.text === client.name
                            ? "#F9FAFB"
                            : "white",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <img src={client.img || clientImage} />
                        {client.name}
                      </div>
                      {props.clientDropdownValue.text === client.name && (
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
