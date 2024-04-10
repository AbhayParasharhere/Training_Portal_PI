import React from "react";
import LoginComponent from "./Components/Login/LoginComponent";
import { signInEmailAndPassword } from "../../Firebase/authentication";

export default function Login() {
  const testSignIn = async () => {
    const res = await signInEmailAndPassword("nama@example.com", "123456");
    console.log(res);
    setResponse(res);
  };
  return (
    <div>
      <LoginComponent signIn={testSignIn} />
    </div>
  );
}
