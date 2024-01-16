// Imports for handle dates
import { ReactNode, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { useRecoilState } from "recoil";
import { dateGo, typeTravel } from "../data/RecoilState/FormHandling";

const MyContainer = ({
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={``}>
      <CalendarContainer className={`react-datepicker bg-green-400`}>
        <div className={`relative`}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

const handleCalendarClose = () => null;
const handleCalendarOpen = () => null;

function HandleFieldsData() {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = day + "/" + month + "/" + year;
  // ======= Travel Return ==============

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();
  const [, setDateGoState] = useRecoilState(dateGo);
  const [, setDateReturnState] = useRecoilState(dateGo);
  console.log(startDate);
  console.log(endDate);

  //   console.log("start Date", startDate);
  //   console.log("End Date", endDate);

  // ======= Travel Return ==============
  const [typeTravelState] = useRecoilState(typeTravel);

  if (typeTravelState) {
    return (
      <div className={`mx-[24px]`}>
        <h4 className={`text-[#000] text-[20px] font-[500] `}>الذهاب</h4>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          placeholderText={formattedDate}
          minDate={new Date()}
          showIcon
          icon={
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
          }
          className={`w-[188px] h-[48px] text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-white `}
        />
      </div>
    );
  }
  return (
    <div className={`flex gap-[24px] lg:flex-nowrap flex-wrap `}>
      <div className={`flex flex-col gap-[6px]`}>
        <h4 className={`text-[#000] text-[20px] font-[500] `}>الذهاب</h4>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            setDateGoState(date);
          }}
          showIcon
          icon={
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
          }
          className={`w-[188px] h-[48px] text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-white z-50`}
          calendarContainer={MyContainer}
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          placeholderText={""}
          closeOnScroll={(e) => e.target === document}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        />
      </div>
      <div className={`flex flex-col gap-[6px]`}>
        <h4 className={`text-[#000] text-[20px] font-[500] `}>العودة</h4>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => {
            setEndDate(date);
            setDateReturnState(date);
          }}
          showIcon
          icon={
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
          }
          className={`w-[188px] h-[48px] text-center text-[#117C99] text-[14px] font-[500] rounded-lg bg-[#FFF] placeholder:text-white z-50`}
          calendarContainer={MyContainer}
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          placeholderText="I have been cleared!"
          closeOnScroll={(e) => e.target === document}
          dateFormat="dd/MM/yyyy"
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
    </div>
  );
}

export default HandleFieldsData;
