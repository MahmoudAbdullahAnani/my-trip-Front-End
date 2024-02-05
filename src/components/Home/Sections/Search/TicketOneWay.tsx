import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  iconDirectionSmall,
  iconDot,
  iconHomeAntra,
  iconRedClose,
} from "../../../../assets/icons/home";
import { MinPrice } from "../../../../data/RecoilState/Search/MainData";

// Handle Date
import { format, parseISO } from "date-fns";
import { arEG } from "date-fns/locale";

import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DetailsTicket from "./DetailsTicket/DetailsTicket";
import DetailsAirPort from "./DetailsTicket/DetailsAirPort";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TicketId } from "../../../../data/RecoilState/Search/TicketData";

// Images

interface DataOfTicketOneWayComponent {
  degree: string;
  isMobile?: boolean;
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
  dTerminal: string;
  aTerminal: string;
  ticketId: string;
}
function TicketOneWay({
  ticketId,
  degree,
  dTerminal,
  aTerminal,
  isMobile,
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
}: DataOfTicketOneWayComponent) {
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
  // Details
  const dFormattedDate = format(parsedDepartureDate, "EEEE d MMMM yyyy", {
    locale: arEG,
  });
  const aFormattedDate = format(parsedArrivalDate, "EEEE d MMMM yyyy", {
    locale: arEG,
  });

  // التفاصيل
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

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

  if (isMobile) {
    return (
      <>
        <Modal open={openModal} onClose={handleClose}>
          <div
            className={`flex flex-col gap-[15px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-start  p-[12px] border-2 border-[#FFF] rounded-[16px] bg-[#D9D9D9]`}
          >
            <button onClick={handleClose} className={`rounded-full`}>
              {iconRedClose}
            </button>
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
                    departureIataCode={arrivalIataCodeReturn}
                    date={aFormattedDate}
                    airPort=""
                    iconHomeAntra={iconHomeAntra}
                    terminal={aTerminal}
                  />
                  <DetailsTicket
                    title="المغادرة"
                    departureIataCode={departureIataCode}
                    date={dFormattedDate}
                    airPort=""
                    iconHomeAntra={iconHomeAntra}
                    terminal={dTerminal}
                  />
                </div>
                <div className={`ms-auto pe-[24px] `}>
                  <DetailsAirPort
                    airPortImage={""}
                    airBusCode={`Airbus A${aircraftCode}`}
                    travelCode={`${carrierCode}-${flightNumber}`}
                    degree={degree}
                  />
                </div>
              </div>
            </div>
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
          className={`cursor-pointer  px-[26px] relative rounded-[16px] flex flex-col justify-center items-center flex-1 `}
          dir="rtl"
        >
          <div className={`w-full pb-[22px] py-[20px]`}>
            <div className={`flex flex-col`}>
              <div className={`flex items-start gap-[5px]`}>
                {/* الطائرة */}
                <div className={`flex    flex-col gap-[8px] `}>
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
                {isStope === 0 && (
                  <div className={`flex items-center gap-[2px]`}>
                    <span className={`relative top-[2px]`}>{iconDot}</span>
                    <span
                      className={`text-[#117C99] text-[13px] font-[700] whitespace-nowrap`}
                    >
                      بدون توقف
                    </span>
                  </div>
                )}
                {/* افضل سعر */}
                <div className=" flex flex-col  justify-between h-full mr-0">
                  {/* افضل سعر */}
                  <div className={` `}>
                    {+minPriceState === +price && (
                      <div
                        className={`bg-[#B3E0D2] xl:w-[82px] w-[72px] ms-auto xl:h-[38px] h-[28px] rounded-[8px] flex justify-center items-center `}
                      >
                        <span
                          className={`text-[#006C4B] text-[13px] font-[700]`}
                        >
                          افضل سعر
                        </span>
                      </div>
                    )}
                  </div>
                  {/* <button
              className={` border-2 border-[#117C99] hover:bg-[#117c99f3] text-[#005A6C] hover:text-[#fff] text-[16px] font-[700] xl:w-[93px] w-[73px] ms-auto xl:h-[48px] h-[38px] rounded-[16px] flex justify-center items-center `}
            >
              <span className={` text-[16px] font-[700]`}>التفصيل</span>
            </button> */}
                </div>
              </div>
              {/* Date */}
              <div className={`grid w-full  grid-cols-3  `}>
                <div className={`flex flex-col gap-[8px]`}>
                  <span className={`text-[#231F20] text-[14px] font-[700]`}>
                    {departureIataCode}
                  </span>
                  <span className={`text-[#000] text-[20px] font-[700]`}>
                    {handleParsedDepartureTime}
                  </span>
                  <div
                    className={`text-[#333] text-[14px] font-[700] flex gap-1`}
                  >
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
                </div>
                <div className={`flex flex-col gap-[8px] items-end`}>
                  <span className={`text-[#231F20] text-[14px] font-[700]`}>
                    {arrivalIataCodeReturn}
                  </span>
                  <span className={`text-[#000] text-[20px] font-[700]`}>
                    {handleParsedArrivalTime}
                  </span>
                  <div
                    className={`text-[#333] text-[14px] font-[700] flex gap-1`}
                  >
                    <span>{handleParsedArrivalDate}</span>
                    <span>{handleParsedArrivalDay}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`lg:w-[548px] ll:w-[648px] relative rounded-s-[16px] flex flex-col justify-center items-center flex-1 `}
      dir="rtl"
    >
      <div
        className={`flex justify-between pr-[10px] xl:pl-[24px] pl-[10px] items-end pb-[22px] w-full h-full border border-t-0 lg:border-b-0 xl:border-b-1 border-x-0`}
      >
        {/* الطائرة */}
        <div className={`flex flex-col gap-[8px] `}>
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
        <div className={`grid w-[340px]  grid-cols-3  `}>
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
                      <div
                        className={`bg-[#FFFFFF] w-[610px] h-[426px] border-2 z-10 mt-[calc(32px/2)] font- rounded-[16px] py-[16px] px-[6px]`}
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
                              departureIataCode={arrivalIataCodeReturn}
                              date={aFormattedDate}
                              airPort=""
                              iconHomeAntra={iconHomeAntra}
                              terminal={aTerminal}
                            />
                            <DetailsTicket
                              title="المغادرة"
                              departureIataCode={departureIataCode}
                              date={dFormattedDate}
                              airPort=""
                              iconHomeAntra={iconHomeAntra}
                              terminal={dTerminal}
                            />
                          </div>
                          <div className={`ms-auto pe-[24px] `}>
                            <DetailsAirPort
                              airPortImage={""}
                              airBusCode={`Airbus A${aircraftCode}`}
                              travelCode={`${carrierCode}-${flightNumber}`}
                              degree={degree}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
                arrow
              >
                <button
                  onClick={handleTooltipOpen}
                  className={` border-2 border-[#117C99] hover:bg-[#117c99f3] text-[#005A6C] hover:text-[#fff] text-[16px] font-[700] xl:w-[93px] w-[73px] ms-auto xl:h-[48px] h-[38px] rounded-[16px] flex justify-center items-center `}
                >
                  <span className={` text-[16px] font-[700]`}>التفصيل</span>
                </button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
}

export default TicketOneWay;
