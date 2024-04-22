import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
// import GoogleButton from "../../Images/Continue_Google.png";
// import FB_button from "../../Images/Continue_FB.png";
import facebook_logo from "../../Images/facebook_logo.png";
import google_logo from "../../Images/google_logo.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext";

export default function LoginComponent(props) {
  const user = useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] = useState();

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
          name="email"
          onChange={handleChange}
        ></input>

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        ></input>

        <Button
          value="Next"
          onClick={() => {
            console.log("Credentials: ", loginCredentials);
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
