import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { moduleDate } from "../../../data/RecoilState/FormSearchData";
import { useRecoilState } from "recoil";
import { dateGo, dateReturn } from "../../../data/RecoilState/FormHandling";

import { format } from "date-fns";
const exitIcon = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3922 4.0421L10.5556 3.20556L7.23912 6.52208L3.92261 3.20556L3.08606 4.0421L6.40258 7.35862L3.08606 10.6751L3.92261 11.5117L7.23912 8.19517L10.5556 11.5117L11.3922 10.6751L8.07567 7.35862L11.3922 4.0421Z"
      fill="#005A6C"
    />
  </svg>
);

function FieldsDate() {
  const [moduleDateState, setModuleDateState] = useRecoilState(moduleDate);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Initial Date
  const [, setDateGoState] = useRecoilState(dateGo);
  const [, setDateReturnState] = useRecoilState(dateReturn);
  // console.log();

  function handleSelect(ranges: RangeKeyDict) {
    setStartDate(ranges.selection.startDate as Date);
    setEndDate(ranges.selection.endDate as Date);
    // console.log(format(ranges.selection.startDate as Date, "dd/MM/yyyy"));
    setDateGoState(format(ranges.selection.startDate as Date, "dd/MM/yyyy"));
    setDateReturnState(format(ranges.selection.endDate as Date, "dd/MM/yyyy"));
  }
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  function closeFormDate() {
    setModuleDateState(false);
  }
  // console.log({ startDate, endDate });
  if (!moduleDateState) {
    return null;
  }
  return (
    <>
      {/* <div
        onClick={closeFormDate}
        className={`bg-red-900 fixed h-full w-full top-0 left-0  z-10`}
      ></div> */}
      <div className={`z-50`}>
        <div className="bg-green-800 ">
          <div
            className={`flex items-center justify-between bg-red-900 w-full`}
          >
            <span className={`cursor-pointer`} onClick={closeFormDate}>
              Save
            </span>
            <span className={`cursor-pointer`} onClick={closeFormDate}>
              {exitIcon}
            </span>
          </div>
          <div>Depart - Return dates</div>
        </div>

        <div className={`z-50`}>
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[selectionRange]}
            minDate={new Date()}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            dateDisplayFormat={"yyyy"}
            monthDisplayFormat={"yyyy"}
            rangeColors={["#005A6C"]}
            months={1}
            // showMonthArrow={false}
            className=" rounded-b-lg"
          />
        </div>
      </div>
    </>
  );
}

export default FieldsDate;
