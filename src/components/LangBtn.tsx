import { useState } from "react";
import { iconArrowDown, iconArrowTop, iconLang } from "../assets/icons/home";

function LangBtn() {
  const [toggleLang, setToggleLang] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  return (
    <button
      onClick={() => setToggleOptions(!toggleOptions)}
      className="text-center relative flex justify-center gap-[9px] px-[10px] py-[5px]  border-white w-full rounded-[8px] hover:bg-white hover:text-black"
    >
      <span>{toggleLang ? iconArrowTop : iconArrowDown}</span>
      <span className={``}>{toggleLang ? "انجليزي" : "عربي"}</span>
      <span>{iconLang}</span>
      <div
        className={`${
          toggleOptions ? "flex" : "hidden"
        } absolute top-10 bg-slate-400  flex-col  rounded-[8px] w-full`}
      >
        <span
          onClick={() => setToggleLang(!toggleLang)}
          className={`cursor-pointer hover:bg-slate-500 w-full px-[10px] py-[5px] rounded-[8px]`}
        >
          عربي
        </span>
        <span
          onClick={() => setToggleLang(!toggleLang)}
          className={`cursor-pointer hover:bg-slate-500 w-full px-[10px] py-[5px] rounded-[8px]`}
        >
          انجليزي
        </span>
      </div>
    </button>
  );
}

export default LangBtn;
//
