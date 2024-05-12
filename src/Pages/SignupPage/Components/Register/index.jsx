import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import google_logo from "../../Images/google_logo.png";
import facebook_logo from "../../Images/facebook_logo.png";
import line from "../../Images/line.png";
import { Link, useNavigate } from "react-router-dom";
import {
  checkIfUserExists,
  signInwithFacebook,
  signInwithGoogle,
  signUpWithEmailAndPassword,
} from "../../../../Firebase/authentication";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../../context/authContext";
import ButtonLogin from "../../../../CommonComponents/ButtonLogin";

export default function RegisterComponent(props) {
  const navigate = useNavigate();
  const [registerCredentials, setRegisterCredentials] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    console.log(registerCredentials);
    setRegisterCredentials({
      ...registerCredentials,
      [event.target.name]: event.target.value,
    });
  };
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  let currentUser = useContext(AuthContext);

  useEffect(() => {
    console.log("This is the use effect current user: ", currentUser);
    if (currentUser?.uid) {
      setLoadingRedirect(true);
      navigate("/");
    }
  }, [currentUser]);

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

  const handleSignUpClick = async () => {
    setEmailError("");
    setPasswordError("");
    if (
      !registerCredentials?.email ||
      !registerCredentials?.password ||
      !registerCredentials?.confirmPassword
    ) {
      toast.error("Please enter all the details");
      return;
    }

    // First check if the email address is valid
    if (!validateEmail(registerCredentials?.email)) {
      setEmailError("Invalid email format. Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    // Check if password and confirm password fields are provided

    // Check if the passwords match
    if (registerCredentials.password !== registerCredentials.confirmPassword) {
      setPasswordError("Passwords do not match, please try again");
      return;
    }

    // Check password length
    if (registerCredentials.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // If there are any errors, return
    try {
      // Check if the user email already exists in the userDetail collection
      setLoading(true);
      const signUpUidResponse = await signUpWithEmailAndPassword(
        registerCredentials.email,
        registerCredentials.password
      );
      setLoading(false);
      console.log("This is the response ", signUpUidResponse);

      if (signUpUidResponse === "User exists") {
        navigate("/login");
        return;
      }

      if (signUpUidResponse === "Failed") {
        throw new Error("Failed to sign up");
      }
      navigate("/addDetails", {
        state: { uid: signUpUidResponse },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      return error;
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      toast.info(
        "This feature will be available when the application is deployed"
      );
      const { status, uid } = await signInwithGoogle();

      console.log("This is uid status ", status, uid);

      if (status === "Success" && uid) {
        if ((await checkIfUserExists(uid)) !== "Failed") {
          toast.error("User with this email, already exists, please login", {
            autoClose: 9000,
          });
          navigate("/login");
          return;
        } else {
          navigate("/addDetails", {
            state: { uid: uid },
          });
        }
      } else {
        console.log("This is status ", status);
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const { status, uid } = await signInwithFacebook();
      console.log("This is uid status ", status, uid);

      if (status === "Success" && uid) {
        if ((await checkIfUserExists(uid)) !== "Failed") {
          toast.error("User with this email, already exists, please login", {
            autoClose: 9000,
          });
          navigate("/login");
          return;
        } else {
          navigate("/addDetails", {
            state: { uid: uid },
          });
        }
      } else {
        console.log("This is status ", status);
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };
  return (
    <div className={styles["RegisterComponent--Container"]}>
      <head>
        <title>
          <img src={logo} height="24px" />
          Register
        </title>
      </head>
      <div className={styles["RegisterComponent--main"]}>
        <img src={logo} className={styles["RegisterComponent--main--logo"]} />
        <p className={styles["RegisterComponent--main--text"]}>
          Register by creating an account
        </p>
        <p className={styles["RegisterComponent--main--text-mobile"]}>
          Register
        </p>
        <div className={styles["RegisterComponent--main--ContinueButton"]}>
          <button
            className={styles["RegisterComponent--main--GoogleButton"]}
            onClick={handleGoogleSignUp}
          >
            <img
              src={google_logo}
              className={styles["RegisterComponent--main--GoogleButton-img"]}
            />
            <div
              className={styles["RegisterComponent--main--GoogleButton-text"]}
            >
              Signup with Google
            </div>
          </button>

          <button
            className={styles["RegisterComponent--main--FBbutton"]}
            onClick={handleFacebookSignUp}
            disabled
          >
            <img
              src={facebook_logo}
              className={styles["RegisterComponent--main--FBbutton-img"]}
            />
            <div className={styles["RegisterComponent--main--FBbutton-text"]}>
              Signup with Facebook
            </div>
          </button>
        </div>
        <img src={line} className={styles["RegisterComponent--main--hr"]} />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Email Address"
          name="email"
          type="email"
          onChange={handleChange}
          style={emailError ? errorStyle : {}}
        />
        {emailError && (
          <span className={styles["email-error"]}>{emailError}</span>
        )}
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <input
          className={styles["RegisterComponent--main--input"]}
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          style={passwordError ? errorStyle : {}}
          onChange={handleChange}
        />
        {passwordError && (
          <div className={styles["password-error"]}>{passwordError}</div>
        )}

        {!loading && <ButtonLogin value="Next" onClick={handleSignUpClick} />}
        <div style={{ margin: "20px 0 10px 0" }}>
          <ClipLoader color="#" loading={loading} size={30} />
        </div>
        <p className={styles["RegisterComponent--main--Login"]}>
          Already have an account?
          <Link
            to="/login"
            className={styles["RegisterComponent--main--LoginLink"]}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
