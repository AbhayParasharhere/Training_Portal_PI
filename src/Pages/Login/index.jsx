import React from "react";
import LoginComponent from "./Components/Login/LoginComponent";
import {
  signInEmailAndPassword,
  signInwithGoogle,
  signInwithFacebook,
} from "../../Firebase/authentication";
import { useNavigate } from "react-router-dom";
// import {
//   signInEmailAndPassword,
//   signUpWithEmailAndPassword,
//   storeUserAdditionalDetails,
// } from "../../Firebase/authentication";

export default function Login() {
  const navigate = useNavigate();
  const handleSignIn = async (email, password) => {
    try {
      const res = await signInEmailAndPassword(email, password);
      // console.log("This is the test sign in", res._tokenResponse);
      if (res === "Success") {
        navigate("/");
      } else {
        console.log("This is res ", res);
      }
    } catch (err) {
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
      />
    </div>
  );
}
