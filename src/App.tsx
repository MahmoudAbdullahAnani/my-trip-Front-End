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
const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: "#some-element",
      popover: {
        title: "Title",
        description: "ده تيست يا مخلص ماشي متبقاش ذكي ",
      },
    },
    {
      element: "#some-element2",
      popover: { title: "Title", description: "Description" },
    },
  ],
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
