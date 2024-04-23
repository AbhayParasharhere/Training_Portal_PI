import React, { useContext, useState } from "react";
import {
  signInEmailAndPassword,
  signInwithGoogle,
  signInwithFacebook,
} from "../../Firebase/authentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import logo from "./Images/logo.png";
import GoogleButton from "./Images/Continue_Google.png";
import FB_button from "./Images/Continue_FB.png";
import line from "./Images/line.png";
import Button from "../../CommonComponents/Button";
import { Link } from "react-router-dom";
import { set } from "firebase/database";

function LoginComponent(props) {
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
          value={props.loading ? "Loading..." : "Log In"}
          onClick={() => {
            console.log("Credentials: ", loginCredentials);
            //  Notify if missing password or email
            if (!loginCredentials?.email || !loginCredentials?.password) {
              toast.error("Please enter email and password");
              return;
            }

            // Validate email
            if (!validateEmail(loginCredentials?.email)) {
              setEmailError("Invalid email address");
            } else {
              setEmailError("");
            }

            // Return if email is invalid
            if (emailError) {
              toast.error("Invalid email address");
            } else {
              props.signIn(loginCredentials?.email, loginCredentials?.password);
            }
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

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (email, password) => {
    try {
      setLoading(true);
      const res = await signInEmailAndPassword(email, password);
      if (res === "Success") {
        setLoading(false);
        navigate("/");
      } else {
        console.log("This is res ", res);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Failed to sign in, please try again.");
      console.log("Invalid Credentials");
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInwithGoogle();
      console.log(res);
      if (res === "Success") {
        navigate("/");
      } else {
        console.log("This is res ", res);
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      const res = await signInwithFacebook();
      console.log(res);
      if (res === "Success") {
        navigate("/");
      } else {
        console.log("This is res ", res);
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };

  return (
    <div>
      <LoginComponent
        signIn={handleSignIn}
        googleSignIn={handleGoogleSignIn}
        facebookSignIn={handleFacebookSignIn}
        loading={loading}
      />
    </div>
  );
}
