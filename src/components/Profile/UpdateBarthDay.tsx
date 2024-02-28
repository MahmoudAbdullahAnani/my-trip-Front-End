import { useState } from "react";
import DatePicker from "react-datepicker";
import { subYears, differenceInYears } from "date-fns";
import axios from "axios";
import { iconDate } from "../../assets/icons/home";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { useRecoilState } from "recoil";
interface TypeComponent {
  data: {
    age: number;
  };
  topTitleStyle: string;
  titleStyle: string;
  iconStyle: JSX.Element;
}
function UpdateBarthDay({
  data,
  titleStyle,
  topTitleStyle,
  iconStyle,
}: TypeComponent) {
  const { age } = data;
  const birthDate = subYears(new Date(), age);

  // Handle Name
  const currentYear = new Date().getFullYear();

  const [barthDayChanges, setBarthDayChanges] = useState(true);
  const [barthDayBeforeChange, setBarthDayBeforeChange] = useState(
    `${birthDate}` === `${currentYear}` ? birthDate : null
  );
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const [errorBarthDay, setErrorBarthDay] = useState("");

  const updateBarthDay = async () => {
    const token = localStorage.getItem("token") || "";

    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/me`,
        {
          age,
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

  return (
    <div className={`w-full my-[16px]`} dir="rtl">
      <h2 className={topTitleStyle}>التاريخ</h2>
      <h5 className={titleStyle}>يرجي إدخال تاريخ ميلادك</h5>
      <div className={`flex items-start justify-start gap-[10px]  w-full`}>
        <div className="rounded-[16px] w-full max-w-[448px]">
          <div
            className="rounded-[16px] w-full max-w-[448px]"
            style={{
              boxShadow: "0 4px 4px #005a6c4d",
            }}
          >
            <DatePicker
              showYearPicker
              dateFormat="yyyy"
              disabled={barthDayChanges}
              selected={barthDayBeforeChange}
              className={`text-center rounded-[16px] ${
                barthDayChanges ? "bg-[#ffffffce]" : "bg-[#FFFFFF]"
              }  text-[#333333] text-[16px] font-medium p-[12px]`}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={(date) => setBarthDayBeforeChange(date)}
              placeholderText="ادخل تاريخ ميلادك"
              showIcon
              icon={iconDate}
            />
          </div>
          {errorBarthDay && (
            <span className={`text-red-500 text-[12px]`}>{errorBarthDay}</span>
          )}
        </div>
        <button
          onClick={() => {
            if (barthDayChanges) {
              return setBarthDayChanges(false);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
            }

            if (!barthDayBeforeChange) {
              return setErrorBarthDay("يجب ادخال التاريخ بشكل صحيح");
            }
            const birthDate = new Date(barthDayBeforeChange);

            const age = differenceInYears(new Date(), birthDate);

            if (age < 12) {
              return setErrorBarthDay("عذرا هذا التاريخ غير صالح");
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setBarthDayChanges(true);
            return updateBarthDay();
          }}
          className="rounded-[16px] w-[48px] h-[48px] bg-[#ffffff99] hover:bg-[#ffffff2c] duration-200"
        >
          {/* barthDayBeforeChange === `${firstName} ${lastName}` || */}
          {barthDayChanges ? iconStyle : "حفظ"}
        </button>
      </div>
    </div>
  );
}

export default UpdateBarthDay;
