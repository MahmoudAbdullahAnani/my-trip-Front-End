import { useState } from "react";
import { iconArrowDown, iconArrowTop, iconLang } from "../assets/icons/home";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function LangBtn() {
  const [toggleLang, setToggleLang] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);

  const { i18n } = useTranslation();

  const { pathname } = useLocation();
  return (
    <button
      onClick={() => setToggleOptions(!toggleOptions)}
      className="text-center relative flex justify-center gap-[9px] px-[10px] py-[5px] "
    >
      <span>{toggleOptions ? iconArrowTop : iconArrowDown}</span>
      <span className={`${pathname !== "/" ? "text-[#2e8ca5]" : "text-white"}`}>
        {localStorage.getItem("lang") === "en" ? "English" : "عربي"}
      </span>
      <span>{iconLang}</span>
      <div
        className={`${
          toggleOptions ? "flex" : "hidden"
        } absolute top-[35px] bg-slate-400  flex-col  rounded-b-[8px] w-full`}
      >
        {i18n.language !== "ar" && (
          <span
            onClick={() => {
              setToggleLang(!toggleLang);
              localStorage.setItem("lang", "ar");
              i18n.changeLanguage("ar");
            }}
            className={`cursor-pointer hover:bg-slate-500 w-full px-[10px] py-[10px] rounded-b-[8px]`}
          >
            عربي
          </span>
        )}
        {i18n.language !== "en" && (
          <span
            onClick={() => {
              setToggleLang(!toggleLang);
              localStorage.setItem("lang", "en");
              i18n.changeLanguage("en");
            }}
            className={`cursor-pointer hover:bg-slate-500 w-full px-[10px] py-[10px] rounded-b-[8px]`}
          >
            English
          </span>
        )}
      </div>
    </button>
  );
}

export default LangBtn;
//
