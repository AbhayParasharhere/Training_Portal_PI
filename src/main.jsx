import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContextProvider } from "./context/authContext";
import { PrimaryDataContextProvider } from "./context/primaryDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <PrimaryDataContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PrimaryDataContextProvider>
  </AuthContextProvider>
);
