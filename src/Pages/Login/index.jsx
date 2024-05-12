import React, { useContext, useEffect, useState } from "react";
import {
  signInEmailAndPassword,
  signInwithGoogle,
  signInwithFacebook,
  checkIfUserExists,
} from "../../Firebase/authentication";

import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import logo from "./Images/logo.png";
import google_logo from "./Images/google_logo.png";
import facebook_logo from "./Images/facebook_logo.png";
import line from "./Images/line.png";

import { Link } from "react-router-dom";
import { set } from "firebase/database";
import secureLocalStorage from "react-secure-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import firebase from "firebase/compat/app";
import { AuthContext } from "../../context/authContext";
import ButtonLogin from "../../CommonComponents/ButtonLogin";

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
      <head>
        <title>
          <img src={logo} height="24px" />
          Training Portal
        </title>
      </head>
      <div className={styles["RegisterComponent--main"]}>
        <img src={logo} className={styles["RegisterComponent--main--logo"]} />
        <p className={styles["RegisterComponent--main--text"]}>
          Log In into your account
        </p>
        <p className={styles["RegisterComponent--main--text-mobile"]}>Log In</p>
        <div className={styles["RegisterComponent--main--ContinueButton"]}>
          <button
            className={styles["RegisterComponent--main--GoogleButton"]}
            onClick={props.googleSignIn}
          >
            <img
              src={google_logo}
              className={styles["RegisterComponent--main--GoogleButton-img"]}
            />
            <div
              className={styles["RegisterComponent--main--GoogleButton-text"]}
            >
              Continue with Google
            </div>
          </button>

          <button
            className={styles["RegisterComponent--main--FBbutton"]}
            disabled
          >
            <img
              src={facebook_logo}
              className={styles["RegisterComponent--main--FBbutton-img"]}
            />
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
          style={emailError ? errorStyle : {}}
        />
        {emailError && (
          <div className={styles["email-error"]}>{emailError}</div>
        )}

        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <ButtonLogin
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
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  let currentUser = useContext(AuthContext);

  useEffect(() => {
    console.log("This is the use effect current user: ", currentUser);
    if (currentUser?.uid) {
      setLoadingRedirect(true);
      navigate("/");
    }
  }, [currentUser]);

  const [loading, setLoading] = useState(false);
  const handleSignIn = async (email, password) => {
    setLoading(true);
    const { status, uid } = await signInEmailAndPassword(
      email,
      password,
      setLoading
    );

    console.log("This is uid status ", status, uid);

    if (status === "Success" && uid) {
      // Save the login count
      setLoading(false);
      navigate("/");
    } else {
      console.log("This is status ", status);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      toast.info(
        "This feature will be available when the application is deployed"
      );
      const { status, uid } = await signInwithGoogle();

      console.log("This is uid status ", status, uid);

      if (status === "Success" && uid) {
        const checkExists = await checkIfUserExists(uid);
        console.log("This is checkIfUserExists ", checkExists);
        if ((await checkIfUserExists(uid)) === "Failed") {
          navigate("/addDetails", {
            state: { uid: uid },
          });
          return;
        } else {
          navigate("/");
        }
      } else {
        console.log("This is status ", status);
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const { status, uid } = await signInwithFacebook();
      console.log("This is uid status ", status, uid);

      if (status === "Success" && uid) {
        const checkExists = await checkIfUserExists(uid);
        console.log("This is checkIfUserExists ", checkExists);
        if ((await checkIfUserExists(uid)) === "Failed") {
          navigate("/addDetails", {
            state: { uid: uid },
          });
          return;
        } else {
          navigate("/");
        }
      } else {
        console.log("This is status ", status);
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };

  return loadingRedirect ? (
    <div>Loading..</div>
  ) : (
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
