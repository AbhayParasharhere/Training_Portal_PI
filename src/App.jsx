import "./App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login";

import Welcome from "./Pages/Welcome";
import Dashboard from "./Pages/Dashboard";

import SalesAdding from "./Pages/SalesAdding";
import SidebarLayout from "./Layouts/Sidebar";
import FAQSupport from "./Pages/FAQSupport";

import RegisterComponent from "./Pages/SignupPage/Components/Register";
import Register_2Component from "./Pages/SignupPage/Components/RegisterTwo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnnouncementPage from "./Pages/Announcement";
import Webinar from "./Pages/Webinar";
import Compliance from "./Pages/Compliance";
import Statistics from "./Pages/Statistics";
import Course from "./Pages/Course";
import ClientComponent from "./Pages/ClientPage/Components/ClientComponent";
import Tools from "./Pages/Tools";
import CourseDetail from "./Pages/Course/components/CourseDetail";

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
        <Route path="/addSales" element={<SalesAdding />} />
        <Route path="/support" element={<FAQSupport />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/clients" element={<ClientComponent />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Route>
    </>
  )
);
function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
