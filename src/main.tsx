import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import "./video.sass";
import "react-modal-video/scss/modal-video.scss";
import { BrowserRouter } from "react-router-dom";
import "driver.js/dist/driver.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./layout/Navbar.tsx";

import { store } from "./data/store.tsx";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";

import "react-toastify/dist/ReactToastify.css";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import Footer from "./layout/Footer.js";
import "./i18n.js";

import "chart.js/auto";
import ScrollToTop from "./ScrollToTop.tsx";
// import "react-chartjs-2/dist/react-chartjs-2.css";

import "aos/dist/aos.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RecoilRoot>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
          >
            <ToastContainer />
            <ScrollToTop />
            <Navbar />
            <App />
            <Footer />
          </GoogleOAuthProvider>
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
