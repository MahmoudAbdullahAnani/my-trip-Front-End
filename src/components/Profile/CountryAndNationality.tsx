import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { countrys } from "../../data/Countrys";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface TypeComponent {
  data: {
    nationality: string;
    country: string;
  };
  topTitleStyle: string;
  titleStyle: string;
  iconStyle: JSX.Element;
}
function CountryAndNationality({ data, iconStyle }: TypeComponent) {
  const { nationality, country } = data;

  // Handle Name
  const [nationalityNumberChanges, setNationalityNumberChange] = useState(true);
  const [countryChanges, setCountryNumberChange] = useState(true);
  const [nationalityBeforeChange, setNationalityBeforeChange] = useState(
    nationality ? nationality : ""
  );
  const [countryBeforeChange, setCountryBeforeChange] = useState(
    country ? country : ""
  );
  const nationalityRef = useRef(null);
  const countryRef = useRef(null);

  // Handle country
  const countrysFilter = countrys.filter(({ code }) => code !== country);
  const countrysIsChoose = countrys.find(({ code }) => code === country);
  // Handle Nationality
  const nationalityFilter = countrys.filter(
    ({ code }) => code !== nationality || ""
  );
  const nationalityIsChoose = countrys.find(
    ({ code }) => code === nationality || ""
  );

  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const updatePassportAndCountry = async () => {
    const token = localStorage.getItem("token") || "";
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/me`,
        {
          country: countryBeforeChange,
          nationality: nationalityBeforeChange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setReRenderDataApp(!reRenderDataApp))
      .catch((err) => console.log("Country And Passport===> ", err));
  };
  const [errorNationality, setErrorNationality] = useState("");
  const [errorCountry, setErrorCountry] = useState("");

  const [toggleSave, setToggleSave] = useState(true);

  // handle lang
  const { t, i18n } = useTranslation();

  
  return (
    <div
      className={`w-full mt-[24px]`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div
        className={`flex sm:flex-nowrap flex-wrap items-end justify-start gap-[10px] w-full`}
      >
        <div className={`flex sm:flex-nowrap flex-wrap gap-[24px] `}>
          <div className="w-full max-w-[448px] flex flex-col gap-[5px]">
            <h5 className={`text-[#000000] text-[16px] font-medium`}>
              {t("الجنسية")}
            </h5>
            <select
              style={{
                boxShadow: "0 4px 4px #005a6c4d",
              }}
              disabled={nationalityNumberChanges}
              ref={nationalityRef}
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              id="nationality"
              className={`max-w-[212px] h-[42px] px-[12px] py-[9px] rounded-[8px]`}
              onChange={(e) => setNationalityBeforeChange(e.target.value)}
            >
              <option value={nationalityIsChoose?.code || ""} disabled>
                {nationalityIsChoose?.name || t("اختر")}
              </option>
              {nationalityFilter.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            {errorNationality && (
              <span className={`text-red-500 text-[12px]`}>
                {errorNationality}
              </span>
            )}
          </div>
          <div className="w-full max-w-[448px] flex flex-col gap-[5px]">
            <h5 className={`text-[#000000] text-[16px] font-medium`}>
              {t("الدولة")}
            </h5>
            <select
              style={{
                boxShadow: "0 4px 4px #005a6c4d",
              }}
              disabled={countryChanges}
              ref={countryRef}
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              id="nationality"
              className={`max-w-[212px] h-[42px] px-[12px] py-[9px] rounded-[8px]`}
              onChange={(e) => setCountryBeforeChange(e.target.value)}
            >
              <option value={countrysIsChoose?.code || ""}>
                {countrysIsChoose?.name || t("اختر")}
              </option>
              {countrysFilter.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            {errorCountry && (
              <span className={`text-red-500 text-[12px]`}>{errorCountry}</span>
            )}
          </div>
        </div>
        <button
          name="save"
          onClick={() => {
            setErrorNationality("");
            setErrorCountry("");
            setToggleSave(!toggleSave);
            if (nationalityNumberChanges || countryChanges) {
              setNationalityNumberChange(false);
              setCountryNumberChange(false);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return nationalityRef.current.focus();
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            nationalityRef.current.blur();
            setNationalityNumberChange(false);
            setCountryNumberChange(false);
            return updatePassportAndCountry();
          }}
          className="rounded-[16px] w-[48px] h-[48px] bg-[#ffffff99] hover:bg-[#ffffff2c] duration-200"
        >
          {/* passportBeforeChange === `${firstName} ${lastName}` || */}
          {toggleSave ? iconStyle : t("حفظ")}
        </button>
      </div>
    </div>
  );
}

export default CountryAndNationality;
