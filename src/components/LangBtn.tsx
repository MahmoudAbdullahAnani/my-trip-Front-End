import { iconLang } from "../assets/icons/home";
import { useTranslation } from "react-i18next";

function LangBtn() {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={() => {
        localStorage.setItem("lang", i18n.language === "ar" ? "en" : "ar");
        i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
      }}
      className="text-center relative flex justify-center gap-[9px] px-[10px] py-[5px] "
    >
      {localStorage.getItem("lang") === "en" ? "English" : "عربي"}

      <span>{iconLang}</span>
    </button>
  );
}

export default LangBtn;
//
