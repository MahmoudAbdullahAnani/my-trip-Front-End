import { useRecoilState } from "recoil";
import { TripDataFilters } from "../../../../data/RecoilState/Search/MainData";
import CardTrip from "./CardTrip";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";


const pageSize = 9;

function TicketsMapped() {
  const [tripDataFilters] = useRecoilState(TripDataFilters);
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

  useEffect(() => {}, [tripDataFilters]);
  if (tripDataFilters.length <= 0) {
    return (
      <div className={`col-span-4 lg:col-span-3 flex flex-col items-center`}>
        <div>Not Found</div>
      </div>
    );
  }
  return (
    <div className={`col-span-4 lg:col-span-3 flex flex-col items-center`}>
      {tripDataFilters
        .slice(pagination.from, pagination.to)
        .map(
          (trip: { itineraries: []; id: string; price: { total: string } }) => {
            return (
              <CardTrip
                itineraries={trip.itineraries}
                price={trip.price}
                key={`${trip.id}--${Math.random()}`}
              />
            );
          }
        )}
      <Pagination
        onChange={handlePagination}
        count={Math.ceil(tripDataFilters.length / pageSize)}
        variant="outlined"
      />
    </div>
  );
}

export default TicketsMapped;
