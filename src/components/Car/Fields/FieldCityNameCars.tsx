import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { CityNameCars } from "../../../data/RecoilState/car/MainDataCar";

function FieldCityNameCars() {
  const { t, i18n } = useTranslation();
  const [, setCityNameCars] = useRecoilState(CityNameCars);
  return (
    <div
      dir={i18n.language !== "ar" ? "rtl" : "ltr"}
      className={`flex flex-col gap-[6.15px] justify-start items-end sm:w-fit w-full`}
    >
      <h4 className={`text-[#000]  text-[20px] font-[500] hidden sm:block `}>
        {t("الوصول")}
      </h4>
      <input
        dir={i18n.language !== "ar" ? "rtl" : "ltr"}
        placeholder={t("اكتب مكان الوصول")}
        type={"text"}
        onChange={(e) => setCityNameCars(e.target.value)}
        className={`bg-[#FFF] w-full text-center z-50 shadow-lg focus:border border-[#117C99] focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 sm:w-[188px] h-[48px] rounded-[8px] sm:text-center sm:px-0 p-[10px] focus-visible:outline-none text-[#117C99] text-[14px] placeholder:text-[14px] font-[500] placeholder:font-[500]`}
      />
    </div>
  );
}

export default FieldCityNameCars;
