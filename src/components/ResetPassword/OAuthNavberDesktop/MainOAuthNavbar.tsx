import { useSelector } from "react-redux";
import DialogComponent from "./DialogComponent";
import { RootState } from "../../../data/store";
import { useState } from "react";
import { iconArrowDown, iconArrowTop } from "../../../assets/icons/home";
import NotificationComponent from "../../Home/Systems/Notification/NotificationComponent";

function MainOAuthNavbar({ isMobile = false }: { isMobile?: boolean }) {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className={``}>
        <NotificationComponent isMobile={isMobile} />
      </div>
      {toggle && (
        <div
          onClick={() => setToggle(!toggle)}
          className={`bg-[#00000059] overflow-hidden w-[100vw] h-[100vw] absolute left-0 top-0 z-30`}
        ></div>
      )}
      {!isMobile && (
        <div className="relative">
          <button
            onClick={() => setToggle(!toggle)}
            id="dropdownAvatarNameButton"
            data-dropdown-toggle="dropdownAvatarName"
            className="flex items-center gap-1 text-sm pe-1 z-50 absolute font-medium rounded-full hover:text-blue-600 md:me-0 text-white"
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
            } z-50 top-[30px] absolute bg-white divide-y rounded-lg shadow`}
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
            <div className="py-2">
              <DialogComponent
                stylesBtn={`text-[#000] hover:text-red-400 font-medium text-center  w-full`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainOAuthNavbar;