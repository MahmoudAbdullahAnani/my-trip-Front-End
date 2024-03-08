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
  HolderNotifications,
  SignOutState,
  openLoginPageState,
} from "../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
import DialogComponent from "../components/ResetPassword/OAuthNavberDesktop/DialogComponent";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangBtn from "../components/LangBtn";
import NotificationComponent from "../components/Home/Systems/Notification/NotificationComponent";
function NavTopMobile() {
  // const [allNotificationsState] = useRecoilState(allNotifications);
  // console.log("allNotificationsState===> ", allNotificationsState);
  // console.log("publicNotifications===> ", publicNotifications);
  useEffect(() => {}, [allNotifications]);

  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [toggle, setToggle] = useState(false);
  const [toggleNotification, setToggleNotification] =
    useRecoilState(HolderNotifications);

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const handleOpenPage = () => setOpenPage(true);

  const [openModel, setOpen] = useRecoilState(SignOutState);
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    if (openModel) {
      setToggle(false);
    }
  }, [openModel]);

  // Lang
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const bodyHight = document.body.scrollHeight;

  return (
    <>
      <div className={`lg:hidden flex justify-between  mt-[calc(25px+54px)]`}>
        {/* Icon User */}
        {toggle && (
          <div
            onClick={() => setToggle(!toggle)}
            style={{ height: `${bodyHight}px` }}
            className={`bg-[#00000059] overflow-hidden w-full h-[100vh] absolute left-0 top-0 z-30`}
          ></div>
        )}
        {toggleNotification && (
          <div
            onClick={() => setToggleNotification(!toggleNotification)}
            style={{ height: `${bodyHight}px` }}
            className={`bg-[#00000059] overflow-hidden w-full h-[100vh] absolute left-0 top-0 z-30`}
          ></div>
        )}
        {stateUserData._id === "" ? (
          <div className={`flex justify-center gap-[10px]`}>
            <h4 className={`flex gap-[8px] text-[17px] font-[400]`}>
              <span>{iconHi}</span>
              <span>مرحبا بك</span>
            </h4>
            <div className={`rounded-full`}>{iconUser}</div>
          </div>
        ) : (
          <div className="relative">
            <div
              className={`flex justify-center items-center border border-[#117C99] p-2 relative bottom-[20px] bg-[#FFFFFF] rounded-[8px]`}
            >
              <NotificationComponent isMobile={true} />
              <button
                onClick={() => setToggle(!toggle)}
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                className={`flex justify-center items-center`}
                type="button"
              >
                {/* {iconUser} */}

                <span className="truncate flex me-[10px]">
                  {toggle ? iconArrowTop : iconArrowDown}
                  {`${stateUserData.firstName}`}
                </span>
                <img
                  alt={`${stateUserData.firstName}-${stateUserData.lastName}`}
                  className="w-[48px] h-[48px] rounded-full "
                  src={
                    stateUserData.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  }
                />
              </button>
            </div>
            {/* <button
              onClick={() => setToggle(!toggle)}
              id="dropdownAvatarNameButton"
              data-dropdown-toggle="dropdownAvatarName"
              className="flex items-center gap-1 text-sm pe-1 z-50  font-medium rounded-full hover:text-blue-600 md:me-0 text-white"
              type="button"
            >
              <span className="sr-only">Open user menu</span>

              <span className="truncate">{`${stateUserData.firstName} ${stateUserData.lastName}`}</span>
              {toggle ? iconArrowTop : iconArrowDown}
            </button> */}

            <div
              id="dropdownAvatarName"
              className={`${
                toggle ? "block" : "hidden"
              } z-50 top-[30px] absolute bg-white divide-y rounded-lg shadow`}
              dir={i18n.language !== "ar" ? "rtl" : "ltr"}
            >
              <div className="px-4 py-3 text-sm text-gray-900 ">
                <div className="truncate">{stateUserData.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li>
                  <Link
                    to={`/profile`}
                    onClick={() => setToggle(!toggle)}
                    className="block text-end px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {t("حسابي التعريفي")}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setToggle(!toggle)}
                    to={`/profile/friends`}
                    className="block text-end px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {t("الأصدقاء")}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setToggle(!toggle)}
                    to={`/profile/trips`}
                    className="block text-end px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {t("رحلتي")}
                  </Link>
                </li>
                {/* <li>
                  <LangBtn />
                </li> */}
              </ul>
              <button
                onClick={handleOpen}
                className={`w-full text-center p-2 hover:text-red-400`}
              >
                {t("تسجيل الخروج")}
              </button>
            </div>
          </div>
        )}
        {/* Icon Notifications */}
        {stateUserData._id === "" ? (
          <div
            className={`flex flex-col gap-[15px] relative bottom-[10px] w-[150px]`}
          >
            <button
              onClick={handleOpenPage}
              // to={``}
              style={{ border: "1px solid #F9C534" }}
              className={` text-[14px] font-[600] text-[#B6E7FB] hover:text-[#b6e7fb7d] w-full h-[34px] rounded-[10px] text-center flex justify-center items-center `}
            >
              {t("تسجيل الدخول")}
            </button>
            <div
              className={`${
                localStorage.getItem("token") ? "lg:ms-[184px]" : "lg:ms-[84px]"
              }  border  ${
                pathname === "/" ? "border-[#FFFFFF]" : "border-[#2e8ca5]"
              } rounded-[8px] relative bottom-[5px] w-full`}
            >
              <LangBtn />
            </div>
          </div>
        ) : (
          <>
            <MainOAuthNavbar isMobile={true} />
          </>
        )}
        <div
          className={`${
            localStorage.getItem("token") ? "lg:ms-[184px]" : "lg:ms-[84px]"
          }  border  ${
            pathname === "/" ? "border-[#FFFFFF]" : "border-[#2e8ca5]"
          } rounded-[8px] ${
            stateUserData._id === "" && "hidden"
          } relative bottom-[5px] ms-auto max-w-[150px] h-fit`}
        >
          <LangBtn />
        </div>
      </div>
      <DialogComponent isMobile={true} stylesBtn="" />
    </>
  );
}

export default NavTopMobile;
