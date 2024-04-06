import axios from "axios";
import HeaderProfile from "../../components/Profile/HeaderProfile";

import TopHeader from "../../components/Profile/TopHeader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import CartOrder from "../../components/Profile/CartOrder";
import TicketLoading from "../../components/loder/TicketLoading";
import { useTranslation } from "react-i18next";

import notFoundTrip from "/public/assets/profile/notFoundTrip.png";
import { iconBlush } from "../../assets/icons/home";
import { Bounce, toast } from "react-toastify";
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

  const [dataOrders, setDataOrders] = useState<{
    data: Data[];
    count: number;
  }>({ data: [], count: 0 });
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
            payment_method_types === "air-Stripe" ||
            payment_method_types === "air-PayPal"
        );
        console.log({ filterStripe });

        setDataOrders({
          data: filterStripe,
          count: filterStripe.length,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(t(error.response?.data.message), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
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
    window.scroll(0, 0);
    setPagination({
      ...pagination,
      from: pageSize * (page - 1),
      to: pageSize + pageSize * (page - 1),
    });
  }

  // handle lang
  const { t, i18n } = useTranslation();
  // dataOrders.data.length<=0

  return (
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px] `}
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
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
            ) : // dataOrders.data.length <= 0
            dataOrders.data.length <= 0 ? (
              <div className={`w-full flex items-center flex-col gap-[90px]`}>
                <h2 className="text-[32px] font-bold text-[#000] mb-[24px]">
                  {t("لا يوجد رحلة حالياً")}
                </h2>
                <img
                  src={notFoundTrip}
                  width={100}
                  height={100}
                  className={`h-[267px] w-[368px]`}
                />
                <Link
                  to={"/"}
                  className={`text-[24px] font-bold flex gap-[10px] items-center justify-center w-[236px] h-[48px] bg-[#117C99] hover:bg-[#117c99a2] duration-200 text-white rounded-[16px] `}
                >
                  <span>{t("إضافة رحلة")}</span>
                  <span>{iconBlush}</span>
                </Link>
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
