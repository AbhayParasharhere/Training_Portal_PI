import "./App.scss";
import React, { useState } from "react";
import Header from "./CommonComponents/Header";
import SignUp from "./Pages/Signup";
import AddSales from "./Pages/AddSales";

// Sign Up steps
// First take in the email and password, confirmPassword in 1 page
// Then create the user and provide next stage form of
// name, phone number, address, dob, and photo
// Then the additional details will be stored in another collection known as userDetail
// with the uid of the user as a ref

function App() {
  return (
    <div>
      <Header />
      <SignUp />
      <AddSales />
    </div>
  );
}

export default App;
