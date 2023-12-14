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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./data/store";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import VerifyCode from "./components/ResetPassword/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import axios from "axios";
import { addUserLogged } from "./data/Features/LoggedUser";
import { useRecoilState } from "recoil";
import isLoading from "./data/RecoilState/Loading";
import Loder from "./components/loder/Loder";
// import Form from "./components/Form";
import HandleForm from "./components/HandleForm";
import { typeTravel } from "./data/RecoilState/FormHandling";

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

const test = (firstName: string, lastName: string) => {
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

// App Component
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useRecoilState(isLoading);
  const [typeTravelState] = useRecoilState(typeTravel);

  const oncData = async () => {
    // if notfound token return false
    if (!localStorage.getItem("token")) {
      return setLoading(false);
    }
    // if get token then fetch to data me
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development1"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => dispatch(addUserLogged(data)))
      .catch((error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
          localStorage.removeItem("token");
        }
      });
    setLoading(false);
    return true;
  };
  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  // const [count, setCount] = useState(0)

  useEffect(() => {
    RunDriver();
    oncData();
  }, []);
  // const [dataSearchState] = useRecoilState(dateSearch);

  if (loading) {
    return (
      <div
        className={`z-50 h-[100%] w-full absolute top-0 flex justify-center items-center bg-[#283965]`}
      >
        <Loder />
      </div>
    );
  }

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
        <Route
          path="/search"
          element={<HandleForm oneWay={typeTravelState} />}
        />
      </Routes>
    </>
  );
}

export default App;
