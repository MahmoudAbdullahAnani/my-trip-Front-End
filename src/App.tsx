// Importing React Hooke
// import { useState } from 'react'
import { useEffect, useState } from "react";
// Styles
import "./App.css";
// react-router-dom
import { Routes, Route } from "react-router-dom";
// Dependencies
import { driver } from "driver.js";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "./data/store";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import VerifyCode from "./components/ResetPassword/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import axios from "axios";
import { addUserLogged } from "./data/Features/LoggedUser";
import { useRecoilState } from "recoil";
import isLoading from "./data/RecoilState/Loading";
// import { Loder } from "./components/loder/Loder";
import {
  // allNotifications,
  // privateNotifications,
  // publicNotifications,
  reRenderData,
} from "./data/RecoilState/Notifications/NotificationsData";
import Home from "./pages/Home";
import Search from "./pages/Air/Search";
import For04 from "./pages/For04";
import AirData from "./pages/Air/AirData";
import AirPay from "./pages/Air/AirPay";
import Profile from "./pages/Profile/Profile";
import VarificationAccount from "./pages/Auth/VarificationAccount";
import Friends from "./pages/Profile/Friends";
import {
  PendingFriends,
  SearchFriendsState,
  SearchUsers,
} from "./data/RecoilState/Profile/Friends";
import TripProfile from "./pages/Profile/TripProfile";
import Dashboard from "./pages/Dashboard";
import { RootState } from "./data/store";
import { HolderNotifications } from "./data/RecoilState/AuthStatePages/Auth";
import Hotels from "./pages/Hotels/Hotels";
import SearchHotels from "./pages/Hotels/SearchHotels";
import HotelsChoose from "./pages/Hotels/HotelsChoose";
import Cars from "./pages/Cars/Cars";
import SearchCars from "./pages/Cars/SearchCars";
// import NavTopMobile from "./layout/NavTopMobile";
import loadStart from "/public/assets/loadStart.gif";
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
  // const [, setAllNotifications] = useRecoilState(allNotifications);
  // const [publicNotificationsState, setPublicNotifications] =
  //   useRecoilState(publicNotifications);
  // const [privateNotificationsState, setPrivateNotifications] =
  //   useRecoilState(privateNotifications);
  // const getPublicNotifications = async () => {
  //   // if get token then fetch to data me
  //   const token = localStorage.getItem("token") || "";
  //   await axios
  //     .get(
  //       import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
  //         ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/public/notifications`
  //         : `${
  //             import.meta.env.VITE_PUBLIC_API_PRODUCTION
  //           }/public/notifications`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(async ({ data }) => {
  //       setPublicNotifications(data?.AllNotifications);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response?.data.statusCode === 401) {
  //         localStorage.removeItem("token");
  //       }
  //     });
  //   // setLoading(false);
  //   return true;
  // };
  // const getPrivateNotifications = async () => {
  //   // if get token then fetch to data me
  //   const token = localStorage.getItem("token") || "";
  //   await axios
  //     .get(
  //       import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
  //         ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/notificationsUserMe`
  //         : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/notificationsUserMe`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(async ({ data }) => {
  //       // console.log(data?.Notifications);
  //       setPrivateNotifications(data?.Notifications);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response?.data.statusCode === 401) {
  //         localStorage.removeItem("token");
  //       }
  //     });
  //   // setLoading(false);
  //   return true;
  // };
  // const handleAllNotifications = () => {
  //   const allNotifications = [
  //     ...publicNotificationsState,
  //     ...privateNotificationsState,
  //   ];
  //   setAllNotifications(allNotifications);
  //   setReRenderDataApp(!reRenderDataApp);
  // };

  const [reRenderDataApp] = useRecoilState(reRenderData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useRecoilState(isLoading);

  const oncData = async () => {
    // if notfound token return false
    if (!localStorage.getItem("token")) {
      return setLoading(false);
    }
    // if get token then fetch to data me
    const token = localStorage.getItem("token") || "";
    let id = "";
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
        id = data._id;
        dispatch(addUserLogged(data));
        // await getPublicNotifications();
        // await getPrivateNotifications();
        // handleAllNotifications();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data.statusCode === 401) {
          localStorage.removeItem("token");
        }
      });
    setLoading(false);
    return id;
  };
  const sendCatchData = async (id: string) => {
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/catch-data`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/catch-data`,
        {
          openWebsite: {
            user_id: id === "undefined" ? "guest" : id,
            isGuest: id === "undefined" ? true : false,
          },
        }
      )
      .then(({ data }) => {
        localStorage.setItem("sessionId", data._id);
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
    return true;
  };

  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);

  // const [count, setCount] = useState(0)
  const [, setPendingFriendsState] = useRecoilState(PendingFriends);
  const getFriends = async () => {
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/pending-friends`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/pending-friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log("friends ==>", res.data);
        setPendingFriendsState(res?.data.pendingFriends);
        // setReRenderDataApp(!reRenderDataApp);
      })
      .catch((err) => {
        // setErrorGender(err);
        console.log("PendingFriends ===> ", err);
      });
  };
  const [timeOutLoading, setTimeOutLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTimeOutLoading(false);
    }, 6009);
    const fetchData = async () => {
      await RunDriver();
      const id = await oncData();
      if (id !== "undefined") {
        getFriends();
      }
      sendCatchData(`${id}`);
    };

    fetchData();
  }, [reRenderDataApp]);
  // const [dataSearchState] = useRecoilState(dateSearch);
  const [searchFriends, setSearchfriends] = useRecoilState(SearchFriendsState);
  const [searchUsersState, setSearchUsersState] = useRecoilState(SearchUsers);
  const [toggleHolderNotifications, setHolderNotificationsToggle] =
    useRecoilState(HolderNotifications);

  if (loading) {
    return (
      // <div
      //   className={`z-50 h-[100%] w-full absolute top-0 flex justify-center items-center bg-[#283965]`}
      // >
      <div
        className={`flex bg-black z-50 fixed h-[100vh] w-[100%] items-center justify-center `}
      >
        <img src={loadStart} className={``} />
      </div>
      // </div>
    );
  }

  return (
    <>
      {timeOutLoading && (
        <div
          className={`flex bg-black z-50 fixed h-[100vh] w-[100%] items-center justify-center `}
        >
          <img src={loadStart} className={``} />
        </div>
      )}
      {searchFriends.count > 0 && (
        <div
          onClick={() => setSearchfriends({ friends: [], count: 0 })}
          style={{ height: `${document.body.scrollHeight}px` }}
          className={`absolute w-full bg-[#00000070]`}
        ></div>
      )}
      {searchUsersState.length > 0 && (
        <div
          onClick={() => setSearchUsersState([])}
          style={{ height: `${document.body.scrollHeight - 100}px` }}
          className={`absolute w-full bg-[#00000070]`}
        ></div>
      )}
      {toggleHolderNotifications && (
        <div
          onClick={() => setHolderNotificationsToggle(false)}
          style={{ height: `${document.body.scrollHeight - 100}px` }}
          className={`absolute w-full bg-[#00000070] lg:z-20 z-10`}
        ></div>
      )}

      {/* OAuth */}
      <Login />
      <Signup />
      <VarificationAccount />
      <ForgotPassword />
      <VerifyCode />
      <ResetPassword />

      <Routes>
        {/* Main */}
        <Route path="/*" element={<For04 />} />
        <Route path="/" element={<Home />} />
        {stateUserData.role !== "user" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}

        {/* Air */}
        <Route path="/search" element={<Search />} />
        <Route path="/airData" element={<AirData />} />
        <Route path="/airPay" element={<AirPay />} />

        {/* Hotels */}
        <Route path="/hotel" element={<Hotels />} />
        <Route path="/search/hotel" element={<SearchHotels />} />
        <Route path="/hotel/choose" element={<HotelsChoose />} />

        {/* Cars */}
        <Route path="/car" element={<Cars />} />
        <Route path="/search/car" element={<SearchCars />} />
        {/* <Route path="/car/choose" element={<CarsChoose />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/friends" element={<Friends />} />
        <Route path="/profile/trips" element={<TripProfile />} />
      </Routes>
    </>
  );
}

export default App;
