// react-router-dom
import { Link, useLocation } from "react-router-dom";
import DialogComponent from "../components/DialogComponent";
// Images
import logo from "./../../public/assets/logo.png";
// create context
// Importing States
import { useRecoilState } from "recoil";
import sidBar from "../data/RecoilState/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import { iconArithmetic, iconHome, iconTicket } from "../assets/icons/home";
function Navbar() {
  const [toggle, setToggle] = useRecoilState(sidBar);
  const { pathname } = useLocation();

  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  return (
    <>
      {/* Desktop */}
      <nav
        className={`hidden lg:flex justify-between ${
          pathname !== "/" && "bg-slate-600"
        } sticky top-[-1px]  z-50  `}
      >
        <div className="lg:flex justify-between  w-full  p-0 px-[96px] ">
          <div className={`flex gap-4 pt-[32px] text-white`}>
            {localStorage.getItem("token") || stateUserData._id.length > 0 ? (
              <DialogComponent />
            ) : (
              <Link
                to={`/login`}
                style={{ border: "1px solid #F9C534" }}
                className={` text-[14px] font-[600] text-[#B6E7FB] hover:text-[#b6e7fb7d] w-[188px] h-[34px] rounded-[10px] text-center flex justify-center items-center `}
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
          {/* Links */}
          <div className={`flex  lg:gap-[28px] pt-[32px] gap-[40px]  `}>
            {[
              {
                id: 4,
                title: "الخطط",
                href: "/search",
                driver: "intro-element-4",
              },
              {
                id: 3,
                title: "توصيل",
                href: "/contactUs",
                driver: "intro-element-3",
              },
              {
                id: 2,
                title: "فنادق",
                href: "/hotel",
                driver: "intro-element-2",
              },

              { id: 1, title: "طيران", href: "/", driver: "intro-element-1" },
            ].map(({ driver, id, title, href }) => (
              <div key={id + Math.random()}>
                <Link
                  to={href}
                  id={driver}
                  className={`text-[18px] font-[600] whitespace-nowrap  ${
                    href === pathname ? "text-[#117C99]" : "text-[#FFF]"
                  } hover:text-[#117C99] duration-200 `}
                >
                  {title}
                </Link>
              </div>
            ))}
          </div>
          {/* Logo */}
          <Link to={`/`}>
            <img
              width={100}
              height={100}
              src={logo}
              className={`text-slate-400 font-bold pt-[24px] text-4xl duration-300`}
              style={{ fontSize: "3rem" }}
            />
          </Link>
        </div>
      </nav>

      {/* Mob */}

      <nav
        style={{
          borderBottom: "1px solid #0000001c",
          paddingBottom: "5px",
          fill: "rgba(182, 231, 251, 0.30)",
          strokeWidth: "1px",
          stroke: "#FFF",
          backdropFilter: "blur(10px)",

          boxShadow: "0px 1px 10px 0px rgba(0, 90, 108, 0.30)",
        }}
        className={`lg:hidden pt-[.8rem]  gap-5 items-center h-[50px] absolute w-full bottom-0 z-50 flex justify-between bg-[#FFF] mx-[26px]`}
      >
        {[
          { id: 1, title: "الرئيسية", route: "/", icon: iconHome },
          { id: 2, title: "التذكرة", route: "/ticket", icon: iconTicket },
          {
            id: 3,
            title: "حسابي",
            route: "/arithmetic",
            icon: iconArithmetic,
          },
        ].map(({ icon, route, title, id }) => (
          <Link
            style={{
              background: "rgba(0, 90, 108, 0.30)",
            }}
            className={`flex justify-center items-center gap-[2px] h-[48px] rounded-[16px]  px-[10px] py-[16px] text-center`}
            to={`${route}`}
            key={`${id}----${Math.random()}`}
          >
            {/* <span>{title}</span> */}
            <span>{icon}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
