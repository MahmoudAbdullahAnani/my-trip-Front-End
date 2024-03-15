import { useTranslation } from "react-i18next";
import { countrys } from "../../../data/Countrys";
import { useRecoilState } from "recoil";
import { CountryNameCars } from "../../../data/RecoilState/car/MainDataCar";

function FieldCountryCar() {
  const { t, i18n } = useTranslation();
  const [, setCountryNameCars] = useRecoilState(CountryNameCars);

  return (
    <div
      dir={i18n.language !== "ar" ? "rtl" : "ltr"}
      className={`flex flex-col gap-[6.15px] justify-start items-end sm:w-fit w-full`}
    >
      <h4 className={`text-[#000]  text-[20px] font-[500] hidden sm:block `}>
        {t("الدولة")}
      </h4>
      <select
        style={{
          boxShadow: "0 4px 4px #005a6c4d",
        }}
        id="nationality"
        // autoCapitalize={"on"}
        autoComplete="on"
        dir={i18n.language !== "ar" ? "rtl" : "ltr"}
        className={`bg-[#FFF] w-full text-center shadow-lg focus:border border-[#117C99] focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 sm:w-[188px] h-[48px] rounded-[8px] sm:text-center sm:px-0 p-[10px] focus-visible:outline-none text-[#117C99] text-[14px] placeholder:text-[14px] font-[500] placeholder:font-[500]`}
        onChange={(e) => setCountryNameCars(e.target.value)}
      >
        <option value={""} disabled>
          {t("اختر")}
        </option>
        {countrys.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FieldCountryCar;
