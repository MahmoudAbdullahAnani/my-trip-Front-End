import { useTranslation } from "react-i18next";
import arrowAnimation from "/public/assets/arrowAnimation.gif";
function AutoScroll() {
  // Lang
  const { t } = useTranslation();

  return (
    <button
      onClick={() => window.scrollBy(0, window.innerHeight)}
      style={{
        border: "1px solid #FFF",
        background: "rgb(17 124 153 / 30%)",
        backdropFilter: "blur(10px)",
      }}
      className={`h-[94px] w-[105px] whitespace-nowrap z-[-1] relative top-[calc(50px+110px)] shadow-lg focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200  hover:bg-opacity-[.90] hidden lg:flex flex-col p-[10px] gap-[10px] text-[#FFFFFF] text-[16px] font-bold justify-center items-center rounded-[16px]`}
    >
      <h4>{t("تمرير لاسفل")}</h4>
      <div>
        <img
          width={100}
          height={100}
          className={`w-[47px] h-[40px]`}
          src={arrowAnimation}
        />
      </div>
    </button>
  );
}

export default AutoScroll;
