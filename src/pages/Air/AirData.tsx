import { useRecoilState } from "recoil";
import BookingSteps from "../../components/Home/Sections/Search/Headers/BookingSteps";
import { TicketId } from "../../data/RecoilState/Search/TicketData";
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
import { iconTime } from "../../assets/icons/home";

function AirData() {
  const [ticketIdState] = useRecoilState(TicketId);
  const navigator = useNavigate();
  useEffect(() => {
    if (!ticketIdState) {
      navigator("/search");
    }
  }, []);
  // Find Obj Data
  const [ifCheckedFilterState] = useRecoilState(IfCheckedFilter);
  const [tripDataFilters] = useRecoilState(TripDataFilters);
  const [tripStopeFiltersState] = useRecoilState(TripStopeFilters);
  const mainData = ifCheckedFilterState
    ? tripStopeFiltersState
    : tripDataFilters;

  // console.log(mainData);
  const { price }: FlightOffer = mainData.filter(
    ({ id }) => id === ticketIdState
  )[0];

  return (
    <section className={``}>
      <HeaderSearch />
      <div className={`h-[104px] mb-[25px] lg:block hidden`}>
        <BookingSteps />
      </div>
      {/* Content Page Search */}
      <div
        className={`flex lg:flex-nowrap flex-wrap sm:px-[95.5px] px-[5px]  gap-[24px]`}
      >
        <div className={`lg:w-[506px] h-[543px] rounded-[16px] `}>
          <AirBill priceTotal={+price.total} />
          <div
            className={`bg-[#E7EAF7] text-[#002684] text-[20px] mt-[24px] font-medium w-full rounded-[16px] text-center flex justify-center items-center gap-[24px]`}
          >
            <span>يمكنك إلغاء الحجز خلال 24 ساعة</span>
            <span>{iconTime}</span>
          </div>
        </div>
        <div className={`w-[718px] h-[800px] rounded-[16px] bg-[#FFF]`}></div>
      </div>
    </section>
  );
}

export default AirData;
