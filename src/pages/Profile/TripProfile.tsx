import axios from "axios";
import HeaderProfile from "../../components/Profile/HeaderProfile";

import TopHeader from "../../components/Profile/TopHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import CartOrder from "../../components/Profile/CartOrder";
import TicketLoading from "../../components/loder/TicketLoading";

interface Data {
  __v?: number;
  user_id: string;
  updatedAt: string;
  createdAt: string;
  totalOrderPrice: number;
  status: string;
  payment_method_types: string;
  payment_intent: string;
  name: string;
  evt_id: string;
  email: string;
  description: string;
  currency: string;
  _id: string;
  metaData: {
    description: string;
    logo: string;
    price: string;
    timeGo: string;
    timeSet: string;
    user_id: string;
    durationH: string;
    durationM: string;
    isStope: string;
  };
}

const pageSize = 5;

function TripProfile() {
  const [loading, setLoading] = useState(false);

  const [dataOrders, setDataOrders] = useState<{ data: Data[]; count: number }>(
    { data: [], count: 0 }
  );
  const getMyOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";

    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/checkout-completed`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/checkout-completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        const filterStripe = data.data.filter(
          ({ payment_method_types }: { payment_method_types: string }) =>
            payment_method_types === "card-Stripe"
        );
        // console.log({ filterStripe });

        setDataOrders({
          data: filterStripe,
          count: filterStripe.length,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  useEffect(() => {
    if (stateUserData._id === "") {
      return navigator("/");
    }
    getMyOrders();
  }, []);
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
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px] `}
      dir="rtl"
    >
      <TopHeader />
      <div className={`flex flex-wrap gap-[24px] items-start justify-start`}>
        {/* side bar */}
        <HeaderProfile />
        {/* content */}
        <div className={`ll:w-[calc(100%-250px)] w-[100%]`}>
          <div
            className={`w-full max-w-[848px] flex flex-col gap-[24px] mb-[24px]`}
          >
            {/* Map Data Orders */}
            {loading ? (
              <div className={`my-[50px]`}>
                <TicketLoading />
              </div>
            ) : (
              dataOrders.data
                .slice(pagination.from, pagination.to)
                .map(({ _id, metaData }: Data) => (
                  <CartOrder key={`${_id}---${Math.random()}`} {...metaData} />
                ))
            )}
          </div>
          {dataOrders.count > 5 && (
            <Pagination
              count={Math.ceil(dataOrders.count / pageSize)}
              onChange={handlePagination}
              variant="outlined"
              dir="ltr"
              className="flex justify-center"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TripProfile;
