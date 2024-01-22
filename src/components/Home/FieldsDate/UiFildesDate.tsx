import { useRecoilState } from "recoil";
import { moduleDate } from "../../../data/RecoilState/FormSearchData";
import FieldsDate from "./FieldsDate";
import {
  dateGo,
  dateReturn,
  typeTravel,
} from "../../../data/RecoilState/FormHandling";
import { useRef } from "react";

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
      strokeLinejoin="round"
    />
    <path
      d="M16 1.99997V5.99997"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 1.99997V5.99997"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 9.99997H21"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14H8.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14H12.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 14H16.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 18H8.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18H12.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 18H16.01"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function UiFildesDate() {
  const [, setModuleDateState] = useRecoilState(moduleDate);
  // Initial Date
  const [dateGoState] = useRecoilState(dateGo);
  const [dateReturnState] = useRecoilState(dateReturn);
  const refIcon1 = useRef<HTMLInputElement>(null);
  const refIcon2 = useRef<HTMLInputElement>(null);
  const openDateForm = () => {
    setModuleDateState(true);
  };
  const closeDateForm = () => {
    // setModuleDateState(false);
  };
  const [typeTravelRecoilState] = useRecoilState(typeTravel);

  return (
    <div
      className={`flex sm:gap-[24px] gap-[10px]  sm:justify-normal justify-center lg:flex-nowrap flex-wrap  relative`}
    >
      <div className={`flex flex-col gap-[6px]`}>
        <h4 className={`text-[#000] text-[20px] font-[500] hidden ml:block`}>
          الذهاب
        </h4>
        <div className={`relative `}>
          <input
            ref={refIcon1}
            defaultValue={dateGoState}
            onFocus={openDateForm}
            onBlur={closeDateForm}
            placeholder={`تاريخ الذهاب`}
            className={`ml:w-[188px] w-[156px] h-[48px] text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-[#117C99] focus:border-[#117C99] z-20`}
          />
          <span
            onClick={() => refIcon1.current?.focus()}
            className={`absolute top-[12px] right-[15px]`}
          >
            {iconDate}
          </span>
        </div>
      </div>
      {typeTravelRecoilState === "roundTrip" && (
        <div className={`flex flex-col gap-[6px]`}>
          <h4 className={`text-[#000] text-[20px] font-[500] hidden ml:block `}>
            العودة
          </h4>
          <div className={`relative `}>
            <input
              ref={refIcon2}
              defaultValue={dateReturnState}
              onFocus={openDateForm}
              onBlur={closeDateForm}
              placeholder={`تاريخ العودة`}
              className={`ml:w-[188px] w-[156px] h-[48px] text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-[#117C99] focus:border-[#117C99] z-20`}
            />
            <span
              onClick={() => refIcon2.current?.focus()}
              className={`absolute top-[12px] right-[15px]`}
            >
              {iconDate}
            </span>
          </div>
        </div>
      )}
      <div className="absolute top-[calc(100%+10px)] z-50">
        <FieldsDate />
      </div>
    </div>
  );
}

export default UiFildesDate;
