import "./App.scss";
import Header from "./CommonComponents/Header";
import SignUp from "./Pages/Signup";
import AllCourses from "./Pages/AllCourses";
import CalendarModal from "./CommonComponents/CalendarModal";
import Button from "./CommonComponents/Button";
import RegisterComponent from "./Components/Register/RegisterComponent";
import Register_2Component from "./Components/Register_2/Register_2Component";
import LoginComponent from "./Components/Login/LoginComponent";
import Chat from "./Pages/Chat";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

// Sign Up steps
// First take in the email and password, confirmPassword in 1 page
// Then create the user and provide next stage form of
// name, phone number, address, dob, and photo
// Then the additional details will be stored in another collection known as userDetail
// with the uid of the user as a ref

function App() {
  const currentUser = useContext(AuthContext);

  console.log("This is the current user: ", currentUser);
  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Header />
      <Chat />
      <SignUp />
      {/* <AllCourses /> */}
      {/* <LoginComponent /> */}
    </div>
  );
}

export default App;
