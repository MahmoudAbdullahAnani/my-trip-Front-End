import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "driver.js/dist/driver.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./layout/Navbar.tsx";

import { store } from "./data/store.tsx";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";

import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RecoilRoot>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
          >
            <Navbar />
            <App />
          </GoogleOAuthProvider>
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
