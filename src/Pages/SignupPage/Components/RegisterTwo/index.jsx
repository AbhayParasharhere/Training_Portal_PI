import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import Button from "../../../../CommonComponents/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { storeUserAdditionalDetails } from "../../../../Firebase/authentication";
import { ClipLoader } from "react-spinners";
import secureLocalStorage from "react-secure-storage";

export default function Register_2Component() {
  const [loading, setLoading] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneError, setPhoneError] = useState();
  useEffect(() => {
    if (!location?.state?.uid) {
      navigate("/signup");
    }
  }, location);

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
    } else {
      try {
        setLoading(true);
        const uid = location?.state?.uid;

        if (!uid) {
          throw new Error("No uid provided by the previous page");
        }

        const storeAdditionalDetailsResponse = await storeUserAdditionalDetails(
          uid,
          additionalDetails
        );

        // Also store the user details in the local storage
        const userName = additionalDetails?.name || "Broker";
        const userPhoto =
          additionalDetails?.photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/trainingportalpi.appspot.com/o/userPhoto%2FtOslDTjJEMXQFC1JxvDM1LoItaS2.jpg?alt=media&token=00af2fdd-b286-448b-a674-0f644ab23ccf";
        setLoading(false);

        secureLocalStorage.setItem("userDetails", [userName, userPhoto, uid]);

        console.log(
          "Set Details: User Details JSON",
          secureLocalStorage.getItem("userDetails")
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
        setLoading(false);
        console.log(err);
      }
    }
  };
  return (
    <div className={styles["RegisterComponent--Container"]}>
      <head>
        <title>
          <img src={logo} height="24px" />
          Register
        </title>
      </head>
      <div className={styles["RegisterComponent--main"]}>
        <img
          src={logo}
          className={styles["RegisterComponent--main--logo"]}
        ></img>
        <p className={styles["RegisterComponent--main--text"]}>
          Register by creating an account
        </p>
        <p className={styles["RegisterComponent--main--text-mobile"]}>
          Register
        </p>
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
        {!loading && (
          <Button
            value="Create Account"
            onClick={handleSignUpClick}
            className={styles["RegisterComponent--main--button"]}
          />
        )}
        <div style={{ margin: "20px 0 10px 0" }}>
          <ClipLoader color="#" loading={loading} size={30} />
        </div>
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
