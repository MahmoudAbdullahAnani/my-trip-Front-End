import { useRecoilState } from "recoil";
import BookingSteps from "../../components/Home/Sections/Search/Headers/BookingSteps";
import {
  TicketChose,
  TicketId,
} from "../../data/RecoilState/Search/TicketData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../data/RecoilState/Search/MainData";
import AirBill from "../../components/Home/Sections/Bills/AirBill";
import { FlightOffer } from "../../interface/MainData";
import HeaderSearch from "../../components/Home/Sections/Search/Headers/HeaderSearch";
// import { iconTime, iconWarning } from "../../assets/icons/home";
import TicketBill from "../../components/Home/Sections/Bills/TicketBill";
import Iusso, { Iusso2 } from "../../components/Home/Sections/Bills/Iusso";
import FormBookingData from "../../components/Home/Sections/Bills/FormBookingData";

function AirData() {
  const [ticketIdState] = useRecoilState(TicketId);
  const navigator = useNavigate();

  // Find Obj Data
  const [ifCheckedFilterState] = useRecoilState(IfCheckedFilter);
  const [tripDataFilters] = useRecoilState(TripDataFilters);
  const [tripStopeFiltersState] = useRecoilState(TripStopeFilters);
  const mainData = ifCheckedFilterState
    ? tripStopeFiltersState
    : tripDataFilters;

  // console.log(mainData);
  const data: FlightOffer = mainData.filter(
    ({ id }) => id === ticketIdState
  )[0];

  const [, setTicketChoseState] = useRecoilState(TicketChose);

  useEffect(() => {
    window.scroll(0, 0);
    if (!ticketIdState) {
      return navigator("/search");
    }
    if (data) {
      setTicketChoseState(data);
    }
  }, []);

  return (
    <section className={``}>
      <HeaderSearch />
      <div className={`h-[104px] mb-[25px] lg:block hidden`}>
        <BookingSteps />
      </div>
      {/* Content Page airData */}
      <div
        className={`flex justify-center xl:flex-nowrap flex-wrap sm:px-[95.5px] px-[5px]  gap-[24px]`}
      >
        <div
          className={`2xl:w-[547px] xl:w-[547px] w-[347px] h-[636px] rounded-[16px] `}
        >
          {data && <AirBill priceTotal={+data.price.total} />}
          <Iusso2 />
        </div>
        <div className={`w-[718px] rounded-[16px] `}>
          {data && <TicketBill />}
          <Iusso />
          <FormBookingData />
        </div>
      </div>
    </section>
  );
}

export default AirData;
