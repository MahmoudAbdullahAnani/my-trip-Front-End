import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  iconApplePay,
  iconMasterCard,
  iconPayPal,
  iconVisa,
} from "../../../../assets/icons/home";
import { useRecoilState } from "recoil";
import { URLsPayment } from "../../../../data/RecoilState/Payment/StripeURLsPayment";

function FormBookingPay() {
  const [togglePrice, setTogglePrice] = useState(true);
  const [URLsPaymentState] = useRecoilState(URLsPayment);
  console.log(URLsPaymentState);

  useEffect(() => {}, [URLsPaymentState.MasterCard]);
  return (
    <div
      className={`bg-[#e9e9e9] duration-500 rounded-[16px] mt-[16px] lg:mb-[570px] mb-[70px]`}
    >
      <button
        onClick={() => setTogglePrice(!togglePrice)}
        className={`cursor-pointer relative text-[#000] ms-auto ${
          togglePrice
            ? "rounded-t-[16px] roundedCornerPayPrice"
            : "rounded-[16px]"
        }  text-center text-[24px] h-[49px] flex justify-center items-center font-bold bg-[#FFF] hover:bg-[#ffffff86] duration-500 w-[358px]`}
      >
        طريقة الدفع
      </button>
      <div
        style={{
          boxShadow: "rgb(0 90 108 / 30%)  0 4px 4px",
        }}
        className={`w-full  ${
          togglePrice ? "" : "h-[0px] hidden"
        } relative duration-500 flex flex-wrap items-end flex-col bg-[#FFF] rounded-[16px] rounded-tr-[0px]`}
      >
        <div className={`mt-[31.68px] lg:px-[24px] px-[10px]`}>
          {/* Content Pay BTNs */}
          {/* PayPal */}
          <a
            href={URLsPaymentState.PayPal}
            className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
          >
            {iconPayPal}
            Check out with PayPal
          </a>
          {/* Apple Pay */}
          <a
            href={URLsPaymentState.ApplePay}
            className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            Check out with Apple Pay
            {iconApplePay}
          </a>
          {/* Visa */}
          <a
            href={URLsPaymentState.MasterCard}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
          >
            {iconVisa}
            Pay with Visa
          </a>
          {/* MasterCard */}
          <a
            href={URLsPaymentState.MasterCard}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            {iconMasterCard}
            Pay with MasterCard
          </a>
          <div className={`h-[120px]`}></div>
          {/* desktop */}
          <Link
            to={`/`}
            className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
          >
            <span
              className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
            >
              دفع الان
            </span>
          </Link>
          {/* mobile */}
          <Link
            to={`/`}
            className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
          >
            <span
              className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
            >
              دفع الان
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormBookingPay;
