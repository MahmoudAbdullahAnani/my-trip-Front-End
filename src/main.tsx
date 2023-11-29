import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "driver.js/dist/driver.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./layout/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
      >
        <Navbar />
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
