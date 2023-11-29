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
// Components
// import Form from './components/Form';

// Handle driver

const handleSteps = window.innerWidth > 1024 ?[
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
    }
  ] :[
    {
      element: "#intro-element-4",
      popover: { title: "Toggle", description: "This is Link Toggle..." },
    },
    {
      element: "#intro-element-5",
      popover: { title: "Full Screen", description: "If you have Full Screen click on this button..." },
    },
  ]
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

// App Component
function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    RunDriver();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
