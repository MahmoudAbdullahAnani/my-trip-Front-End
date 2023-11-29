"use client";
import { useState } from "react";
// MUI
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
// react-router-dom
import { Link } from "react-router-dom";

// create context

function Navbar() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav
        className={`hidden  lg:flex justify-between  h-[4.625rem] bg-[#283965] sticky top-[-1px]  z-50  `}
      >
        <div className="lg:flex justify-between items-center w-full  p-0 px-[7.5rem] ">
          {/* Logo */}
          <div>
            <ConnectingAirportsIcon
              className={`text-slate-400 font-bold text-4xl duration-300`}
              style={{ fontSize: "3rem" }}
            />
          </div>
          {/* Links */}
          <div className={`flex  lg:gap-[28px] gap-[40px]`}>
            {[
              { id: 1, title: "Home", href: "/", driver: "intro-element-1" },
              {
                id: 2,
                title: "Hotel",
                href: "/hotel",
                driver: "intro-element-2",
              },
              {
                id: 3,
                title: "Fight",
                href: "/fight",
                driver: "intro-element-3",
              },
            ].map(({ driver, id, title, href }) => (
              <Link
                key={id + Math.random()}
                to={href}
                id={driver}
                className={`text-[1rem] font-medium whitespace-nowrap text-[#FFF] hover:text-[#b0b0b0e5]  `}
              >
                <button>{title}</button>
              </Link>
            ))}
          </div>
          <div className={`flex gap-4 text-white`}>
            <Link to={`/login`} className={``}>
              Login
            </Link>
            <Link to={`/signup`} className={``}>
              Signup
            </Link>
          </div>
        </div>
      </nav>

      <nav
        style={{
          borderBottom: "1px solid #0000001c",
          paddingBottom: "5px",
          boxShadow: "0px 0px 7px -4px dimgrey",
        }}
        className={`lg:hidden pt-[.8rem] block justify-between gap-5   ${
          toggle ? "bg-[#FFF]" : "bg-[#F5F5F5]"
        }  items-center sticky top-0 z-50`}
      >
        {/* Logo */}
        <div
          className={`flex justify-between w-full items-center  ps-[0.75rem] pe-[1.625rem]`}
        >
          <div className="flex gap-3 items-center">
            <ConnectingAirportsIcon
              className={`text-slate-400 font-bold text-4xl duration-300`}
              style={{ fontSize: "2rem" }}
            />
          </div>
          <button
            id="intro-element-5"
            onClick={() => {
              const el = document.getElementById("root");
              const isFullScreen = document.fullscreenElement;
              if (isFullScreen) {
                document.exitFullscreen();
              } else {
                el?.requestFullscreen();
              }
            }}
          >
            <FullscreenIcon />
          </button>
          {!toggle ? (
            <div id="intro-element-4" className="flex items-center gap-10">
              <button
                className="h-fit w-fit"
                onClick={() => {
                  if (toggle) {
                    setToggle(false);
                  } else {
                    setToggle(true);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path d="M3.5 21H24.5" stroke="#262626" />
                  <path d="M3.5 14H24.5" stroke="#262626" />
                  <path d="M3.5 7H24.5" stroke="#262626" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="h-fit w-fit"
              onClick={() => {
                if (toggle) {
                  setToggle(false);
                } else {
                  setToggle(true);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
              >
                <path
                  d="M29.2199 17.6776L17.9062 28.9913C17.5196 29.3778 16.8785 29.3778 16.492 28.9913C16.1054 28.6047 16.1054 27.9636 16.492 27.5771L27.8057 16.2634C28.1922 15.8768 28.8333 15.8768 29.2199 16.2634C29.6064 16.6499 29.6064 17.291 29.2199 17.6776Z"
                  fill="#292D32"
                />
                <path
                  d="M29.2199 28.9915C28.8333 29.3781 28.1922 29.3781 27.8057 28.9915L16.492 17.6778C16.1054 17.2913 16.1054 16.6501 16.492 16.2636C16.8785 15.877 17.5196 15.877 17.9062 16.2636L29.2199 27.5773C29.6064 27.9639 29.6064 28.605 29.2199 28.9915Z"
                  fill="#292D32"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Side */}

        <div
          className={`absolute top-16 z-50 h-[100vh] left-0 pt-12 ${
            toggle ? "w-full" : "w-0"
          } duration-300 overflow-hidden bg-[#FFF]`}
        >
          {/* Links */}
          <div
            style={{ fontFamily: "Inter" }}
            className={`flex flex-col gap-[16px]  px-8`}
          >
            {[
              {
                id: 1,
                title: "Home",
                href: "/",
                showLine: true,
              },
              {
                id: 2,
                title: "Hotel",
                href: "/hotel",
                showLine: true,
              },
              {
                id: 3,
                title: "Fight",
                href: "/fight",
                showLine: true,
              },
            ].map(({ id, title, href, showLine = false }) => (
              <Link
                onClick={() => {
                  setToggle(false);
                }}
                key={id + Math.random()}
                to={href}
                className={`text-sm pb-[16px]    whitespace-nowrap ${
                  showLine && "border-b-2"
                } border-[#E5E5E5] text-[#171717]`}
              >
                <button>{title}</button>
              </Link>
            ))}
            <div
              className={`flex gap-4 text-white bg-emerald-400 justify-around  rounded-lg`}
            >
              <Link
                onClick={() => {
                  setToggle(false);
                }}
                to={`/login`}
                className={`py-2 bg-emerald-500 text-center w-[40%]`}
              >
                Login
              </Link>
              <Link
                onClick={() => {
                  setToggle(false);
                }}
                to={`/signup`}
                className={`py-2 w-[40%] bg-emerald-500 text-center`}
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
