import { useRecoilState } from "recoil";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../../../../data/RecoilState/Search/MainData";
import React from "react";

export interface itinerariesSteps {
  itineraries: [{ duration: string; segments: [{ numberOfStops: number }] }];
  id: string;
  price: { total: string };
}

function NumberOfStopsAirline() {
  const [tripDataFilters] = useRecoilState(TripDataFilters);
  const [, setTripDataFiltersState] = useRecoilState(TripStopeFilters);
  const [, setIfCheckedFilterState] = useRecoilState(IfCheckedFilter);

  const noneStepsRef = React.useRef<HTMLInputElement>(null);
  const oneStepsRef = React.useRef<HTMLInputElement>(null);
  const moreStepsRef = React.useRef<HTMLInputElement>(null);

  const ticketsNonStop = tripDataFilters.filter(
    (ticket: itinerariesSteps) =>
      ticket.itineraries[0].segments[0].numberOfStops === 0
  );
  const ticketsOneStop = tripDataFilters.filter(
    (ticket: itinerariesSteps) =>
      ticket.itineraries[0].segments[0].numberOfStops === 1
  );
  const ticketsMoreStop = tripDataFilters.filter(
    (ticket: itinerariesSteps) =>
      ticket.itineraries[0].segments[0].numberOfStops >= 2
  );
  function handleChecked() {
    setIfCheckedFilterState(true);
    const noneStepsRefChecked = noneStepsRef.current?.checked;
    const oneStepsRefChecked = oneStepsRef.current?.checked;
    const moreStepsRefChecked = moreStepsRef.current?.checked;
    if (noneStepsRefChecked && oneStepsRefChecked && moreStepsRefChecked) {
      setTripDataFiltersState([
        ...ticketsNonStop,
        ...ticketsOneStop,
        ...ticketsMoreStop,
      ]);
    } else if (noneStepsRefChecked && oneStepsRefChecked) {
      setTripDataFiltersState([...ticketsNonStop, ...ticketsOneStop]);
    } else if (noneStepsRefChecked && moreStepsRefChecked) {
      setTripDataFiltersState([...ticketsNonStop, ...ticketsMoreStop]);
    } else if (oneStepsRefChecked && moreStepsRefChecked) {
      setTripDataFiltersState([...ticketsOneStop, ...ticketsMoreStop]);
    } else {
      if (noneStepsRefChecked && !oneStepsRefChecked && !moreStepsRefChecked) {
        setTripDataFiltersState([...ticketsNonStop]);
      } else if (
        !noneStepsRefChecked &&
        oneStepsRefChecked &&
        !moreStepsRefChecked
      ) {
        setTripDataFiltersState([...ticketsOneStop]);
      } else if (
        !noneStepsRefChecked &&
        !oneStepsRefChecked &&
        moreStepsRefChecked
      ) {
        setTripDataFiltersState([...ticketsMoreStop]);
      } else {
        setTripDataFiltersState([...tripDataFilters]);
      }
    }
  }
  return (
    <div className={`flex flex-col gap-[23px] w-[207px]`}>
      <h2 className={`text-[#000] text-[24px] font-[700] text-end`}>التوقف</h2>
      <div
        dir="rtl"
        className={`flex flex-col gap-[16px] w-full text-[16px] relative right-[20px] font-[500] text-[#000]`}
      >
        {/* 1 */}
        <div className={`flex gap-[15px] items-center`}>
          <label
            htmlFor="travelNotStope1"
            className={`text-[16px] font-[500] text-[#000] containerCheckBox`}
          >
            <input
              ref={noneStepsRef}
              id="travelNotStope1"
              onChange={handleChecked}
              type="checkbox"
            />
            <span className="checkmark after:left-0"></span>
            <span className={``}>بدون توقف</span>
          </label>
        </div>
        {/* 2 */}
        <div className={`flex gap-[15px] items-center`}>
          <label
            htmlFor="travelNotStope2"
            className={`text-[16px] font-[500] text-[#000] containerCheckBox`}
          >
            <input
              ref={oneStepsRef}
              onChange={handleChecked}
              id="travelNotStope2"
              type="checkbox"
            />
            <span className="checkmark after:left-0"></span>
            <span className={``}>توقف 1</span>
          </label>
        </div>
        {/* 3 */}
        <div className={`flex gap-[15px] items-center`}>
          <label
            htmlFor="travelNotStope3"
            className={`text-[16px] font-[500] text-[#000] containerCheckBox`}
          >
            <input
              ref={moreStepsRef}
              onChange={handleChecked}
              id="travelNotStope3"
              type="checkbox"
            />
            <span className="checkmark after:left-0"></span>
            <span className={``}>توقف 2+</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default NumberOfStopsAirline;
