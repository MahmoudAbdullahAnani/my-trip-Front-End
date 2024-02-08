import { useRecoilState } from "recoil";
// Data
import {
  // TicketChose,
  TicketId,
} from "../../../../data/RecoilState/Search/TicketData";

// Date
import { parseISO, format } from "date-fns";
import {
  iconArrowDown,
  iconArrowTop,
  iconDotBlack,
} from "../../../../assets/icons/home";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../../../data/RecoilState/Search/MainData";
import { FlightOffer } from "../../../../interface/MainData";
import { useState } from "react";
function TicketBill() {
  const [ticketIdState] = useRecoilState(TicketId);

  // Find Obj Data
  const [ifCheckedFilterState] = useRecoilState(IfCheckedFilter);
  const [tripDataFilters] = useRecoilState(TripDataFilters);
  const [tripStopeFiltersState] = useRecoilState(TripStopeFilters);
  const mainData = ifCheckedFilterState
    ? tripStopeFiltersState
    : tripDataFilters;

  // console.log(mainData);
  const { itineraries }: FlightOffer = mainData.filter(
    ({ id }) => id === ticketIdState
  )[0];

  // handle Date
  const parsedDepartureDate = parseISO(itineraries[0].segments[0].departure.at);
  const parsedArrivalDate = parseISO(itineraries[0].segments[0].arrival.at);

  // Time Ticket
  const handleParsedDepartureTime = format(parsedDepartureDate, "h:mm a");
  const handleParsedArrivalTime = format(parsedArrivalDate, "h:mm a");
  // Handle Time Range
  const durationH = itineraries[0].duration.split("PT")[1].split("H")[0];
  const durationM = itineraries[0].duration
    .split("PT")[1]
    .split("H")[1]
    .split("M")[0];
  const [toggleDetailsData, setToggleDetailsData] = useState(false);
  return (
    <div
      style={{
        boxShadow: " rgb(0 90 108 / 30%)  0 4px 4px",
      }}
      className={`w-full pe-[24px] pt-[30px] pb-[14px] xl:mt-0 mt-[50px]  rounded-[16px] bg-[#FFF]`}
    >
      <div
        className={`flex flex-wrap justify-end items-center lg:gap-[113px] gap-[53px] `}
      >
        <div>
          <img
            src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${itineraries[0].segments[0].carrierCode}.svg`}
            alt="image-air"
            width={100}
            height={100}
            className={`object-cover object-center w-[122px] `}
          />
        </div>
        <div className={`flex flex-col items-end justify-end gap-[16px] `}>
          <h1 className={`text-[#005A6C] text-[30px] font-bold `}>
            {itineraries[0].segments[1].arrival.iataCode} الي{" "}
            {itineraries[0].segments[0].departure.iataCode}
          </h1>
          <div className={`flex gap-[11px] `}>
            {itineraries[0].segments[0].numberOfStops === 0 && (
              <div className={`flex items-center gap-[2px]`}>
                <span className={`text-[#181818] text-[13px] font-[700]`}>
                  بدون توقف
                </span>
                <span className={`relative top-[2px]`}>{iconDotBlack}</span>
              </div>
            )}
            <div className={`text-[#181818] text-[14px] flex`}>
              <span className={`text-[#181818] text-[14px] font-bold`}>
                ({durationH}h{durationM}m)
              </span>
              <div className={`flex`}>
                <span>{handleParsedDepartureTime}-</span>
                <span>{handleParsedArrivalTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col justify-end items-end mt-[54px]`}>
        <button
          onClick={() => setToggleDetailsData(!toggleDetailsData)}
          className={`flex items-center justify-center gap-[8px] text-[#117C99] hover:text-[#117c999c] text-[15px]`}
        >
          <span className={`relative top-[2px]`}>
            {toggleDetailsData ? iconArrowTop : iconArrowDown}
          </span>
          <span>مشاهدة تفاصيل </span>
        </button>
        {toggleDetailsData && <div className={``}>Details Data</div>}
      </div>
    </div>
  );
}

export default TicketBill;
