import { useRecoilState } from "recoil";
import {
  dateGo,
  dateGoISO,
  typeSystem,
} from "../../../data/RecoilState/FormHandling";
import { useState } from "react";
// Date
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const iconDate = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 3.99997H5C3.89543 3.99997 3 4.8954 3 5.99997V20C3 21.1045 3.89543 22 5 22H19C20.1046 22 21 21.1045 21 20V5.99997C21 4.8954 20.1046 3.99997 19 3.99997Z"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 1.99997V5.99997"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 1.99997V5.99997"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 9.99997H21"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 14H8.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 14H12.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 14H16.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 18H8.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 18H12.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 18H16.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

function UiFildesDateCars({ isSearch = true }: { isSearch: boolean }) {
  // Initial Date
  const [, setDateGoState] = useRecoilState(dateGo);
  const [dateGoStateISO, setDateGoISOState] = useRecoilState(dateGoISO);

  const [typeSystemState] = useRecoilState(typeSystem);

  const [startDate, setStartDate] = useState(null);

  // Lang
  const { t, i18n } = useTranslation();

  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  if (isSearch) {
    return (
      <div
        className={`flex sm:gap-[24px]  gap-[10px] sm:justify-normal justify-center lg:flex-nowrap flex-wrap relative`}
      >
        <div
          className={`flex flex-col gap-[6px]`}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <h4
            className={`text-[#000] text-end text-[20px] font-[500] hidden sm:block`}
          >
            {typeSystemState === "hotel" ? t("تاريخ الدخول") : t("الذهاب")}
          </h4>
          <DatePicker
            showTimeSelect
            timeClassName={handleColor}
            selected={dateGoStateISO}
            onChange={(date) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setStartDate(date);
              setDateGoISOState(date);
              setDateGoState(format(date as Date, "yyyy-MM-dd'T'HH:mm:ss"));
            }}
            selectsStart
            minDate={new Date()}
            startDate={startDate}
            // dateFormatCalendar="yyyy-MM-dd'T'HH:mm:ss"
            showIcon
            icon={iconDate}
            placeholderText={
              typeSystemState === "hotel"
                ? t("تاريخ الدخول")
                : t("تاريخ الذهاب")
            }
            // popperPlacement="top"
            dateFormat="dd/MM/yyyy"
            className={`sm:w-[188px] w-[156px] h-[48px] shadow-lg focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 focus-visible:outline-none text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-[#117C99] focus:border-[#117C99]`}
          />
          {/* <div className={`relative `}>
            <input
              ref={refIcon1}
              defaultValue={dateGoState}
              onFocus={openDateForm}
              onBlur={closeDateForm}
              placeholder={`تاريخ الذهاب`}
              className={`sm:w-[188px] w-[156px] h-[48px] shadow-lg focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 focus-visible:outline-none text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-[#117C99] focus:border-[#117C99] z-20`}
            />
            <span
              onClick={() => refIcon1.current?.focus()}
              className={`absolute top-[12px] right-[15px]`}
            >
              {iconDate}
            </span>
          </div> */}
        </div>
        {/* 
        <div className="absolute top-[calc(100%+10px)] z-50">
          <FieldsDate />
        </div> */}
      </div>
    );
  }

  return (
    <div
      className={`flex sm:gap-[24px]  gap-[10px] sm:justify-normal justify-center lg:flex-nowrap flex-wrap `}
    >
      <div
        className={`flex flex-col gap-[6px] min-w-[200px] `}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <h4 className={`text-[#000] text-[20px] font-[500] hidden sm:block`}>
          {typeSystemState === "hotel" ? t("الدخول") : t("الذهاب")}
        </h4>
        <DatePicker
          showTimeSelect
          timeClassName={handleColor}
          selected={dateGoStateISO}
          onChange={(date) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setStartDate(date);
            setDateGoISOState(date);
            setDateGoState(format(date as Date, "yyyy-MM-dd'T'HH:mm:ss"));
          }}
          selectsStart
          minDate={new Date()}
          startDate={startDate}
          showIcon
          icon={iconDate}
          placeholderText={
            typeSystemState === "hotel" ? t("تاريخ الدخول") : t("تاريخ الذهاب")
          }
          // popperPlacement="top"
          dateFormat="yyyy-MM-dd HH:mm:ss"
          className={` h-[48px] shadow-lg focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 focus-visible:outline-none text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-[#117C99] focus:border-[#117C99]`}
        />
        {/* <div className={`relative `}>
          <input
            ref={refIcon1}
            defaultValue={dateGoState}
            onFocus={openDateForm}
            onBlur={closeDateForm}
            placeholder={`تاريخ الذهاب`}
            className={`sm:w-[188px] w-[156px] h-[48px] shadow-lg focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 focus-visible:outline-none text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-[#117C99] focus:border-[#117C99] z-20`}
          />
          <span
            onClick={() => refIcon1.current?.focus()}
            className={`absolute top-[12px] right-[15px]`}
          >
            {iconDate}
          </span>
        </div> */}
      </div>

      {/* <div className="absolute top-[calc(100%+10px)] z-50">
        <FieldsDate />
      </div> */}
    </div>
  );
}

export default UiFildesDateCars;
