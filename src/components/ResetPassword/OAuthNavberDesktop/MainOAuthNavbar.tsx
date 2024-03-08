import { useSelector } from "react-redux";
import DialogComponent from "./DialogComponent";
import { RootState } from "../../../data/store";
import { useState } from "react";
import { iconArrowDown, iconArrowTop } from "../../../assets/icons/home";
import NotificationComponent from "../../Home/Systems/Notification/NotificationComponent";
import { Link, useLocation } from "react-router-dom";
// import LangBtn from "../../LangBtn";
import { useTranslation } from "react-i18next";

function MainOAuthNavbar({ isMobile = false }: { isMobile?: boolean }) {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [toggle, setToggle] = useState(false);

  // Lang
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div
      className={`lg:w-[240px] lg:h-[58px] bg-[#FFFFFF] rounded-[8px] ${
        pathname !== "/" ? "" : "lg:border"
      }  border-[#117C99] lg:px-[10px] text-[#117C99]`}
    >
      {/* <div className={``}></div> */}
      {toggle && (
        <div
          onClick={() => setToggle(!toggle)}
          className={`bg-[#00000059] overflow-hidden w-[100%] h-[100vw] absolute left-0 top-0 z-30`}
        ></div>
      )}
      {!isMobile && (
        <div className="relative flex h-full justify-between">
          <NotificationComponent isMobile={isMobile} />

          <button
            onClick={() => setToggle(!toggle)}
            id="dropdownAvatarNameButton"
            data-dropdown-toggle="dropdownAvatarName"
            className={`flex justify-center items-center `}
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

          <div
            id="dropdownAvatarName"
            className={`${
              toggle ? "block" : "hidden"
            } z-50 top-[55px] absolute bg-white divide-y rounded-lg shadow`}
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
                  to={"/profile/trips"}
                  className="block text-end px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {t("رحلتي")}
                </Link>
              </li>
              {/* <li>
                <LangBtn />
              </li> */}
            </ul>
            <div className="py-2">
              <DialogComponent
                stylesBtn={`text-[#000] hover:text-red-400 font-medium text-center  w-full`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainOAuthNavbar;
