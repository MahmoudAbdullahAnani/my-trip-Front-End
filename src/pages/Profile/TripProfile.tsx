import axios from "axios";
import HeaderProfile from "../../components/Profile/HeaderProfile";

import TopHeader from "../../components/Profile/TopHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { useEffect } from "react";

function TripProfile() {
  const getMyOrders = async () => {
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
        console.log(data);
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

  return (
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px]`}
      dir="rtl"
    >
      <TopHeader />
      <div className={`flex flex-wrap gap-[24px] items-start justify-start`}>
        {/* side bar */}
        <HeaderProfile />
        {/* content */}
        <div className={`ll:w-[calc(100%-250px)] w-[100%]`}>
          <div className={`w-full max-w-[848px] bg-red-900`}></div>
        </div>
      </div>
    </div>
  );
}

export default TripProfile;
