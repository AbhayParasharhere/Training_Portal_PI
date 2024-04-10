import React from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import GoogleButton from "../../Images/Continue_Google.png";
import FB_button from "../../Images/Continue_FB.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";

export default function RegisterComponent(props) {
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
        ></input>

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Password"
        ></input>

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Confirm Password"
        ></input>
        <Button value="Next" />
        <p className={styles["RegisterComponent--main--Login"]}>
          Already have an account?
          <a href="" className={styles["RegisterComponent--main--LoginLink"]}>
            {" "}
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
