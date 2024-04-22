import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import GoogleButton from "../../Images/Continue_Google.png";
import FB_button from "../../Images/Continue_FB.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { Link } from "react-router-dom";

export default function LoginComponent(props) {
  const [loginCredentials, setLoginCredentials] = useState();
  const [emailError, setEmailError] = useState();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const errorStyle = {
    borderColor: "red",
    transition: "all 0.3s ease-in-out",
    background: "#FB717136",
  };

  function handleChange(event) {
    event.preventDefault();
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
    console.log(loginCredentials);
  }
  return (
    <div className={styles["RegisterComponent--Container"]}>
      <div className={styles["RegisterComponent--main"]}>
        <img src={logo} className={styles["RegisterComponent--main--logo"]} />
        <p className={styles["RegisterComponent--main--text"]}>
          Log In into your account
        </p>
        <div className={styles["RegisterComponent--main--ContinueButton"]}>
          <img
            src={GoogleButton}
            className={styles["RegisterComponent--main--GoogleButton"]}
            onClick={() => props.googleSignIn()}
          />
          <img
            src={FB_button}
            className={styles["RegisterComponent--main--FBbutton"]}
            onClick={() => props.facebookSignIn()}
          />
        </div>

        <img src={line} className={styles["RegisterComponent--main--hr"]} />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          style={emailError ? errorStyle : {}}
        />
        <div className={styles["email-error"]}>{emailError}</div>

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <Button
          value="Next"
          onClick={() => {
            console.log("Credentials: ", loginCredentials);
            // Validate email
            if (
              !loginCredentials?.email ||
              !validateEmail(loginCredentials?.email)
            ) {
              setEmailError("Invalid email address");
            } else {
              setEmailError("");
            }

            // Return if email is invalid
            if (emailError) {
              return;
            }
            props.signIn(loginCredentials.email, loginCredentials.password);
          }}
        />
        <p className={styles["RegisterComponent--main--Login"]}>
          Don't have an account?
          <Link
            to="/signup"
            className={styles["RegisterComponent--main--LoginLink"]}
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
