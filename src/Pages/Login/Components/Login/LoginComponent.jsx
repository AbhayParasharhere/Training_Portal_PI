import React from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
// import GoogleButton from "../../Images/Continue_Google.png";
// import FB_button from "../../Images/Continue_FB.png";
import facebook_logo from "../../Images/facebook_logo.png";
import google_logo from "../../Images/google_logo.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";

export default function LoginComponent(props) {
  return (
    <div className={styles["RegisterComponent--Container"]}>
      <div className={styles["RegisterComponent--main"]}>
        <img
          src={logo}
          className={styles["RegisterComponent--main--logo"]}
        ></img>
        <p className={styles["RegisterComponent--main--text"]}>
          Log In into your account
        </p>
        <div className={styles["RegisterComponent--main--ContinueButton"]}>
          <button className={styles["RegisterComponent--main--GoogleButton"]}>
            <img src={google_logo} height="25px" />
            <div
              className={styles["RegisterComponent--main--GoogleButton-text"]}
            >
              Continue with Google
            </div>
          </button>

          <button className={styles["RegisterComponent--main--FBbutton"]}>
            <img src={facebook_logo} height="25px" />
            <div className={styles["RegisterComponent--main--FBbutton-text"]}>
              Continue with Facebook
            </div>
          </button>
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
          <input
            type="checkbox"
            className={styles["RegisterComponent--main--checkbox"]}
            name="remember"
          ></input>
          <label for="remember">Remember me</label>
        </div>

        <Button value="Next" onClick={props.signIn} />
        <p className={styles["RegisterComponent--main--Login"]}>
          Don't have an account?
          <a href="" className={styles["RegisterComponent--main--LoginLink"]}>
            {" "}
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
