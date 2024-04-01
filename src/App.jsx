import "./App.scss";
import React, { useMemo, useState } from "react";
import Header from "./CommonComponents/Header";
import {
  signInEmailAndPassword,
  signInwithGoogle,
  signUpWithEmailAndPassword,
  storeUserAdditionalDetails,
} from "./Firebase/authentication";

// Sign Up steps
// First take in the email and password, confirmPassword in 1 page
// Then create the user and provide next stage form of
// name, phone number, address, dob, and photo
// Then the additional details will be stored in another collection known as userDetail
// with the uid of the user as a ref

function App() {
  const [response, setResponse] = useState(null);

  const testSignUp = async () => {
    const res = await signUpWithEmailAndPassword(
      "abhay7171_9@gmail.com",
      "123456"
    );
    // print the response
    console.log(res);
    setResponse(res);
  };

  const testGoogleSignIn = async () => {
    const res = await signInwithGoogle();
    console.log(res);
    setResponse(res);
  };

  const storeAdditionalDetails = async () => {
    // store the additional details in the userDetail collection

    const res = await storeUserAdditionalDetails(response?.user?.uid, {
      phone_number: "1234567890",
      address: "123, abc street",
      dob: "01-01-2000",
      name: response?.user?.displayName || "Abhay",
    });
    console.log("In app store additional details fx", res);
  };

  return (
    <>
      <button onClick={testSignUp}>Test SignUp</button>
      <button onClick={storeAdditionalDetails} disabled={!response}>
        Test Adding Other details
      </button>
      <button onClick={testGoogleSignIn}>Test Google Sign in</button>
      <Header />
    </>
  );
}

export default App;
