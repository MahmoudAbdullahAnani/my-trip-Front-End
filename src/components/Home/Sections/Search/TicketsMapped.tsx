import { useRecoilState } from "recoil";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../../../data/RecoilState/Search/MainData";
import CardTrip from "./CardTrip";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { FlightOffer } from "../../../../interface/MainData";
import FiltersBtn from "./Btns/FiltersBtn";
import { iconArrowDown, iconFilters } from "../../../../assets/icons/home";

const pageSize = 9;

function TicketsMapped() {
  const [ifCheckedFilterState] = useRecoilState(IfCheckedFilter);
  const [tripDataFilters] = useRecoilState(TripDataFilters);
  const [tripStopeFiltersState] = useRecoilState(TripStopeFilters);
  const data = ifCheckedFilterState ? tripStopeFiltersState : tripDataFilters;
  // Handle Pagination Data
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  function handlePagination(_event: React.ChangeEvent<unknown>, page: number) {
    window.scroll(0, 0);
    setPagination({
      ...pagination,
      from: pageSize * (page - 1),
      to: pageSize + pageSize * (page - 1),
    });
  }

  useEffect(() => {}, [tripDataFilters, tripDataFilters]);
  if (data.length <= 0) {
    return (
      <div className={`col-span-4 lg:col-span-3 flex flex-col items-center`}>
        <div>Not Found</div>
      </div>
    );
  }
  return (
    <div className={`col-span-4 lg:col-span-3 flex flex-col items-center`}>
      <div className={`lg:block hidden`}>
        <FiltersBtn title="ترتيب" icon={iconFilters} drawer={iconArrowDown} />
      </div>
      <div className={`lg:mt-[63px] mt-[0px] flex flex-col items-center`}>
        <div className={`flex flex-col gap-[24px]`}>
          {data
            .slice(pagination.from, pagination.to)
            .map((trip: FlightOffer) => {
              return (
                <CardTrip {...trip} key={`${trip.id}--${Math.random()}`} />
              );
            })}
        </div>
        <div className={`my-10`}>
          {Math.ceil(data.length / pageSize) !== 1 && (
            <Pagination
              onChange={handlePagination}
              count={Math.ceil(data.length / pageSize)}
              variant="outlined"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketsMapped;
