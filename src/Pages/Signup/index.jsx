import React, { useState } from "react";
import styles from "./styles.module.scss";

import {
  signInEmailAndPassword,
  signInwithGoogle,
  signUpWithEmailAndPassword,
  storeUserAdditionalDetails,
} from "../../Firebase/authentication";

import { v4 } from "uuid";
import { storage } from "../../Firebase/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export default function SignUp() {
  const [response, setResponse] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });

  const testSignUp = async () => {
    const res = await signUpWithEmailAndPassword(
      signupDetails.email,
      signupDetails.password
    );
    // print the response
    console.log(res);
    setResponse(res);
  };

  const testSignIn = async () => {
    const res = await signInEmailAndPassword(
      loginDetails.email,
      loginDetails.password
    );
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
      email: response?.user?.email,
      phone_number: "1234567890",
      address: "123, abc street",
      dob: "01-01-2000",
      name: response?.user?.displayName || signupDetails.name,
    });
    console.log("In app store additional details fx", res);
  };

  const [imageFile, setImageFile] = useState(null);

  const changeImageFile = (e) => {
    setImageFile(e.target.files[0]);
    return imageFile;
  };

  const uploadProfileImage = async () => {
    // uploading it to a generic folder userPhoto, the file name will be (email of the user_uuidrandom)
    try {
      if (imageFile == null) return;
      const imgRef = ref(storage, `userPhoto/${"generic@nomail.com"}_${v4()}`);
      await uploadBytes(imgRef, imageFile);
      uploadBytes(imgRef, imageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("uploadedurl", url);
        });
      });
      // console.log("BEFOER CORS", imgRef, imageFile);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadVideo = async () => {
    try {
      if (imageFile === null) return;
      const videoRef = ref(storage, `userVideo/${"video1"}_${v4()}`);
      const uploadTask = uploadBytesResumable(videoRef, imageFile);
      uploadTask.on("state_changed", (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("video uploaded");
    }
  };
  return (
    <div style={{ display: "flex", gap: "40px" }}>
      <div>
        <input
          placeholder="Email"
          name="email"
          value={loginDetails.email}
          onChange={(event) => {
            console.log(loginDetails);
            setSignupDetails({
              ...loginDetails,
              [event.target.name]: event.target.value,
            });
          }}
        />
        <input
          placeholder="Password"
          name="password"
          value={loginDetails.password}
          onChange={(event) => {
            console.log(loginDetails);
            setSignupDetails({
              ...signupDetails,
              [event.target.name]: event.target.value,
            });
          }}
        />
        <input
          placeholder="Password"
          name="name"
          value={loginDetails.password}
          onChange={(event) => {
            console.log(loginDetails);
            setSignupDetails({
              ...signupDetails,
              [event.target.name]: event.target.value,
            });
          }}
        />
        <button onClick={testSignUp}>Test SignUp</button>
      </div>
      <div>
        <input
          placeholder="Email"
          name="email"
          value={loginDetails.email}
          onChange={(event) => {
            console.log(loginDetails);
            setLoginDetails({
              ...loginDetails,
              [event.target.name]: event.target.value,
            });
          }}
        />
        <input
          placeholder="Password"
          name="password"
          value={loginDetails.password}
          onChange={(event) => {
            console.log(loginDetails);
            setLoginDetails({
              ...loginDetails,
              [event.target.name]: event.target.value,
            });
          }}
        />
        <button onClick={testSignIn}>Test SignIn</button>
      </div>
      <button onClick={storeAdditionalDetails}>
        Test Adding Other details
      </button>
      <button onClick={testGoogleSignIn}>Test Google Sign in</button>
      <div>
        <label htmlFor="Set Profile Image">Set Profile Image</label>
        <input
          type="file"
          name="Set Profile Image"
          onChange={changeImageFile}
        />
        <button onClick={uploadVideo}>Upload profile image</button>
      </div>
    </div>
  );
}
