import { useState } from "react";
import { iconArrowDown, iconArrowTop, iconLang } from "../assets/icons/home";
import { useTranslation } from "react-i18next";

function LangBtn() {
  const [toggleLang, setToggleLang] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);

  const { i18n } = useTranslation();

  return (
    <button
      onClick={() => setToggleOptions(!toggleOptions)}
      className="text-center relative flex justify-center gap-[9px] px-[10px] py-[5px] border-white w-full rounded-[8px] hover:bg-white hover:text-black"
    >
      <span>{toggleOptions ? iconArrowTop : iconArrowDown}</span>
      <span className={``}>{localStorage.getItem("lang")==="en" ? "English" : "عربي"}</span>
      <span>{iconLang}</span>
      <div
        className={`${
          toggleOptions ? "flex" : "hidden"
        } absolute top-10 bg-slate-400  flex-col  rounded-[8px] w-full`}
      >
        {i18n.language !== "ar" && (
          <span
            onClick={() => {
              setToggleLang(!toggleLang);
              localStorage.setItem("lang", "ar");
              i18n.changeLanguage("ar");
            }}
            className={`cursor-pointer hover:bg-slate-500 w-full px-[10px] py-[10px] rounded-[8px]`}
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
            className={`cursor-pointer hover:bg-slate-500 w-full px-[10px] py-[10px] rounded-[8px]`}
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
