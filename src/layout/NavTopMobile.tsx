import {
  iconArrowDown,
  iconArrowTop,
  iconHi,
  iconUser,
} from "../assets/icons/home";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";

// Component
// import { useRecoilState } from "recoil";
import { allNotifications } from "../data/RecoilState/Notifications/NotificationsData";
import { useEffect, useState } from "react";

import MainOAuthNavbar from "../components/ResetPassword/OAuthNavberDesktop/MainOAuthNavbar";
import {
  SignOutState,
  openLoginPageState,
} from "../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
import DialogComponent from "../components/ResetPassword/OAuthNavberDesktop/DialogComponent";
function NavTopMobile() {
  // const [allNotificationsState] = useRecoilState(allNotifications);
  // console.log("allNotificationsState===> ", allNotificationsState);
  // console.log("publicNotifications===> ", publicNotifications);
  useEffect(() => {}, [allNotifications]);

  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [toggle, setToggle] = useState(false);

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const handleOpenPage = () => setOpenPage(true);

  const [openModel, setOpen] = useRecoilState(SignOutState);
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    if (openModel) {
      setToggle(false);
    }
  }, [openModel]);
  return (
    <>
      <div className={`lg:hidden flex justify-between  mt-[calc(25px+54px)]`}>
        {/* Icon Notifications */}
        {stateUserData._id === "" ? (
          <button
            onClick={handleOpenPage}
            // to={``}
            style={{ border: "1px solid #F9C534" }}
            className={` text-[14px] font-[600] text-[#B6E7FB] hover:text-[#b6e7fb7d] w-[188px] h-[34px] rounded-[10px] text-center flex justify-center items-center `}
          >
            تسجيل الدخول
          </button>
        ) : (
          <MainOAuthNavbar isMobile={true} />
        )}
        {/* Icon User */}
        {toggle && (
          <div
            onClick={() => setToggle(!toggle)}
            className={`bg-[#00000059] overflow-hidden w-[100vw] h-[100vh] absolute left-0 top-0 z-30`}
          ></div>
        )}
        {stateUserData._id === "" ? (
          <>
            <h4 className={`flex gap-[8px] text-[17px] font-[400]`}>
              <span>{iconHi}</span>
              <span>مرحبا بك</span>
            </h4>
            <div className={`rounded-full`}>{iconUser}</div>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setToggle(!toggle)}
              id="dropdownAvatarNameButton"
              data-dropdown-toggle="dropdownAvatarName"
              className="flex items-center gap-1 text-sm pe-1 z-50  font-medium rounded-full hover:text-blue-600 md:me-0 text-white"
              type="button"
            >
              {/* {iconUser} */}
              <span className="sr-only">Open user menu</span>

              <span className="truncate">{`${stateUserData.firstName} ${stateUserData.lastName}`}</span>
              {toggle ? iconArrowTop : iconArrowDown}
            </button>

            <div
              id="dropdownAvatarName"
              className={`${
                toggle ? "block" : "hidden"
              } z-50 top-[30px] -left-10 absolute bg-white divide-y rounded-lg shadow`}
            >
              <div className="px-4 py-3 text-sm text-gray-900 ">
                <div className="truncate">{stateUserData.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <button
                onClick={handleOpen}
                className={`w-full text-center p-2 hover:text-red-400`}
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        )}
      </div>
      <DialogComponent isMobile={true} stylesBtn="" />
    </>
  );
}

export default NavTopMobile;
