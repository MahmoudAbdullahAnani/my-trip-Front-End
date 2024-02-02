import { useRecoilState } from "recoil";
import { iconDirectionSmall, iconDot } from "../../../../assets/icons/home";
import { MinPrice } from "../../../../data/RecoilState/Search/MainData";

// Handle Date
import { format, parseISO } from "date-fns";

function TicketOneWay({
  aircraftCode,
  carrierCode,
  flightNumber,
  departureIataCode,
  arrivalIataCodeReturn,
  durationM,
  durationH,
  departureDateGo,
  arrivalDateReturn,
  isStope,
  price,
}: {
  aircraftCode: string;
  carrierCode: string;
  flightNumber: string;
  departureIataCode: string;
  arrivalIataCodeReturn: string;
  durationM: string;
  durationH: string;
  departureDateGo: string;
  arrivalDateReturn: string;
  isStope: number;
  price: number;
}) {
  const [minPriceState] = useRecoilState(MinPrice);

  const parsedDepartureDate = parseISO(departureDateGo);
  const parsedArrivalDate = parseISO(arrivalDateReturn);

  // Time Ticket
  const handleParsedDepartureTime = format(parsedDepartureDate, "h:mm a");
  const handleParsedArrivalTime = format(parsedArrivalDate, "h:mm a");
  // Date Ticket
  const handleParsedDepartureDate = format(parsedDepartureDate, "MMM, yyyy");
  const handleParsedArrivalDate = format(parsedArrivalDate, "MMM, yyyy");
  // Day Ticket
  const handleParsedDepartureDay = format(parsedDepartureDate, "d");
  const handleParsedArrivalDay = format(parsedArrivalDate, "d");
  return (
    <div
      className={`lg:w-[548px] ll:w-[648px] relative rounded-s-[16px] flex flex-col justify-center items-center flex-1 `}
      dir="rtl"
    >
      <div
        className={`flex justify-between pr-[10px] xl:pl-[24px] pl-[10px] items-end pb-[22px] w-full h-full border border-t-0 lg:border-b-0 xl:border-b-1 border-x-0`}
      >
        {/* الطائرة */}
        <div className={`flex    flex-col gap-[8px] `}>
          {/* الطائرة  image*/}
          <span>
            <img src="" alt="image-air" />
          </span>
          <div className={`flex justify-start gap-[21px]`}>
            {/* كود الرحلة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              {carrierCode}-{flightNumber}
            </span>
            {/* كود الطائرة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              Airbus A{aircraftCode}
            </span>
          </div>
        </div>
        {/* Date */}
        <div className={`grid w-[309px]  grid-cols-3  `}>
          <div className={`flex flex-col gap-[8px]`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>
              {departureIataCode}
            </span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              {handleParsedDepartureTime}
            </span>
            <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
              <span>{handleParsedDepartureDate}</span>
              <span>{handleParsedDepartureDay}</span>
            </div>
          </div>
          <div
            className={`flex flex-col gap-[8px] justify-center items-center`}
          >
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              {durationH}h{durationM}m
            </span>
            <span>{iconDirectionSmall}</span>
            {isStope === 0 && (
              <div className={`flex items-center gap-[2px]`}>
                <span className={`relative top-[2px]`}>{iconDot}</span>
                <span className={`text-[#117C99] text-[13px] font-[700]`}>
                  بدون توقف
                </span>
              </div>
            )}
          </div>
          <div className={`flex flex-col gap-[8px] items-end`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>
              {arrivalIataCodeReturn}
            </span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              {handleParsedArrivalTime}
            </span>
            <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
              <span>{handleParsedArrivalDate}</span>
              <span>{handleParsedArrivalDay}</span>
            </div>
          </div>
        </div>
        {/* افضل سعر */}
        <div className="mt-auto flex flex-col justify-between h-full lg:mr-1 mr-0">
          {/* افضل سعر */}
          <div className={` `}>
            {+minPriceState === +price && (
              <div
                className={`bg-[#B3E0D2] xl:w-[82px] w-[72px] ms-auto xl:h-[38px] h-[28px] rounded-[8px] flex justify-center items-center mt-[14px]`}
              >
                <span className={`text-[#006C4B] text-[13px] font-[700]`}>
                  افضل سعر
                </span>
              </div>
            )}
          </div>
          <button
            className={` border-2 border-[#117C99] hover:bg-[#117c99f3] text-[#005A6C] hover:text-[#fff] text-[16px] font-[700] xl:w-[93px] w-[73px] ms-auto xl:h-[48px] h-[38px] rounded-[16px] flex justify-center items-center `}
          >
            <span className={` text-[16px] font-[700]`}>التفصيل</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketOneWay;
