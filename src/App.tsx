// Importing React Hooke
// import { useState } from 'react'
import { useEffect } from "react";
// Styles
import "./App.css";
// react-router-dom
import { Routes, Route } from "react-router-dom";
// Dependencies
import { driver } from "driver.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { RootState } from "./data/store";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import VerifyCode from "./components/ResetPassword/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import jwt from "jsonwebtoken";

// Components
// import Form from './components/Form';

// Handle driver

const handleSteps =
  window.innerWidth > 1024
    ? [
        {
          element: "#intro-element-1",
          popover: {
            title: "Home",
            description: "This is Link Home Page...",
          },
        },
        {
          element: "#intro-element-2",
          popover: { title: "Hotel", description: "This is Link Hotel..." },
        },
        {
          element: "#intro-element-3",
          popover: { title: "Fight", description: "This is Link Fight..." },
        },
      ]
    : [
        {
          element: "#intro-element-4",
          popover: { title: "Toggle", description: "This is Link Toggle..." },
        },
        {
          element: "#intro-element-5",
          popover: {
            title: "Full Screen",
            description: "If you have Full Screen click on this button...",
          },
        },
      ];
const driverObj = driver({
  showProgress: true,
  steps: handleSteps,
});

function RunDriver() {
  // driverObj.drive();
  const runningDriver = localStorage.getItem("driver");

  if (!runningDriver) {
    localStorage.setItem("driver", "true");
    driverObj.drive();
  }
}

export const test = (firstName: string, lastName: string) => {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>Name: {`${firstName} ${lastName}`}</>
      ) : (
        <>login</>
      )}
    </>
  );
};

function oncData() {
  if (!localStorage.getItem("token")) {
    return false;
  }
  // return payload by jwt
  try {
    const token = localStorage.getItem("token") || "";

    // const payload = jwt.verify(token, import.meta.env.VITE_PUBLIC_JWT_SECRET);
    // return payload;
  } catch (err) {
    // err
    console.log(err);
    
  }

}
// App Component
function App() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  // const [count, setCount] = useState(0)

  useEffect(() => {
    RunDriver();
    oncData();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<>{test(stateUserData.firstName, stateUserData.lastName)}</>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
