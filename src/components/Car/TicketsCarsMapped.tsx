import { useRecoilState } from "recoil";

import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { MainDataCars } from "../../data/RecoilState/car/MainDataCar";
import { useNavigate } from "react-router-dom";
import TicketCar from "./TicketCar";

const pageSize = 4;

function TicketsCarsMapped() {
  // const [data] = useRecoilState(SetTicketsHotels);
  const [data] = useRecoilState(MainDataCars);

  const navigator = useNavigate();
  // console.log("data==>", data);
  // console.log(data.length);
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
  useEffect(() => {
    if (data.length <= 0) {
      return navigator("/car");
    }
  }, []);
  return (
    <div className={`my-8 px-[16px] lg:px-[96px]`}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 `}
      >
        {data.slice(pagination.from, pagination.to).map((item, index) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <TicketCar {...item} key={`${index}---${Math.random()}`} />
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

export default TicketsCarsMapped;
