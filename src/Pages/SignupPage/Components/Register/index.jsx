import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../Images/logo.png";
import GoogleButton from "../../Images/Continue_Google.png";
import FB_button from "../../Images/Continue_FB.png";
import line from "../../Images/line.png";
import Button from "../../../../CommonComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../../../../Firebase/authentication";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

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
    }

    try {
      setLoading(true);
      const signUpUidResponse = await signUpWithEmailAndPassword(
        registerCredentials.email,
        registerCredentials.password
      );
      setLoading(false);

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
  return (
    <div className={styles["RegisterComponent--Container"]}>
      <div className={styles["RegisterComponent--main"]}>
        <img src={logo} className={styles["RegisterComponent--main--logo"]} />
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
          />
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
        <span className={styles["email-error"]}>{emailError}</span>
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
        <div className={styles["password-error"]}>{passwordError}</div>

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
