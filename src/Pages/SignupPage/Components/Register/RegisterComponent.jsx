import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import GoogleButton from "../../Images/Continue_Google.png";
import FB_button from "../../Images/Continue_FB.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterComponent(props) {
  const navigate = useNavigate();
  const [registerCredentials, setRegisterCredentials] = useState();
  const handleChange = (event) => {
    console.log(registerCredentials);
    setRegisterCredentials({
      ...registerCredentials,
      [event.target.name]: event.target.value,
    });
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
            onClick={props.google}
          />
          <img
            src={FB_button}
            className={styles["RegisterComponent--main--FBbutton"]}
          ></img>
        </div>
        <img src={line} className={styles["RegisterComponent--main--hr"]} />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
        />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <Link
          to="/addDetails"
          style={{
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          state={{ registerCredentials: registerCredentials }}
        >
          {" "}
          <Button value="Next" />
        </Link>
        <p className={styles["RegisterComponent--main--Login"]}>
          Already have an account?
          <Link
            to="/login"
            className={styles["RegisterComponent--main--LoginLink"]}
          >
            {" "}
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
