import "./App.scss";
import Header from "./CommonComponents/Header";

import SignUpPage from "./Pages/SignupPage";
import Login from "./Pages/Login";
import Client from "./Pages/ClientPage";

import SignUp from "./Pages/Signup";
import AllCourses from "./Pages/AllCourses";
import CalendarModal from "./CommonComponents/CalendarModal";

import AdminConsole from "./Pages/AdminConsole";


// Sign Up steps
// First take in the email and password, confirmPassword in 1 page
// Then create the user and provide next stage form of
// name, phone number, address, dob, and photo
// Then the additional details will be stored in another collection known as userDetail
// with the uid of the user as a ref

function App() {
  return (

    <div style={{ display: "flex", gap: "40px" }}>
      {/* <Header />
      <SignUp />
      <Button value="Next" onClick = {() => {console.log("Hey")}}/> */}
      {/* <RegisterComponent /> */}
      {/* <Register_2Component /> */}
      {/* <LoginComponent /> */}
      {/* <SignUp /> */}
      <Client />
      {/* <Login /> */}

//       <AdminConsole />

    </div>
  );
}

export default App;
