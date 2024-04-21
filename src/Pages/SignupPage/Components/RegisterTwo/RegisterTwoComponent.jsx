import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import GoogleButton from "../../Images/Continue_Google.png";
import FB_button from "../../Images/Continue_FB.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  signInEmailAndPassword,
  signInwithGoogle,
  signUpWithEmailAndPassword,
  storeUserAdditionalDetails,
} from "../../../../Firebase/authentication";
import { AuthContext } from "../../../../context/authContext";

import { v4 } from "uuid";

export default function Register_2Component() {
  const [response, setResponse] = useState(null);
  const user = useContext(AuthContext);

  const [additionalDetails, setAdditionalDetails] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const credentials = location?.state?.registerCredentials;

  const signUp = async (email, password) => {
    const res = await signUpWithEmailAndPassword(email, password);
    // print the response
    console.log("Signup response: ", res);
    setResponse(res);
    return res;
  };

  const testGoogleSignIn = async () => {
    const res = await signInwithGoogle();
    console.log(res);
    setResponse(res);
  };

  const storeAdditionalDetails = async (name, number, city, country, dob) => {
    // store the additional details in the userDetail collection

    const res = await storeUserAdditionalDetails(response?.user?.uid, {
      phone_number: number,
      city: city,
      country: country,
      dob: dob,
      name: response?.user?.displayName || name,
    });
    return res;
    console.log("In app store additional details fx", res);
  };

  const handleChange = (event) => {
    console.log("Details: ", additionalDetails);
    setAdditionalDetails({
      ...additionalDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async () => {
    try {
      const response = await signUp(credentials.email, credentials.password);
      console.log("user: ", user);
      if (user) {
        const storeResponse = await storeAdditionalDetails(
          additionalDetails.name,
          additionalDetails.number,
          additionalDetails.city,
          additionalDetails.country,
          additionalDetails.DOB
        );
        console.log("store response: ", storeResponse);
        // if (storeResponse) {
        //   navigate("/");
        // }
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
          onChange={handleChange}
        ></input>

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Phone number"
          name="number"
          onChange={handleChange}
        ></input>
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Are you New or Existing Broker"
          name="brokerStatus"
          onChange={handleChange}
        ></input>
        <div className={styles["RegisterComponent--main--Residence"]}>
          <input
            className={styles["RegisterComponent--main--Residence--input"]}
            placeholder="City"
            name="city"
            onChange={handleChange}
          ></input>
          <input
            className={styles["RegisterComponent--main--Residence--input"]}
            placeholder="Country"
            name="country"
            onChange={handleChange}
          ></input>
        </div>
        <Button value="Create Account" onClick={handleClick} />
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
