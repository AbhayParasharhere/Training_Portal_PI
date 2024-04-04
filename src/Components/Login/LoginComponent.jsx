import React from "react";
import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import GoogleButton from "../../../assets/Continue_Google.png";
import FB_button from "../../../assets/Continue_FB.png";
import line from "../../../assets/line.png";
import Button from "../../CommonComponents/Button";

export default function LoginComponent() {
  return (
    <div className={styles["RegisterComponent--main"]}>
      <img src={logo} className={styles["RegisterComponent--main--logo"]}></img>
      <p className={styles["RegisterComponent--main--text"]}>
        Log In into your account
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
        placeholder="Email Address"
      ></input>

      <input
        className={styles["RegisterComponent--main--input"]}
        placeholder="Password"
      ></input>

      <div className={styles["RegisterComponent--main--checkbox--div"]}>
      <input type="checkbox" className={styles["RegisterComponent--main--checkbox"]} name="remember"></input>
      <label for="remember">Remember me</label>
        </div>  
      
      <Button value="Next" />
      <p className={styles["RegisterComponent--main--Login"]}>
      Don't have an account? 
        <a href="" className={styles["RegisterComponent--main--LoginLink"]}>
        {" "}
        Sign Up
        </a>
      </p>
    </div>
  );
}
