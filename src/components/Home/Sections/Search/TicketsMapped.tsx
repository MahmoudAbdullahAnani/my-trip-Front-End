import { useRecoilState } from "recoil";
import {
  IfCheckedFilter,
  TripDataFilters,
  TripStopeFilters,
} from "../../../../data/RecoilState/Search/MainData";
import CardTrip from "./CardTrip";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { itinerariesSteps } from "./Filters/NumberOfStopsAirline";

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
    setPagination({
      ...pagination,
      from: pageSize * (page - 1),
      to: pageSize + pageSize * (page - 1),
    });
  }
  // console.log("tripDataFilters==> ", tripDataFilters);
  // console.log("tripStopeFiltersState==> ", tripStopeFiltersState);
  // console.log("data==> ", data);

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
      {data
        .slice(pagination.from, pagination.to)
        .map((trip: itinerariesSteps) => {
          return (
            <CardTrip
              itineraries={trip.itineraries}
              price={trip.price}
              key={`${trip.id}--${Math.random()}`}
              id={trip.id}
            />
          );
        })}
      {Math.ceil(data.length / pageSize) !== 1 && (
        <Pagination
          onChange={handlePagination}
          count={Math.ceil(data.length / pageSize)}
          variant="outlined"
        />
      )}
    </div>
  );
}

export default TicketsMapped;
