import { Link, useLocation } from "react-router-dom";
import {
  iconUserInProfileActive,
  iconUserInProfile,
  iconFriendsInProfileActive,
  iconFriendsInProfile,
  iconTripInProfile,
  iconProfileArrowActive,
  iconProfileArrow,
} from "../../assets/icons/home";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: `${Math.random}--1`,
    title: "حسابي التعريفي",
    icon: iconUserInProfile,
    iconActive: iconUserInProfileActive,
    to: "/profile",
  },
  {
    id: `${Math.random}--2`,
    title: "الأصدقاء",
    icon: iconFriendsInProfile,
    iconActive: iconFriendsInProfileActive,
    to: "/profile/friends",
  },
  {
    id: `${Math.random}--3`,
    title: "رحلتي",
    icon: iconTripInProfile,
    iconActive: iconTripInProfile,
    to: "/profile/trips",
  },
];
function ControllerProfile() {
  const { pathname } = useLocation();
  // handle lang
  const { t, i18n } = useTranslation();

  return (
    <>
      {data.map(({ icon, iconActive, id, title, to }) => {
        return (
          <Link
            to={to}
            key={id}
            className={`flex gap-[8px] h-[40px] w-full items-center justify-center border border-x-0 border-t-0 border-[#DDDDDD]`}
            dir={i18n.language !== "ar" ? "ltr" : "rtl"}
          >
            {pathname !== to ? icon : iconActive}
            <h3
              className={`text-[16px]  font-${
                pathname === to ? "bold" : "medium"
              }  text-[${pathname === to ? "#117C99" : "#231F20"}]`}
              // dir="ltr"
            >
              {t(title)}
            </h3>
            {pathname === to ? (
              <span className={`${i18n.language === "en" ? "rotate-180" : ""}`}>
                {iconProfileArrowActive}
              </span>
            ) : (
              <span className={`${i18n.language === "en" ? "rotate-180" : ""}`}>
                {iconProfileArrow}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

export default ControllerProfile;
