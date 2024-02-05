import { useRecoilState } from "recoil";
import BookingSteps from "../../components/Home/Sections/Search/Headers/BookingSteps";
import HeaderSearch from "../../components/Home/Sections/Search/Headers/HeaderSearch";
import { TicketId } from "../../data/RecoilState/Search/TicketData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../data/RecoilState/Search/MainData";

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

  console.log(mainData);
  // const {id, price} = mainData.filter(({ id }) => id === ticketIdState)[0];

  return (
    <section className={``}>
      <HeaderSearch />
      <div className={`h-[104px] mb-[25px] lg:block hidden`}>
        <BookingSteps />
      </div>
      {/* Content Page Search */}
      <div className={`grid grid-cols-4`}></div>
    </section>
  );
}

export default AirData;
