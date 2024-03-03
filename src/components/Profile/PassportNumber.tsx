import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface TypeComponent {
  data: {
    passportNumber: string;
  };
  topTitleStyle: string;
  titleStyle: string;
  iconStyle: JSX.Element;
}
function PassportNumber({
  data,
  topTitleStyle,
  titleStyle,
  iconStyle,
}: TypeComponent) {
  const { passportNumber } = data;

  // Handle Name
  const [passportNumberChanges, setPassportNumberChange] = useState(true);
  const [passportBeforeChange, setPassportBeforeChange] = useState(
    `${passportNumber ? passportNumber : ""}`
  );
  const passportRef = useRef(null);
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const updatePassport = async () => {
    const token = localStorage.getItem("token") || "";
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/me`,
        {
          passportNumber: passportBeforeChange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setReRenderDataApp(!reRenderDataApp))
      .catch((error) => {
        console.log("update Name Profile==> ", error);
      });
  };
  const [errorPassport, setErrorPassport] = useState("");

  // handle lang
  const { t, i18n } = useTranslation();

  return (
    <div className={`w-full `} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h2 className={topTitleStyle}>{t("بيانات جواز السفر")}</h2>
      <h5 className={titleStyle}>
        {t("يرجي التأكد من بيانات جواز السفر جيداً")} <br />{" "}
        {t("رقم جواز السفر")}
      </h5>
      <div className={`flex items-start justify-start gap-[10px] w-full`}>
        <div className="w-full max-w-[448px] flex flex-col gap-[5px]">
          <input
            ref={passportRef}
            className={`w-full max-w-[448px] text-start rounded-[16px] ${
              passportNumberChanges ? "bg-[#ffffffce]" : "bg-[#FFFFFF]"
            }  text-[#333333] text-[16px] font-medium p-[12px]`}
            onChange={(e) => {
              setErrorPassport("");
              setPassportBeforeChange(e.target.value);
            }}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            type="text"
            disabled={passportNumberChanges}
            defaultValue={`${passportNumber ? passportNumber : ""}`}
            style={{
              boxShadow: "0 4px 4px #005a6c4d",
            }}
          />
          {errorPassport && (
            <span className={`text-red-500 text-[12px]`}>{errorPassport}</span>
          )}
        </div>
        <button
          onClick={() => {
            if (passportNumberChanges) {
              setPassportNumberChange(false);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return passportRef.current.focus();
            }

            if (
              passportBeforeChange === "" ||
              passportBeforeChange.length < 6 ||
              passportBeforeChange.length > 15
            ) {
              return setErrorPassport(t("يجب ادخال رقم جواز السفر بشكل صحيح"));
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            passportRef.current.blur();
            setPassportNumberChange(true);
            return updatePassport();
          }}
          className="rounded-[16px] w-[48px] h-[48px] bg-[#ffffff99] hover:bg-[#ffffff2c] duration-200"
        >
          {/* passportBeforeChange === `${firstName} ${lastName}` || */}
          {passportNumberChanges ? iconStyle : t("حفظ")}
        </button>
      </div>
    </div>
  );
}

export default PassportNumber;
