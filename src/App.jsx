import "./App.scss";
import Header from "./CommonComponents/Header";
import SignUp from "./Pages/Signup";
import AllCourses from "./Pages/AllCourses";
import CalendarModal from "./CommonComponents/CalendarModal";
import Button from "./CommonComponents/Button";
import Announcement from "./CommonComponents/Announcement";
import Login from "./Pages/Login";
import AdminConsole from "./Pages/AdminConsole";
import MainCover from "./Pages/Welcome/components/MainCover";
import DashboardPreview from "./Pages/Welcome/components/DashboardPreview";
import InvitePage from "./Pages/InvitePage";
import Home from "./Pages/Dashboard/components/Home";

// Sign Up steps
// First take in the email and password, confirmPassword in 1 page
// Then create the user and provide next stage form of
// name, phone number, address, dob, and photo
// Then the additional details will be stored in another collection known as userDetail
// with the uid of the user as a ref

function App() {
  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      {/* <Header /> */}
      {/* <SignUp /> */}
      {/* <Announcement /> */}
      {/* <SignUp /> */}
      {/* <AllCourses /> */}
      {/* <LoginComponent /> */}
      {/* <Login /> */}
      {/* <AdminConsole /> */}
      {/* <MainCover /> */}
      {/* <InvitePage /> */}
      <Home />
    </div>
  );
}

export default App;
