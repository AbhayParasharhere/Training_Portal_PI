import React from "react";
import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import GoogleButton from "../../../assets/Continue_Google.png";
import FB_button from "../../../assets/Continue_FB.png";
import line from "../../../assets/line.png";
import Button from "../../CommonComponents/Button";

export default function Register_2Component() {
  return (
    <div className={styles["RegisterComponent--main"]}>
      <img src={logo} className={styles["RegisterComponent--main--logo"]}></img>
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
      ></input>

      <input
        className={styles["RegisterComponent--main--input"]}
        placeholder="Date of Birth"
      ></input>

      <input
        className={styles["RegisterComponent--main--input"]}
        placeholder="Phone number"
      ></input>
      <input
        className={styles["RegisterComponent--main--input"]}
        placeholder="Are you New or Existing Broker"
      ></input>
      <div className={styles["RegisterComponent--main--Residence"]}>
        <input
          className={styles["RegisterComponent--main--Residence--input"]}
          placeholder="City"
        ></input>
        <input
          className={styles["RegisterComponent--main--Residence--input"]}
          placeholder="Country"
        ></input>
      </div>
      <Button value="Create Account" />
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
  );
}
