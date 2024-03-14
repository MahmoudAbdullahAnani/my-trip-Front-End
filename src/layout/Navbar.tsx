// react-router-dom
import { Link, useLocation } from "react-router-dom";
// Images
import logo from "./../../public/assets/logo.png";
// create context
// Importing States
// import { useRecoilState } from "recoil";
// import sidBar from "../data/RecoilState/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import { iconArithmetic, iconHome, iconTicket } from "../assets/icons/home";
import { useState } from "react";
import { useRecoilState } from "recoil";
// import { TypeSystemSearch } from "../data/RecoilState/Search/TypeSystemSearch";
import { openLoginPageState } from "../data/RecoilState/AuthStatePages/Auth";
import MainOAuthNavbar from "../components/ResetPassword/OAuthNavberDesktop/MainOAuthNavbar";
import { useTranslation } from "react-i18next";
import LangBtn from "../components/LangBtn";
// import { typeSystem } from "../data/RecoilState/FormHandling";
function Navbar() {
  // const [toggle, setToggle] = useRecoilState(sidBar);
  const { pathname } = useLocation();
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [scrollY, setScrollY] = useState(0);
  document.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });

  // const [typeSystemSearchState] = useRecoilState(TypeSystemSearch);
  // const [typeSystemState] = useRecoilState(typeSystem);

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const handleOpenPage = () => setOpenPage(true);

  // Lang
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Desktop */}
      <nav
        className={`hidden lg:flex justify-between  ${
          pathname !== "/" ? "sticky" : "absolute"
        }  w-full top-[-1px]  z-50 `}
      >
        <div
          className={`lg:flex justify-  ${
            pathname !== "/search" &&
            pathname !== "/airData" &&
            pathname !== "/airPay" &&
            pathname !== "/dashboard" &&
            pathname !== "/profile/friends" &&
            pathname !== "/search/hotel" &&
            pathname !== "/profile"
              ? "fixed"
              : ""
          } top-0 w-full  p-0 px-[96px] ${
            pathname !== "/search" && scrollY > innerHeight
              ? "backdrop-blur-md"
              : ""
          }  ${
            pathname === "/search" ||
            pathname === "/airData" ||
            pathname === "/airPay" ||
            pathname === "/profile/friends" ||
            pathname === "/profile" ||
            pathname === "/dashboard" ||
            pathname === "/search/hotel" ||
            pathname === "/profile/trips"
              ? "bg-[#FFF] border border-x-0 border-t-0 shadow-sm shadow-[#656565]"
              : ""
          } `}
        >
          {/* OAuth */}
          <div className={`flex items-center pt-[32px] text-white`}>
            {localStorage.getItem("token") || stateUserData._id.length > 0 ? (
              <div className={``}>
                <MainOAuthNavbar />
              </div>
            ) : (
              <>
                <button
                  onClick={handleOpenPage}
                  // to={``}
                  style={{ border: "1px solid #F9C534" }}
                  className={` text-[14px] font-[600] text-[#B6E7FB] hover:text-[#b6e7fb7d] w-[188px] h-[34px] rounded-[10px] text-center flex justify-center items-center `}
                >
                  {t("تسجيل الدخول")}
                </button>
              </>
            )}
            <div
              className={`${
                localStorage.getItem("token") ? "lg:ms-[55px]" : "lg:ms-[84px]"
              }  border  ${
                pathname === "/" ? "border-[#FFFFFF]" : "border-[]"
              } rounded-[8px] relative bottom-[5px]`}
            >
              <LangBtn />
            </div>
          </div>
          {/* Links */}
          <div
            className={`flex mx-auto lg:gap-[28px] pt-[32px] gap-[40px]`}
            dir={i18n.language !== "ar" ? "rtl" : "ltr"}
          >
            {[
              {
                id: 4,
                title: "الخطط",
                href: "/plans",
                driver: "intro-element-4",
              },
              {
                id: 3,
                title: "توصيل",
                href: "/contactUs",
                stateName: "car",

                driver: "intro-element-3",
              },
              {
                id: 2,
                title: "فنادق",
                href: "/hotel",
                stateName: "hotel",
                driver: "intro-element-2",
              },
              {
                id: 1,
                title: "طيران",
                href: "/",
                stateName: "air",
                driver: "intro-element-1",
              },
            ].map(({ driver, id, title, href }) => (
              <div key={id + Math.random()}>
                <Link
                  to={href}
                  id={driver}
                  className={`text-[18px] font-[600] whitespace-nowrap ${
                    pathname !== "/" && pathname !== "/hotel"
                      ? "text-[#117c99b3]"
                      : "text-[#FFF]"
                  } hover:text-[#117C99]  duration-200 `}
                >
                  {t(title)}
                </Link>
              </div>
            ))}
          </div>

          {/* Logo */}
          <Link className={`ms-auto`} to={`/`}>
            <img
              width={100}
              height={100}
              src={logo}
              className={`text-slate-400 font-bold text-4xl duration-300`}
              style={{ fontSize: "3rem" }}
            />
          </Link>
        </div>
      </nav>

      {/* Mob */}

      <nav
        style={{
          boxShadow: "0px 1px 10px 0px rgba(0, 90, 108, 0.30)",
        }}
        className={`lg:hidden items-center h-[80px] fixed w-full bottom-0 z-50 flex  justify-between bg-[#FFF] ps-[26px] pe-[16px]`}
      >
        {[
          {
            id: 4,
            title: "لوحة التحكم",
            route: "/dashboard",
            icon: iconArithmetic,
          },
          {
            id: 3,
            title: "حسابي",
            route: "/arithmetic",
            icon: iconArithmetic,
          },
          { id: 2, title: "التذكرة", route: "/hotel", icon: iconTicket },
          { id: 1, title: "الرئيسية", route: "/", icon: iconHome },
        ].map(({ icon, route, title, id }) => (
          <Link
            // style={{
            //   background: "rgba(0, 90, 108, 0.30)",
            // }}
            className={`flex justify-center ${
              pathname === route && "bg-[#005A6C4D]"
            } items-center gap-[2px] h-[48px] rounded-[16px] duration-300 px-[10px] py-[16px] text-center ${
              stateUserData.role === "user" && id === 4 && "hidden"
            }`}
            to={`${route}`}
            key={`${id}----${Math.random()}`}
          >
            {pathname === route && (
              <span className={`text-[14px] font-bold text-[#005A6C]`}>
                {title}
              </span>
            )}
            <span>{icon}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Navbar;

/*

${
                    pathname !== "/dashboard" &&
                    pathname !== "/search" &&
                    pathname !== "/airData" &&
                    pathname !== "/airPay" &&
                    pathname !== "/profile/friends" &&
                    pathname !== "/profile/trips" &&
                    pathname !== "/profile"
                      ? href === pathname
                        ? "text-[#117C99]"
                        : "text-[#FFF]"
                      : typeSystemSearchState === "airline" && title === "طيران"
                      ? "text-[#117C99]"
                      : typeSystemSearchState === "hotels" && title === "فنادق"
                      ? "text-[#117C99]"
                      : typeSystemSearchState === "delivery" &&
                        title === "توصيل"
                      ? "text-[#117C99]"
                      : "text-[#656565]"
                  }
*/
