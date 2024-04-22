import "./App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
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
import SidebarLayout from "./Layouts/Sidebar";
import RegisterComponent from "./Pages/SignupPage/Components/Register/RegisterComponent";
import Register_2Component from "./Pages/SignupPage/Components/RegisterTwo/RegisterTwoComponent";

// Sign Up steps
// First take in the email and password, confirmPassword in 1 page
// Then create the user and provide next stage form of
// name, phone number, address, dob, and photo
// Then the additional details will be stored in another collection known as userDetail
// with the uid of the user as a ref

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RegisterComponent />} />
      <Route path="/addDetails" element={<Register_2Component />} />
      <Route element={<SidebarLayout />} path="/">
        <Route index element={<Dashboard />} />
        <Route path="/Add-Sales" element={<SalesAdding />} />
      </Route>
    </>
  )
);
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

   

      {/* <Client /> */}

      {/* <AdminConsole /> */}

      {/* <MainCover /> */}
      {/* <InvitePage /> */}

      {/* //       <MainCover /> */}
      {/* <InvitePage /> */}
      {/* <Tools /> */}
      {/* <Welcome /> */}
      {/* <MainCover /> */}
      {/* <InvitePage /> */}
      {/* <Dashboard /> */}

      <RouterProvider router={router} />


    </div>
  );
}

export default App;
