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
  // ======= Travel Return ==============

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [, setDateGoState] = useRecoilState(dateGo);
  const [, setDateReturnState] = useRecoilState(dateGo);

//   console.log("start Date", startDate);
//   console.log("End Date", endDate);

  // ======= Travel Return ==============
  const [typeTravelState] = useRecoilState(typeTravel);

  if (typeTravelState) {
   return (
     <DatePicker
       selected={startDate}
       onChange={(date: Date) => setStartDate(date)}
       placeholderText="I have been cleared!"
       className={`border-2`}
       minDate={new Date()}
     />
   );
}
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          setStartDate(date);
          setDateGoState(date);
        }}
        className={`bg-red-900 text-white placeholder:text-white`}
        calendarContainer={MyContainer}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        isClearable
        placeholderText="I have been cleared!"
        closeOnScroll={(e) => e.target === document}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
      />
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          setEndDate(date);
          setDateReturnState(date);
        }}
        className={` `}
        calendarContainer={MyContainer}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        isClearable
        placeholderText="I have been cleared!"
        closeOnScroll={(e) => e.target === document}
        dateFormat="dd/MM/yyyy"
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
}

export default HandleFieldsData;
