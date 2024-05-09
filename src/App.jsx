import "./App.scss";
import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login";

import Welcome from "./Pages/Welcome";
import Dashboard from "./Pages/Dashboard";

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

import SalesAdding from "./Pages/SalesAdding";
import ProductLinks from "./Pages/ProductLinks";

import CourseDetail from "./Pages/Course/components/CourseDetail";
import NoPagesElement from "./CommonComponents/NoPageError";

import Meet from "./CommonComponents/Meet";

import AdminConsole from "./Pages/AdminConsole";
import InternalLinks from "./Pages/InternalLinks";

import ClientDetail from "./Pages/ClientDetail";
import ClientData from "./Pages/ClientDetail";
import ClientInfo from "./Pages/Form";
import PostQues from "./Pages/PostQues";
import PurchasedPolicy from "./Pages/PurchasedPolicy";
import AllLinks from "./Pages/AllLinks";
import Contact from "./Pages/Contact";
import ContactDetails from "./Pages/Contact";
import WebinarForm from "./Pages/WebinarForm";
import CalendarModal from "./CommonComponents/CalendarModal";
import UploadForm from "./CommonComponents/UploadDocument";
import MobileBirthdays from "./Pages/Dashboard/components/MobileBirthdays";
import MobileNotifications from "./Pages/Dashboard/components/MobileNotifications";
import AdminLayout from "./Layouts/AdminConsole";
import AddCourse from "./Pages/AdminConsole";
import ProductCourses from "./Pages/CourseProducts";
import InvitePeople from "./Pages/AdminPages/invitePeople";

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
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="add-course" element={<AddCourse />} />
        <Route path="invite" element={<InvitePeople />} />
      </Route>
      <Route
        element={<SidebarLayout />}
        path="/"
        errorElement={<NoPagesElement />}
      >
        <Route index element={<Dashboard />} />
        <Route path="/addSales" element={<SalesAdding />} />
        <Route path="/support" element={<FAQSupport />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/birthdays" element={<MobileBirthdays />} />
        <Route path="/notifications" element={<MobileNotifications />} />

        <Route path="/courses" element={<Course />} />

        <Route path="/productlinks" element={<ProductLinks />} />
        <Route path="/add-webinar" element={<WebinarForm />} />
        <Route path="/clients" element={<ClientComponent />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/contact" element={<ContactDetails />} />
        <Route path="/productCourses" element={<ProductCourses />} />

        <Route path="/all-links" element={<AllLinks />} />
        <Route path="/internal-links" element={<InternalLinks />} />
        <Route path="/client-detail/:clientId" element={<ClientData />}>
          <Route index element={<ClientInfo />} />
          <Route path="policies" element={<PurchasedPolicy />} />
          <Route path="goals" element={<ClientInfo />} />
        </Route>
        <Route path="/connect" element={<PostQues />} />
        <Route path="/add-document" element={<UploadForm />} />
      </Route>
    </>
  )
);
function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
