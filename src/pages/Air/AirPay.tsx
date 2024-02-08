import { useRecoilState } from "recoil";
import BookingSteps from "../../components/Home/Sections/Search/Headers/BookingSteps";
import HeaderSearch from "../../components/Home/Sections/Search/Headers/HeaderSearch";
import { useEffect } from "react";
import {
  TicketChose,
  TicketId,
} from "../../data/RecoilState/Search/TicketData";
import { FlightOffer } from "../../interface/MainData";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../data/RecoilState/Search/MainData";
import { useNavigate } from "react-router-dom";
import AirBill from "../../components/Home/Sections/Bills/AirBill";
import { Iusso2 } from "../../components/Home/Sections/Bills/Iusso";
import TicketBill from "../../components/Home/Sections/Bills/TicketBill";
import FormBookingPay from "../../components/Home/Sections/Bills/FormBookingPay";
function AirPay() {
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

  useEffect(() => {
    window.scroll(0, 0);
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
          {data && (
            <AirBill
              carrierCodeLogo={data.itineraries[0].segments[0].carrierCode}
              departure={data.itineraries[0].segments[0].departure.iataCode}
              arrival={data.itineraries[0].segments[1].arrival.iataCode}
              isPageAirPay={true}
              priceTotal={+data.price.total}
            />
          )}
          <Iusso2 />
        </div>
        <div className={`w-[718px] rounded-[16px] `}>
          {data && <TicketBill />}
          <FormBookingPay />
        </div>
      </div>
    </section>
  );
}

export default AirPay;