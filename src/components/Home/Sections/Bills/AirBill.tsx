import { useRecoilState } from "recoil";
import DetailsBill from "./DetailsBill";
import { adultsData } from "../../../../data/RecoilState/FormSearchData";
import { useEffect, useState } from "react";
import { BtnPay } from "./Iusso";
import { StoreCurrency } from "../../../../data/Fetching/StoreCurrency";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DataBooking,
  priceOfTotalState,
} from "../../../../data/RecoilState/Search/TicketData";
import { RootState } from "../../../../data/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import { DataLoading } from "./DataLoading";
import TicketLoading from "../../../loder/TicketLoading";
import {
  URLApplePayPayment,
  URLPayPalPayment,
  URLVisaPayment,
  URLfawryPayment,
} from "../../../../data/RecoilState/Payment/StripeURLsPayment";

// interface
interface DataCheckoutSession {
  price: number;
  description: string;
  user_id: string;
  urlSuccess: string;
  urlCancel: string;
  userEmail: string;
  carrierCodeLogo: string;
}

const tex = 60.7;
const texAddition = 0;

function AirBill({
  priceTotal,
  isPageAirPay = false,
  departure,
  arrival,
  carrierCodeLogo,
}: {
  departure?: string;
  arrival?: string;
  carrierCodeLogo?: string;
  priceTotal: number;
  isPageAirPay?: boolean;
}) {
  const [adultsDataState] = useRecoilState(adultsData);
  const [togglePrice, setTogglePrice] = useState(true);

  const [storeCurrency] = useRecoilState(StoreCurrency);
  // const totalPriceEUR = price.total;
  const totalPriceUSD = +priceTotal * +storeCurrency.rates.EUR;
  const totalPriceEGP = totalPriceUSD * +storeCurrency.rates.EGP;

  const priceOfAdults = Math.round(+totalPriceEGP * +adultsDataState);
  const priceOfTotal = Math.round(+priceOfAdults + +tex + +texAddition);
  const [, setPriceOfTotal] = useRecoilState(priceOfTotalState);

  const { pathname } = useLocation();
  // Create a session Payment with Stripe, and get URLs of data
  const [, setURLPayPalPaymentState] = useRecoilState(URLPayPalPayment);
  const [, setURLApplePayPaymentState] = useRecoilState(URLApplePayPayment);
  const [, setURLVisaPaymentState] = useRecoilState(URLVisaPayment);
  const [, setURLfawryPaymentState] = useRecoilState(URLfawryPayment);
  const [dataLoadingState, setDataLoadingState] = useRecoilState(DataLoading);
  const navigate = useNavigate();

  const createCheckoutSession = async ({
    price,
    description,
    user_id,
    urlSuccess,
    urlCancel,
    userEmail,
    carrierCodeLogo,
  }: DataCheckoutSession) => {
    setDataLoadingState(true);
    // PayPal
    await axios
      .post(`https://my-trip-back-end.onrender.com/checkout-completed/paypal`, {
        price,
        description,
        user_id,
        urlSuccess,
        urlCancel,
        userEmail,
        carrierCodeLogo,
      })
      .then(({ data }) => {
        setDataLoadingState(false);
        setURLPayPalPaymentState(data.links[1].href);
      })
      .catch((err) => {
        console.log("err-PayPal==> ", err);
        setDataLoadingState(false);
        navigate("/airData");
        toast.warn("هناك مشكلة بالنترنت لديك", {
          position: "top-right",
          autoClose: 5075,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      });
    // Stripe
    await axios
      .post(`https://my-trip-back-end.onrender.com/checkout-completed/stripe`, {
        price,
        description,
        user_id,
        urlSuccess,
        urlCancel,
        userEmail,
        carrierCodeLogo,
      })
      .then(({ data }) => {
        setDataLoadingState(false);
        setURLVisaPaymentState(data.url);
      })
      .catch((err) => {
        console.log("err===> ", err);
        setDataLoadingState(false);
        navigate("/airData");
        toast.warn("هناك مشكلة بالنترنت لديك", {
          position: "top-right",
          autoClose: 5075,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      });
  };

  const [dataBookingState] = useRecoilState(DataBooking);
  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  useEffect(() => {
    if (pathname === "/airPay") {
      setPriceOfTotal(priceOfTotal);
      createCheckoutSession({
        price: priceOfTotal,
        description: `${arrival} الى ${departure} رحلة من `,
        user_id: stateUserData._id || "0",
        urlSuccess: "https://ittrip.vercel.app/",
        urlCancel: "https://ittrip.vercel.app/",
        userEmail: dataBookingState.EmailBooking,
        carrierCodeLogo: carrierCodeLogo || "",
      });
    }
  }, []);

  return (
    <div className={`bg-[#e9e9e9] duration-500 rounded-[16px] `}>
      <button
        onClick={() => setTogglePrice(!togglePrice)}
        className={`cursor-pointer  relative text-[#000] ms-auto ${
          togglePrice
            ? "rounded-t-[16px] roundedCornerPayPrice"
            : "rounded-[16px]"
        }  text-center text-[24px] h-[49px] flex justify-center items-center font-bold bg-[#FFF]  hover:bg-[#ffffff86] duration-500 w-[215px]`}
      >
        ملخص السعر
      </button>
      <div
        style={{
          boxShadow: " rgb(0 90 108 / 30%)  0 4px 4px",
        }}
        className={`w-full  ${
          togglePrice ? "" : "h-[0px] hidden"
        } relative duration-500 ps-[39px] pe-[24px] xl:w-[547px] w-[347px] flex flex-col bg-[#FFF] rounded-[16px] rounded-tr-[0px]`}
      >
        <div className={`flex flex-col gap-[26px] pt-[129px] `}>
          <DetailsBill
            title={`مسافر${adultsDataState}:بالغ`}
            content={{
              price: `${priceOfAdults}`,
            }}
          />
          <div className={`flex flex-col gap-[10px]`}>
            <DetailsBill title={`رسوم اخرى`} content={{ price: `${tex}` }} />
            <DetailsBill
              title={`ضريبة القيمة المضافة %0`}
              content={{ price: `${texAddition}` }}
            />
          </div>
        </div>
        <hr className={`h-[2px] bg-[#4F4F4F] my-[47px]`} />
        <div>
          <DetailsBill
            title={`إجمالي السعر`}
            content={{ price: `${priceOfTotal}` }}
          />
        </div>
        <div className={`h-[calc(64px+80px)]`}></div>
        {dataLoadingState ? (
          <TicketLoading />
        ) : (
          <BtnPay isPageAirPay={isPageAirPay} />
        )}
      </div>
    </div>
  );
}

export default AirBill;
