import { useRecoilState } from "recoil";
import { iconDirectionSmall, iconDot } from "../../../../assets/icons/home";
import { MinPrice } from "../../../../data/RecoilState/Search/MainData";
// Parse Date
import { format, parseISO } from "date-fns";

interface TicketData {
  isMobile?: boolean;
  daysDifference: number;
  aircraftCode: string;
  carrierCode: string;
  flightNumber: string;
  aircraftCodeReturn: string;
  carrierCodeReturn: string;
  flightNumberReturn: string;
  departureIataCode: string;
  arrivalIataCodeReturnRound: string;
  durationH: string;
  durationM: string;
  departureDateGo1: string;
  arrivalDateReturn1: string;
  departureDateGo2: string;
  arrivalDateReturn2: string;
  durationReturnH: string;
  durationReturnM: string;
  isStope1: number;
  isStope2: number;
  price: number;
}

function Ticket({
  isMobile,
  daysDifference,
  aircraftCode,
  carrierCode,
  flightNumber,
  aircraftCodeReturn,
  carrierCodeReturn,
  flightNumberReturn,
  departureIataCode,
  arrivalIataCodeReturnRound,
  durationH,
  durationM,
  durationReturnH,
  durationReturnM,
  departureDateGo1,
  arrivalDateReturn1,
  departureDateGo2,
  arrivalDateReturn2,
  isStope1,
  isStope2,
  price,
}: TicketData) {
  const [minPriceState] = useRecoilState(MinPrice);

  const parseGo1 = parseISO(`${departureDateGo1}`);
  const parseReturn1 = parseISO(`${arrivalDateReturn1}`);

  const parseGo2 = parseISO(`${departureDateGo2}`);
  const parseReturn2 = parseISO(`${arrivalDateReturn2}`);
  // ========================= Ticket Go ==================
  // Handle Time
  const timeTicket1Go = format(parseGo1, "h:mm a");
  const timeTicket1Return = format(parseReturn1, "h:mm a");
  // Handle Date
  const dateTicket1Go = format(parseGo1, "MMM, yyyy");
  const dateTicket1Return = format(parseReturn1, "MMM, yyyy");
  // Handle Day
  const dayTicket1Go = format(parseGo1, "d ");
  const dayTicket1Return = format(parseReturn1, "d ");
  // ========================= Ticket Return ==================
  // Handle Time
  const timeTicket2Go = format(parseGo2, "h:mm a");
  const timeTicket2Return = format(parseReturn2, "h:mm a");
  // Handle Date
  const dateTicket2Go = format(parseGo2, "MMM, yyyy");
  const dateTicket2Return = format(parseReturn2, "MMM, yyyy");
  // Handle Day
  const dayTicket2Go = format(parseGo2, "d ");
  const dayTicket2Return = format(parseReturn2, "d ");
  // Mobile
  if (isMobile) {
    return (
      <div
        className={`lg:w-[548px] ll:w-[648px] relative rounded-s-[16px] flex flex-col justify-center gap-[9px] items-center flex-1 `}
        dir="rtl"
      >
        {/* <span
          className={`text-[#000] text-[15px] font-[400] top-[32%] absolute bg-[#FFF] border border-[#656565] w-[59px] h-[35px] flex justify-center items-center rounded-[30px]`}
        >
          {daysDifference} يوم
        </span> */}
        <div
          className={`flex flex-col justify-between px-[10px] items-start w-full h-full pb-[22.5px] border border-dashed border-t-0 border-x-0`}
        >
          <div
            className={`flex justify-between w-full items-start mt-[31px] gap-[12px]`}
          >
            {/* الطائرة */}
            <div className={`flex items-start gap-[12px]`}>
              <div className={`flex flex-col gap-[8px]`}>
                <span>
                  <img src="" alt="image-air" />
                </span>
                <div className={`flex justify-start gap-[21px]`}>
                  <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                    {carrierCode}-{flightNumber}
                  </span>
                  <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                    Airbus A{aircraftCode}
                  </span>
                </div>
              </div>
              {isStope1 === 0 && (
                <div className={`flex items-center gap-[2px]`}>
                  <span className={`relative top-[2px]`}>{iconDot}</span>
                  <span className={`text-[#117C99] text-[13px] font-[700]`}>
                    بدون توقف
                  </span>
                </div>
              )}
            </div>
            {/* افضل سعر */}
            <div className={` `}>
              {+minPriceState === +price && (
                <div
                  className={`bg-[#B3E0D2] xl:w-[82px] w-[72px] ms-auto xl:h-[38px] h-[28px] rounded-[8px] flex justify-center items-center `}
                >
                  <span className={`text-[#006C4B] text-[13px] font-[700]`}>
                    افضل سعر
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Date */}

          <div className={`grid w-[309px] mx-auto grid-cols-3 mt-[14px] `}>
            <div className={`flex flex-col gap-[8px]`}>
              <span className={`text-[#231F20] text-[14px] font-[700]`}>
                {departureIataCode}
              </span>
              <span className={`text-[#000] text-[20px] font-[700]`}>
                {timeTicket1Go}
              </span>
              <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
                <span>{dateTicket1Go}</span>
                <span>{dayTicket1Go}</span>
              </div>
            </div>
            <div
              className={`flex flex-col gap-[8px] justify-center items-center`}
            >
              <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                {durationH}h{durationM}m
              </span>
              <span>{iconDirectionSmall}</span>
            </div>
            <div className={`flex flex-col gap-[8px] items-end`}>
              <span className={`text-[#231F20] text-[14px] font-[700]`}>
                {arrivalIataCodeReturnRound}
              </span>
              <span className={`text-[#000] text-[20px] font-[700]`}>
                {timeTicket1Return}
              </span>
              <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
                <span>{dateTicket1Return}</span>
                <span>{dayTicket1Return}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between pr-[10px] xl:pl-[24px] pl-[10px] items-end pb-[22px] w-full h-full `}
        >
          <div className={`flex flex-col`}>
            <div className={`flex gap-[12px]`}>
              {/* الطائرة */}
              <div className={`flex flex-col gap-[8px] `}>
                {/* الطائرة  image*/}
                <span>
                  <img src="" alt="image-air" />
                </span>
                <div className={`flex justify-start gap-[21px]`}>
                  {/* كود الرحلة */}
                  <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                    {carrierCodeReturn}-{flightNumberReturn}
                  </span>
                  {/* كود الطائرة */}
                  <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                    Airbus A{aircraftCodeReturn}
                  </span>
                </div>
              </div>
              {isStope2 === 0 && (
                <div className={`flex items-center   gap-[2px]`}>
                  <span className={`relative top-[2px]`}>{iconDot}</span>
                  <span className={`text-[#117C99] text-[13px] font-[700]`}>
                    بدون توقف
                  </span>
                </div>
              )}
            </div>
            {/* Date */}
            <div className={`grid w-[309px] grid-cols-3 mt-2`}>
              <div className={`flex flex-col gap-[8px]`}>
                <span className={`text-[#231F20] text-[14px] font-[700]`}>
                  {arrivalIataCodeReturnRound}
                </span>
                <span className={`text-[#000] text-[20px] font-[700]`}>
                  {timeTicket2Go}
                </span>
                <div
                  className={`text-[#333] text-[14px] font-[700] flex gap-1`}
                >
                  <span>{dateTicket2Go}</span>
                  <span>{dayTicket2Go}</span>
                </div>
              </div>
              <div
                className={`flex flex-col gap-[8px] justify-center items-center`}
              >
                <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                  {durationReturnH}h{durationReturnM}m
                </span>
                <span>{iconDirectionSmall}</span>
              </div>
              <div className={`flex flex-col gap-[8px] items-end`}>
                <span className={`text-[#231F20] text-[14px] font-[700]`}>
                  {departureIataCode}
                </span>
                <span className={`text-[#000] text-[20px] font-[700]`}>
                  {timeTicket2Return}
                </span>
                <div
                  className={`text-[#333] text-[14px] font-[700] flex gap-1`}
                >
                  <span>{dateTicket2Return}</span>
                  <span>{dayTicket2Return}</span>
                </div>
              </div>
            </div>
          </div>

          {/* افضل سعر */}
          <div className="mt-auto hidden lg:mr-1 mr-0">
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
  // Desktop
  return (
    <div
      className={`lg:w-[548px] ll:w-[648px] relative rounded-s-[16px] flex flex-col justify-center items-center flex-1 lg:px-[10px] `}
      dir="rtl"
    >
      <span
        className={`text-[#000] text-[15px] font-[400] absolute top-[42%] bg-[#FFF] border border-[#656565] w-[59px] h-[35px] flex justify-center items-center rounded-[30px]`}
      >
        {daysDifference} يوم
      </span>
      <div
        className={`flex justify-between px-[10px] items-start w-full h-full  border border-t-0 border-x-0`}
      >
        {/* الطائرة */}
        <div className={`flex flex-col gap-[8px] mt-[31px]`}>
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
        <div className={`grid gap-[12px]  grid-cols-3 mt-[14px] `}>
          <div className={`flex flex-col gap-[8px]`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>
              {departureIataCode}
            </span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              {timeTicket1Go}
            </span>
            <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
              <span>{dateTicket1Go}</span>
              <span>{dayTicket1Go}</span>
            </div>
          </div>
          <div
            className={`flex flex-col gap-[8px] justify-center items-center`}
          >
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              {durationH}h{durationM}m
            </span>
            <span>{iconDirectionSmall}</span>
            {isStope1 === 0 && (
              <div className={`flex items-center gap-[2px]`}>
                <span className={`relative top-[2px]`}>{iconDot}</span>
                <span className={`text-[#117C99] text-[13px] font-[700]`}>
                  بدون توقف
                </span>
              </div>
            )}
          </div>
          <div className={`flex flex-col gap-[8px] me-[12px] items-end`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>
              {arrivalIataCodeReturnRound}
            </span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              {timeTicket1Return}
            </span>
            <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
              <span>{dateTicket1Return}</span>
              <span>{dayTicket1Return}</span>
            </div>
          </div>
        </div>
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
      </div>
      <div
        className={`flex justify-between pr-[10px] xl:pl-[24px] pl-[10px]  items-end pb-[22px] w-full h-full border  border-t-0 lg:border-b-0 xl:border-b-1 border-x-0`}
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
              {carrierCodeReturn}-{flightNumberReturn}
            </span>
            {/* كود الطائرة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              Airbus A{aircraftCodeReturn}
            </span>
          </div>
        </div>
        {/* Date */}
        <div className={`grid w-[309px]  grid-cols-3  `}>
          <div className={`flex flex-col gap-[8px]`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>
              {arrivalIataCodeReturnRound}
            </span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              {timeTicket2Go}
            </span>
            <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
              <span>{dateTicket2Go}</span>
              <span>{dayTicket2Go}</span>
            </div>
          </div>
          <div
            className={`flex flex-col gap-[8px] justify-center items-center`}
          >
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              {durationReturnH}h{durationReturnM}m
            </span>
            <span>{iconDirectionSmall}</span>
            {isStope2 === 0 && (
              <div className={`flex items-center   gap-[2px]`}>
                <span className={`relative top-[2px]`}>{iconDot}</span>
                <span className={`text-[#117C99] text-[13px] font-[700]`}>
                  بدون توقف
                </span>
              </div>
            )}
          </div>
          <div className={`flex flex-col gap-[8px] items-end`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>
              {departureIataCode}
            </span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              {timeTicket2Return}
            </span>
            <div className={`text-[#333] text-[14px] font-[700] flex gap-1`}>
              <span>{dateTicket2Return}</span>
              <span>{dayTicket2Return}</span>
            </div>
          </div>
        </div>

        {/* افضل سعر */}
        <div className="mt-auto lg:mr-1 mr-0">
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

export default Ticket;
