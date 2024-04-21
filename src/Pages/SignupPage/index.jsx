import React, { useState } from "react";
import styles from "./styles.module.scss";

import { storage } from "../../Firebase/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import RegisterComponent from "./Components/Register/RegisterComponent";

import Register_2Component from "./Components/RegisterTwo/RegisterTwoComponent";

export default function SignUp() {
  return (
    <>
      <RegisterComponent />
    </>
  );
}
