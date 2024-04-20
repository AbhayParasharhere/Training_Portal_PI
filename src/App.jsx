import "./App.scss";
import Header from "./CommonComponents/Header";
import SignUp from "./Pages/Signup";
import AllCourses from "./Pages/AllCourses";
import CalendarModal from "./CommonComponents/CalendarModal";
import Button from "./CommonComponents/Button";

import Announcement from "./CommonComponents/Announcement";
import Login from "./Pages/Login";
import AdminConsole from "./Pages/AdminConsole";
import ClientInfo from "./Pages/Form";

import Client from "./Pages/ClientPage";

import MainCover from "./Pages/Welcome/components/MainCover";
import InvitePage from "./Pages/InvitePage";
import Home from "./Pages/Dashboard/components/Home";

import MarqueeText from "./Pages/Welcome/components/MarqueeText";

import Footer from "./Pages/Welcome/components/Footer";

import VideoTutorial from "./Pages/Welcome/components/VideoTutorial";
import Welcome from "./Pages/Welcome";
import Dashboard from "./Pages/Dashboard";

import Tools from "./Pages/Tools";

import SalesAdding from "./Pages/SalesAdding";
import Course from "./Pages/Course";
import Sidebar from "./CommonComponents/Sidebar";

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

      {/* <AdminConsole /> */}
      {/* <ClientInfo /> */}

      {/* <Login /> */}

      {/* <Client /> */}

      {/* <AdminConsole /> */}

      {/* <MainCover /> */}
      {/* <InvitePage /> */}

      {/* //       <MainCover /> */}
      {/* <InvitePage /> */}
      {/* <Tools /> */}
      <Course />
      {/* <Welcome /> */}
      {/* <MainCover /> */}
      {/* <InvitePage /> */}
      {/* <Dashboard /> */}
      {/* <SalesAdding /> */}
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
