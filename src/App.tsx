// Importing React Hooke
// import { useState } from 'react'
import { useEffect } from "react";
// Styles
import "./App.css";
// react-router-dom
import { Routes, Route } from "react-router-dom";
// Dependencies
import { driver } from "driver.js";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { useDispatch } from "react-redux";
// import { RootState } from "./data/store";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import VerifyCode from "./components/ResetPassword/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import axios from "axios";
import { addUserLogged } from "./data/Features/LoggedUser";
import { useRecoilState } from "recoil";
import isLoading from "./data/RecoilState/Loading";
import { Loder } from "./components/loder/Loder";

import {
  allNotifications,
  privateNotifications,
  publicNotifications,
  reRenderData,
} from "./data/RecoilState/Notifications/NotificationsData";
import Home from "./pages/Home";
import Search from "./pages/Air/Search";
import For04 from "./pages/For04";
import AirData from "./pages/Air/AirData";
import AirPay from "./pages/Air/AirPay";
// import NavTopMobile from "./layout/NavTopMobile";

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

// const test = (firstName: string, lastName: string) => {
//   return (
//     <>
//       {localStorage.getItem("token") ? (
//         <>Name: {`${firstName} ${lastName}`}</>
//       ) : (
//         <>login</>
//       )}
//     </>
//   );
// };

// App Component
function App() {
  const [, setAllNotifications] = useRecoilState(allNotifications);
  const [publicNotificationsState, setPublicNotifications] =
    useRecoilState(publicNotifications);
  const [privateNotificationsState, setPrivateNotifications] =
    useRecoilState(privateNotifications);
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);
  const getPublicNotifications = async () => {
    // if get token then fetch to data me
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/public/notifications`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/public/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async ({ data }) => {
        setPublicNotifications(data?.AllNotifications);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
          localStorage.removeItem("token");
        }
      });
    // setLoading(false);
    return true;
  };
  const getPrivateNotifications = async () => {
    // if get token then fetch to data me
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/notificationsUserMe`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/notificationsUserMe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async ({ data }) => {
        // console.log(data?.Notifications);
        setPrivateNotifications(data?.Notifications);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
          localStorage.removeItem("token");
        }
      });
    // setLoading(false);
    return true;
  };
  const handleAllNotifications = () => {
    const allNotifications = [
      ...publicNotificationsState,
      ...privateNotificationsState,
    ];
    setAllNotifications(allNotifications);
    setReRenderDataApp(!reRenderDataApp);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useRecoilState(isLoading);

  const oncData = async () => {
    // if notfound token return false
    if (!localStorage.getItem("token")) {
      return setLoading(false);
    }
    // if get token then fetch to data me
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async ({ data }) => {
        dispatch(addUserLogged(data));
        await getPublicNotifications();
        await getPrivateNotifications();
        handleAllNotifications();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
          localStorage.removeItem("token");
        }
      });
    setLoading(false);
    return true;
  };
  // const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);

  // const [count, setCount] = useState(0)

  useEffect(() => {
    RunDriver();
    oncData();
  }, [reRenderDataApp]);
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
      <Login />
      <Signup />
      <Routes>
        <Route path="/*" element={<For04 />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/airData" element={<AirData />} />
        <Route path="/airPay" element={<AirPay />} />
      </Routes>
    </>
  );
}

export default App;
