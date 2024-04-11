import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContextProvider } from "./context/authContext.jsx";
import { CurrentUserContextProvider } from "./context/currentUserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <CurrentUserContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CurrentUserContextProvider>
  </AuthContextProvider>
);
