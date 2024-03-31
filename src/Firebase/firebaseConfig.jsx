// Important note
// The Firebase configuration object is sensitive information. It should not be shared publicly.
// In a production environment, you should use an environment variable to store the configuration object.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNwvFcQ4cXlYYP9JUjs44QtqolH-okNQU",
  authDomain: "trainingportalpi.firebaseapp.com",
  projectId: "trainingportalpi",
  storageBucket: "trainingportalpi.appspot.com",
  messagingSenderId: "16764537808",
  appId: "1:16764537808:web:508a17cd4e7530f430c7d5",
  measurementId: "G-RCNXTH4178",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
