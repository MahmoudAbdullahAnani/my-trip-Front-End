import { useRecoilState } from "recoil";
import {
  iconDirectionSmall,
  iconDot,
  iconHomeAntra,
  iconRedClose,
} from "../../../../assets/icons/home";
import { MinPrice } from "../../../../data/RecoilState/Search/MainData";
// Parse Date
import { format, parseISO } from "date-fns";
import { arEG } from "date-fns/locale";

import DetailsTicket from "./DetailsTicket/DetailsTicket";

import { ClickAwayListener, Modal, Tooltip } from "@mui/material";
import DetailsAirPort from "./DetailsTicket/DetailsAirPort";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TicketId } from "../../../../data/RecoilState/Search/TicketData";
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
  degree: string;
  isStope1: number;
  isStope2: number;
  price: number;
  d1Terminal: string;
  a1Terminal: string;
  d2Terminal: string;
  a2Terminal: string;
  ticketId: string;
}

function Ticket({
  d1Terminal,
  ticketId,
  a1Terminal,
  d2Terminal,
  a2Terminal,
  degree,
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
  console.log({ parseReturn1 });

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

  // التفاصيل
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  // Details
  const d1FormattedDate = format(parseGo1, "EEEE d MMMM yyyy", {
    locale: arEG,
  });
  const a1FormattedDate = format(parseReturn1, "EEEE d MMMM yyyy", {
    locale: arEG,
  });
  const d2FormattedDate = format(parseGo2, "EEEE d MMMM yyyy", {
    locale: arEG,
  });
  const a2FormattedDate = format(parseReturn2, "EEEE d MMMM yyyy", {
    locale: arEG,
  });

  const [view, setView] = useState("go");

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  // Chose Ticket
  const [, setTicketIdState] = useRecoilState(TicketId);
  const navigator = useNavigate();
  const ChoseTicket = () => {
    navigator("/airData");
    setTicketIdState(ticketId);
  };

  // Mobile
  if (isMobile) {
    return (
      <>
        <Modal open={openModal} onClose={handleClose}>
          <div
            className={`flex flex-col gap-[15px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-start  p-[12px] border-2 border-[#FFF] rounded-[16px] bg-[#D9D9D9]`}
          >
            <div className={`flex w-full`}>
              <button onClick={handleClose} className={`rounded-full`}>
                {iconRedClose}
              </button>
              <div
                className={`py-[16px] flex gap-2 justify-center text-[#FFF] h-full flex-1  ms-[5px]`}
              >
                <button
                  onClick={() => setView("go")}
                  className={`${
                    view !== "go" ? "bg-[#006c4b]" : "bg-[#006c4c95]"
                  } flex-1 px-2 rounded-lg hover:bg-[#006c4ca4] py-2`}
                >
                  رحلة الذهاب{" "}
                </button>
                <button
                  onClick={() => setView("return")}
                  className={`${
                    view !== "return" ? "bg-[#006c4b]" : "bg-[#006c4c95]"
                  } flex-1 px-2 rounded-lg hover:bg-[#006c4ca4] py-2`}
                >
                  رحلة العودة
                </button>
              </div>
            </div>
            {view === "go" ? (
              <div
                className={`bg-[#FFFFFF] border-2 z-10 mt-[calc(32px/2)] font- rounded-[16px] py-[16px] px-[6px]`}
              >
                <div
                  className={`flex flex-col gap-[22px] pe-[37px] bg-[url('/public/assets/ticket/MAP.png')] bg-cover bg-no-repeat w-full h-full rounded-[16px]`}
                >
                  <div
                    className={`flex justify-between  pt-[3px] ps-[5px] gap-[22px]`}
                  >
                    <h4 className={`flex gap-[3px] text-[20px] font-bold`}>
                      <span className={`text-[#141414]`}>
                        {durationH}h{durationM}m
                      </span>
                      <span className={`text-[#4F4F4F] whitespace-nowrap`}>
                        مدة الرحلة
                      </span>
                    </h4>
                    <h3 className={`text-[#117C99] text-[32px] font-bold`}>
                      بيانات الرحلة
                    </h3>
                  </div>
                  <div
                    className={`flex justify-end gap-[38px] pe-[25px] text-end`}
                  >
                    <DetailsTicket
                      title="الوصول"
                      departureIataCode={arrivalIataCodeReturnRound}
                      date={a1FormattedDate}
                      airPort=""
                      iconHomeAntra={iconHomeAntra}
                      terminal={a1Terminal}
                    />
                    <DetailsTicket
                      title="المغادرة"
                      departureIataCode={departureIataCode}
                      date={d1FormattedDate}
                      airPort=""
                      iconHomeAntra={iconHomeAntra}
                      terminal={d1Terminal}
                    />
                  </div>
                  <div className={`ms-auto pe-[24px] `}>
                    <DetailsAirPort
                      airPortImage={carrierCode}
                      airBusCode={`Airbus A${aircraftCode}`}
                      travelCode={`${carrierCode}-${flightNumber}`}
                      degree={degree}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`bg-[#FFFFFF] border-2 z-10 mt-[calc(32px/2)] font- rounded-[16px] py-[16px] px-[6px]`}
              >
                <div
                  className={`flex flex-col gap-[22px] pe-[37px] bg-[url('/public/assets/ticket/MAP.png')] bg-cover bg-no-repeat w-full h-full rounded-[16px]`}
                >
                  <div
                    className={`flex justify-between  pt-[3px] ps-[5px] gap-[22px]`}
                  >
                    <h4 className={`flex gap-[3px] text-[20px] font-bold`}>
                      <span className={`text-[#141414]`}>
                        {durationReturnH}h{durationReturnM}m
                      </span>
                      <span className={`text-[#4F4F4F] whitespace-nowrap`}>
                        مدة الرحلة
                      </span>
                    </h4>
                    <h3 className={`text-[#117C99] text-[32px] font-bold`}>
                      بيانات الرحلة
                    </h3>
                  </div>
                  <div
                    className={`flex justify-end gap-[38px] pe-[25px] text-end`}
                  >
                    <DetailsTicket
                      title="الوصول"
                      departureIataCode={departureIataCode}
                      date={a1FormattedDate}
                      airPort=""
                      iconHomeAntra={iconHomeAntra}
                      terminal={a1Terminal}
                    />
                    <DetailsTicket
                      title="المغادرة"
                      departureIataCode={arrivalIataCodeReturnRound}
                      date={d2FormattedDate}
                      airPort=""
                      iconHomeAntra={iconHomeAntra}
                      terminal={d2Terminal}
                    />
                  </div>
                  <div className={`ms-auto pe-[24px]`}>
                    <DetailsAirPort
                      airPortImage={carrierCode}
                      airBusCode={`Airbus A${aircraftCodeReturn}`}
                      travelCode={`${carrierCodeReturn}-${flightNumberReturn}`}
                      degree={degree}
                    />
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={ChoseTicket}
              className={`text-[#FFF] text-[20px] mx-auto w-[154px] h-[48px] font-[700] py-[10px] px-[16px] rounded-[16px] duration-200 bg-[#117C99] hover:bg-[#117c99ba]`}
            >
              <span>اختار الرحلة</span>
            </button>
          </div>
        </Modal>
        <div
          onClick={handleOpen}
          className={`cursor-pointer lg:w-[548px] ll:w-[648px] relative rounded-s-[16px] flex flex-col justify-center gap-[9px] items-center flex-1 `}
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
                    <img
                      src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${carrierCode}.svg`}
                      alt="image-air"
                      width={100}
                      height={100}
                      className={`object-cover object-center `}
                    />
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
                <div
                  className={`text-[#333] text-[14px] font-[700] flex gap-1`}
                >
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
                <div
                  className={`text-[#333] text-[14px] font-[700] flex gap-1`}
                >
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
                    <img
                      src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${carrierCodeReturn}.svg`}
                      alt="image-air"
                      width={100}
                      height={100}
                      className={`object-cover object-center `}
                    />
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
      </>
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
            <img
              src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${carrierCode}.svg`}
              alt="image-air"
              width={100}
              height={100}
              className={`object-cover object-center `}
            />
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
        className={`flex justify-between pr-[10px] xl:pl-[14px] pl-[5px]  items-end pb-[22px] w-full h-full border  border-t-0 lg:border-b-0 xl:border-b-1 border-x-0`}
      >
        {/* الطائرة */}
        <div className={`flex flex-col gap-[8px] `}>
          {/* الطائرة  image*/}
          <span>
            <img
              src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${carrierCodeReturn}.svg`}
              alt="image-air"
              width={100}
              height={100}
              className={`object-cover object-center `}
              // className="w-[80px] h-[80px]"
            />
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

        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              placement="right"
              // PopperProps={{
              //   disablePortal: true,
              // }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <>
                  <div
                    className={`hidden lg:flex items-start w-[701px] h-[500px] p-[12px] border-2 border-[#FFF] rounded-[16px] bg-[#D9D9D9]`}
                  >
                    <button
                      onClick={handleTooltipClose}
                      className={`rounded-full`}
                    >
                      {iconRedClose}
                    </button>
                    {view === "go" ? (
                      <div
                        className={`bg-[#FFFFFF] w-[610px] h-[426px] border-2 z-10 mt-[calc(32px/2)] rounded-[16px] py-[16px] px-[6px]`}
                      >
                        <div
                          className={`flex flex-col gap-[22px] pe-[37px] bg-[url('/public/assets/ticket/MAP.png')] bg-cover bg-no-repeat w-full h-full rounded-[16px]`}
                        >
                          <div
                            className={`flex justify-between  pt-[3px] ps-[69px] gap-[22px]`}
                          >
                            <h4
                              className={`flex gap-[3px] text-[20px] font-bold`}
                            >
                              <span className={`text-[#141414]`}>
                                {durationH}h{durationM}m
                              </span>
                              <span className={`text-[#4F4F4F]`}>
                                مدة الرحلة
                              </span>
                            </h4>
                            <h3
                              className={`text-[#117C99] text-[32px] font-bold`}
                            >
                              بيانات الرحلة
                            </h3>
                          </div>
                          <div
                            className={`flex justify-end gap-[38px] pe-[25px] text-end`}
                          >
                            <DetailsTicket
                              title="الوصول"
                              departureIataCode={arrivalIataCodeReturnRound}
                              date={a1FormattedDate}
                              airPort=""
                              iconHomeAntra={iconHomeAntra}
                              terminal={a1Terminal}
                            />
                            <DetailsTicket
                              title="المغادرة"
                              departureIataCode={departureIataCode}
                              date={d1FormattedDate}
                              airPort=""
                              iconHomeAntra={iconHomeAntra}
                              terminal={d1Terminal}
                            />
                          </div>
                          <div className={`ms-auto pe-[24px] `}>
                            <DetailsAirPort
                              airPortImage={carrierCode}
                              airBusCode={`Airbus A${aircraftCode}`}
                              travelCode={`${carrierCode}-${flightNumber}`}
                              degree={degree}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`bg-[#FFFFFF] w-[610px] h-[426px] border-2 z-10 mt-[calc(32px/2)] rounded-[16px] py-[16px] px-[6px]`}
                      >
                        <div
                          className={`flex flex-col gap-[22px] pe-[37px] bg-[url('/public/assets/ticket/MAP.png')] bg-cover bg-no-repeat w-full h-full rounded-[16px]`}
                        >
                          <div
                            className={`flex justify-between  pt-[3px] ps-[69px] gap-[22px]`}
                          >
                            <h4
                              className={`flex gap-[3px] text-[20px] font-bold`}
                            >
                              <span className={`text-[#141414]`}>
                                {durationReturnH}h{durationReturnM}m
                              </span>
                              <span className={`text-[#4F4F4F]`}>
                                مدة الرحلة
                              </span>
                            </h4>
                            <h3
                              className={`text-[#117C99] text-[32px] font-bold`}
                            >
                              بيانات الرحلة
                            </h3>
                          </div>
                          <div
                            className={`flex justify-end gap-[38px] pe-[25px] text-end`}
                          >
                            <DetailsTicket
                              title="الوصول"
                              departureIataCode={departureIataCode}
                              date={a2FormattedDate}
                              airPort=""
                              iconHomeAntra={iconHomeAntra}
                              terminal={a2Terminal}
                            />
                            <DetailsTicket
                              title="المغادرة"
                              departureIataCode={arrivalIataCodeReturnRound}
                              date={d2FormattedDate}
                              airPort=""
                              iconHomeAntra={iconHomeAntra}
                              terminal={d2Terminal}
                            />
                          </div>
                          <div className={`ms-auto pe-[24px] `}>
                            <DetailsAirPort
                              airPortImage={carrierCode}
                              airBusCode={`Airbus A${aircraftCodeReturn}`}
                              travelCode={`${carrierCodeReturn}-${flightNumberReturn}`}
                              degree={degree}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      className={`py-[16px] flex flex-col gap-2 justify-center h-full  ms-[5px]`}
                    >
                      <button
                        onClick={() => setView("go")}
                        className={`${
                          view !== "go" ? "bg-[#006c4b]" : "bg-[#006c4c95]"
                        } flex-1 px-2 rounded-lg hover:bg-[#006c4ca4]`}
                      >
                        رحلة الذهاب{" "}
                      </button>
                      <button
                        onClick={() => setView("return")}
                        className={`${
                          view !== "return" ? "bg-[#006c4b]" : "bg-[#006c4c95]"
                        } flex-1 px-2 rounded-lg hover:bg-[#006c4ca4]`}
                      >
                        رحلة العودة
                      </button>
                    </div>
                  </div>
                </>
              }
              arrow
            >
              <div className="mt-auto lg:mr-1 mr-0">
                <button
                  onClick={handleTooltipOpen}
                  className={` border-2 border-[#117C99] hover:bg-[#117c99f3] text-[#005A6C] hover:text-[#fff] text-[16px] font-[700] xl:w-[93px] w-[73px] ms-auto xl:h-[48px] h-[38px] rounded-[16px] flex justify-center items-center `}
                >
                  <span className={` text-[16px] font-[700]`}>التفصيل</span>
                </button>
              </div>
            </Tooltip>
          </div>
        </ClickAwayListener>
        {/* افضل سعر */}
      </div>
    </div>
  );
}

export default Ticket;
