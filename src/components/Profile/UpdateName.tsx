import axios from "axios";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { useTranslation } from "react-i18next";

interface TypeComponent {
  data: {
    avatar: string;
    age: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  topTitleStyle: string;
  titleStyle: string;
  iconStyle: JSX.Element;
}
function UpdateName({
  data,
  topTitleStyle,
  titleStyle,
  iconStyle,
}: TypeComponent) {
  const { firstName, lastName } = data;
  // Handle Name
  const [nameChanges, setNameChanges] = useState(true);
  const [nameBeforeChange, setNameBeforeChange] = useState(
    `${firstName} ${lastName}`
  );
  const nameRef = useRef(null);
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const updateName = async () => {
    const lastName = nameBeforeChange.split(" ")[1] || "";
    const firstName = nameBeforeChange.split(" ")[0] || "";
    const token = localStorage.getItem("token") || "";
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/me`,
        {
          firstName,
          lastName,
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
  const [errorName, setErrorName] = useState("");

  // handle lang
  const { t, i18n } = useTranslation();

  return (
    <div className={`w-full `} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h2 className={topTitleStyle}>{t("الاسم")}</h2>
      <h5 className={titleStyle}>{t("يرجي إدخال الاسم كامل")}</h5>
      <div className={`flex items-start justify-start gap-[10px]  w-full`}>
        <div className="w-full max-w-[448px] flex flex-col gap-[5px]">
          <input
            ref={nameRef}
            className={`w-full max-w-[448px] text-start rounded-[16px] ${
              nameChanges ? "bg-[#ffffffce]" : "bg-[#FFFFFF]"
            }  text-[#333333] text-[16px] font-medium p-[12px]`}
            onChange={(e) => {
              setErrorName("");
              setNameBeforeChange(e.target.value);
            }}
            type="text"
            disabled={nameChanges}
            defaultValue={`${firstName} ${lastName}`}
            style={{
              boxShadow: "0 4px 4px #005a6c4d",
            }}
          />
          {errorName && (
            <span className={`text-red-500 text-[12px]`}>{errorName}</span>
          )}
        </div>
        <button
          name="name"
          onClick={() => {
            if (nameChanges) {
              setNameChanges(false);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return nameRef.current.focus();
            }

            if (nameBeforeChange === "" || nameBeforeChange.length <= 3) {
              return setErrorName(t("يجب ادخال الاسم بشكل صحيح"));
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            nameRef.current.blur();
            setNameChanges(true);
            return updateName();
          }}
          className="rounded-[16px] w-[48px] h-[48px] bg-[#ffffff99] hover:bg-[#ffffff2c] duration-200"
        >
          {/* nameBeforeChange === `${firstName} ${lastName}` || */}
          {nameChanges ? iconStyle : t("حفظ")}
        </button>
      </div>
    </div>
  );
}

export default UpdateName;
