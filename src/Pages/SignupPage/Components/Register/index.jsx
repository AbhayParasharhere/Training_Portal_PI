import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import google_logo from "../../Images/google_logo.png";
import facebook_logo from "../../Images/facebook_logo.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserDetails,
  signInwithFacebook,
  signInwithGoogle,
  signUpWithEmailAndPassword,
} from "../../../../Firebase/authentication";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { createLoginCount } from "../../../../Firebase/kpi";

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
    if (!registerCredentials?.email || !registerCredentials?.password) {
      toast.error("Please enter all the details");
    }
    // First check if the email adress is valid
    if (!validateEmail(registerCredentials?.email)) {
      setEmailError("Invalid email format. Please enter a valid email address");
    } else {
      setEmailError("");
    }

    // Check if the confirm password matches the password
    if (
      !registerCredentials?.password ||
      !registerCredentials?.confirmPassword ||
      registerCredentials?.password !== registerCredentials?.confirmPassword
    ) {
      setPasswordError("Passwords do not match, please try again");
    } else {
      setPasswordError("");
    }

    // If there are any errors, return
    if (emailError || passwordError) {
      return;
    } else {
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
    }
  };

  // Check if we already have the user in the database by checking in userDEtails collection
  const checkIfUserExists = async (uid) => {
    if (!uid) {
      console.log("Failed to get user details as uid is not provided");
      return "Failed";
    }
    const userDetails = await getUserDetails(uid);

    if (userDetails === "Failed") {
      console.log("Failed to get user details");
      return "Failed";
    }
    return userDetails;
  };

  const handleGoogleSignUp = async () => {
    try {
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
              SignUp with Google
            </div>
          </button>

          <button
            className={styles["RegisterComponent--main--FBbutton"]}
            onClick={handleFacebookSignUp}
          >
            <img
              src={facebook_logo}
              className={styles["RegisterComponent--main--FBbutton-img"]}
            />
            <div className={styles["RegisterComponent--main--FBbutton-text"]}>
              SignUp with Facebook
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

        {!loading && <Button value="Next" onClick={handleSignUpClick} />}
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
