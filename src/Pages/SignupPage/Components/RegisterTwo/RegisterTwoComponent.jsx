import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import GoogleButton from "../../Images/Continue_Google.png";
import FB_button from "../../Images/Continue_FB.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { storeUserAdditionalDetails } from "../../../../Firebase/authentication";

export default function Register_2Component() {
  const [additionalDetails, setAdditionalDetails] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneError, setPhoneError] = useState();

  const handleChange = (event) => {
    console.log("Details: ", additionalDetails);
    setAdditionalDetails({
      ...additionalDetails,
      [event.target.name]: event.target.value,
    });
  };

  const errorStyle = {
    borderColor: "red",
    transition: "all 0.3s ease-in-out",
    background: "#FB717136",
  };

  const validatePhoneNumber = (number) => {
    return String(number).match(/^[0-9]{10}$/);
  };

  const handleSignUpClick = async () => {
    // First check if the phone number is valid
    if (
      !additionalDetails?.number ||
      !validatePhoneNumber(additionalDetails?.number)
    ) {
      setPhoneError("Invalid phone number. Please enter a valid phone number");
      return;
    } else {
      setPhoneError("");
    }

    // If there are any errors, return
    if (phoneError) {
      return;
    }

    try {
      const uid = location?.state?.uid;

      if (!uid) {
        throw new Error("No uid provided by the previous page");
      }
      const storeAdditionalDetailsResponse = await storeUserAdditionalDetails(
        uid,
        additionalDetails
      );
      console.log("store response: ", storeAdditionalDetailsResponse);
      if (storeAdditionalDetailsResponse === "Failed") {
        throw new Error("Failed to store additional details");
      }
      if (
        storeAdditionalDetailsResponse === "User details stored successfully"
      ) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles["RegisterComponent--Container"]}>
      <div className={styles["RegisterComponent--main"]}>
        <img
          src={logo}
          className={styles["RegisterComponent--main--logo"]}
        ></img>
        <p className={styles["RegisterComponent--main--text"]}>
          Register by creating an account
        </p>
        <div className={styles["RegisterComponent--main--ContinueButton"]}>
          <img
            src={GoogleButton}
            className={styles["RegisterComponent--main--GoogleButton"]}
          ></img>
          <img
            src={FB_button}
            className={styles["RegisterComponent--main--FBbutton"]}
          ></img>
        </div>

        <img src={line} className={styles["RegisterComponent--main--hr"]} />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Full Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Date of Birth"
          name="DOB"
          type="date"
          onChange={handleChange}
        />

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Phone number"
          name="number"
          style={phoneError ? errorStyle : {}}
          onChange={handleChange}
        />
        <div className={styles["phone-error"]}>{phoneError}</div>
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Are you a New or Existing Broker?"
          name="brokerStatus"
          onChange={handleChange}
        />
        <div className={styles["RegisterComponent--main--Residence"]}>
          <input
            className={styles["RegisterComponent--main--Residence--input"]}
            placeholder="City"
            name="city"
            onChange={handleChange}
          />
          <input
            className={styles["RegisterComponent--main--Residence--input"]}
            placeholder="Country"
            name="country"
            onChange={handleChange}
          />
        </div>
        <Button value="Create Account" onClick={handleSignUpClick} />
        <p className={styles["RegisterComponent--main--Login"]}>
          By clicking Create Account, you agree to our{" "}
          <a href="" className={styles["RegisterComponent--main--LoginLink"]}>
            Terms of Use{" "}
          </a>{" "}
          and{" "}
          <a href="" className={styles["RegisterComponent--main--LoginLink"]}>
            {" "}
            Privacy Policy{" "}
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
