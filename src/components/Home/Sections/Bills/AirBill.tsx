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
  // URLApplePayPayment,
  // URLfawryPayment,
  URLPayPalPayment,
  URLVisaPayment,
} from "../../../../data/RecoilState/Payment/StripeURLsPayment";
import { useTranslation } from "react-i18next";

// interface
interface DataCheckoutSession {
  price: number;
  description: string;
  user_id: string;
  urlSuccess: string;
  urlCancel: string;
  userEmail: string;
  carrierCodeLogo: string;
  timeGo: string;
  timeSet: string;
  durationH?: string;
  durationM?: string;
  isStope?: number;
}

const tex = 60.7;
const texAddition = 0;

function AirBill({
  priceTotal,
  isPageAirPay = false,
  departure,
  arrival,
  carrierCodeLogo,
  timeGo,
  timeSet,
  durationH,
  durationM,
  isStope,
}: {
  departure?: string;
  arrival?: string;
  carrierCodeLogo?: string;
  priceTotal: number;
  isPageAirPay?: boolean;
  timeGo?: string;
  timeSet?: string;
  durationH?: string;
  durationM?: string;
  isStope?: number;
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
  // const [, setURLApplePayPaymentState] = useRecoilState(URLApplePayPayment);
  const [, setURLVisaPaymentState] = useRecoilState(URLVisaPayment);
  // const [, setURLfawryPaymentState] = useRecoilState(URLfawryPayment);
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
    timeGo,
    timeSet,
    durationH,
    durationM,
    isStope,
  }: DataCheckoutSession) => {
    setDataLoadingState(true);
    // PayPal
    // console.log({
    //   price: +totalPriceUSD,
    //   description,
    //   user_id,
    //   urlSuccess,
    //   urlCancel,
    //   userEmail,
    //   carrierCodeLogo,
    //   timeGo,
    //   timeSet,
    // });

    await axios
      .post(
        `${
          import.meta.env.VITE_PUBLIC_API_PRODUCTION
        }/checkout-completed/paypal`,
        {
          price: Math.round(+totalPriceUSD),
          description,
          user_id,
          urlSuccess,
          urlCancel,
          userEmail,
          carrierCodeLogo,
          timeGo,
          timeSet,
          durationH,
          durationM,
          isStope,
        }
      )
      .then(({ data }) => {
        setDataLoadingState(false);
        // console.log(data);

        setURLPayPalPaymentState(data.links[1].href);
      })
      .catch((err) => {
        console.log("err-PayPal==> ", err);
        setDataLoadingState(false);
        navigate("/airData");
        toast.warn("هناك مشكلة بالانترنت لديك", {
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
      .post(
        `${
          import.meta.env.VITE_PUBLIC_API_PRODUCTION
        }/checkout-completed/stripe`,
        {
          typeSystem: "Air",
          price,
          description,
          user_id,
          urlSuccess,
          urlCancel,
          userEmail,
          carrierCodeLogo,
          timeGo,
          timeSet,
          durationH,
          durationM,
          isStope,
        }
      )
      .then(({ data }) => {
        setDataLoadingState(false);
        setURLVisaPaymentState(data.url);
      })
      .catch((err) => {
        console.log("err===> ", err);
        setDataLoadingState(false);
        navigate("/airData");
        toast.warn("هناك مشكلة بالانترنت لديك", {
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

  // handle catch data
  const sendCatchData = async () => {
    const CompanyLogo = `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${carrierCodeLogo}.svg`;
    const chooseTicket = {
      CompanyLogo,
      isStope: isStope || 0,
      durationH,
      durationM,
      price: totalPriceUSD,
      timeGo,
      timeSet,
    };

    const sessionId = localStorage.getItem("sessionId");
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/catch-data/ticket/${sessionId}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/catch-data/ticket/${sessionId}`,
        {
          chooseTicket: { ...chooseTicket },
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
    return true;
  };

  const [dataBookingState] = useRecoilState(DataBooking);
  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  useEffect(() => {
    if (pathname === "/airPay") {
      sendCatchData();
      setPriceOfTotal(priceOfTotal);
      createCheckoutSession({
        price: priceOfTotal,
        description: `${arrival} الى ${departure} رحلة من `,
        user_id: stateUserData._id || "guest",
        urlSuccess: `https://ittrip.vercel.app?system=car&status=success`,
        urlCancel: `https://ittrip.vercel.app?system=car&status=cancel`,
        userEmail: dataBookingState.EmailBooking,
        carrierCodeLogo: carrierCodeLogo || "",
        timeGo: timeGo || "",
        timeSet: timeSet || "",
        durationH: durationH || "",
        durationM: durationM || "",
        isStope: isStope || 0,
      });
    }
  }, []);

  // Lang
  const { t, i18n } = useTranslation();

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
        {t("ملخص السعر")}
      </button>
      <div
        style={{
          boxShadow: " rgb(0 90 108 / 30%)  0 4px 4px",
        }}
        className={`w-full  ${
          togglePrice ? "" : "h-[0px] hidden"
        } relative duration-500 ps-[39px] pe-[24px] xl:w-[547px] w-[347px] flex flex-col bg-[#FFF] rounded-[16px] rounded-tr-[0px]`}
      >
        <div
          className={`flex flex-col gap-[26px] pt-[129px] `}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <DetailsBill
            title={`${t("مسافر")}${adultsDataState}:${t("بالغ")}`}
            content={{
              price: `${priceOfAdults}`,
            }}
          />
          <div className={`flex flex-col gap-[10px]`}>
            <DetailsBill title={t(`رسوم اخرى`)} content={{ price: `${tex}` }} />
            <DetailsBill
              title={t("ضريبة القيمة المضافة %0")}
              content={{ price: `${texAddition}` }}
            />
          </div>
        </div>
        <hr className={`h-[2px] bg-[#4F4F4F] my-[47px]`} />
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <DetailsBill
            title={t("إجمالي السعر")}
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
