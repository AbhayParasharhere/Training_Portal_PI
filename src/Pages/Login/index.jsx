import React, { useContext, useEffect, useState } from "react";
import {
  signInEmailAndPassword,
  signInwithGoogle,
  signInwithFacebook,
} from "../../Firebase/authentication";

import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import logo from "./Images/logo.png";
import google_logo from "./Images/google_logo.png";
import facebook_logo from "./Images/facebook_logo.png";
import line from "./Images/line.png";
import Button from "../../CommonComponents/Button";
import { Link } from "react-router-dom";
import { set } from "firebase/database";
import secureLocalStorage from "react-secure-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import firebase from "firebase/compat/app";
import { AuthContext } from "../../context/authContext";

// Define a flag to track whether redirection has already occurred
let redirectionDone = false;

// export async function loader(redirect) {
//   if (redirectionDone) {
//     return null;
//   }

//   const user = onAuthStateChanged(auth, (user) => {
//     if (user && !redirectionDone) {
//       redirectionDone = true; // Mark redirection as done
//       redirect("/");
//       return "Redirected";
//     }
//   });
//   return user;
// }

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
        <p className={styles["RegisterComponent--main--text-mobile"]}>Log In</p>
        <div className={styles["RegisterComponent--main--ContinueButton"]}>
          <button className={styles["RegisterComponent--main--GoogleButton"]}>
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

          <button className={styles["RegisterComponent--main--FBbutton"]}>
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
