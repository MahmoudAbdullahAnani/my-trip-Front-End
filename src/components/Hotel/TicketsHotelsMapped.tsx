import { useRecoilState } from "recoil";
import { SetTicketsHotels } from "../../data/RecoilState/Hotels/MainSearchData";
import TicketHotels from "./TicketHotels";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const pageSize = 10;

function TicketsHotelsMapped() {
  const [data] = useRecoilState(SetTicketsHotels);
  console.log(data);
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
  return (
    <div className={`my-8 px-[16px] lg:px-[96px]`}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 `}
      >
        {data.slice(pagination.from, pagination.to).map((item, index) => (
          <TicketHotels {...item} key={`${index}---${Math.random()}`} />
        ))}
      </div>
      <div className={`flex justify-center items-center my-3`}>
        {Math.ceil(data.length / pageSize) !== 1 && (
          <Pagination
            className={`mx-auto`}
            onChange={handlePagination}
            count={Math.ceil(data.length / pageSize)}
            variant="outlined"
          />
        )}
      </div>
    </div>
  );
}

export default TicketsHotelsMapped;
