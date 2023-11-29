// import { useState } from 'react'
import './App.css'
import { driver } from "driver.js";
import { useEffect } from "react";
import Form from './components/Form';
import Home from "./pages/home/Home.jsx";


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
    localStorage.setItem("driver", 'true');
    driverObj.drive();
  }
}
function App() {
  // const [count, setCount] = useState(0)

    useEffect(() => {
      RunDriver();
    }, []);

  return (
    <>
    </>
  );
}

export default App
