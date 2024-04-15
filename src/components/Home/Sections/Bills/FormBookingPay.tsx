import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  iconApplePay,
  iconFawry,
  iconPayPal,
  iconVisa,
} from "../../../../assets/icons/home";
import { useRecoilState } from "recoil";
import {
  URLApplePayPayment,
  URLfawryPayment,
  URLPayment,
  URLPayPalPayment,
  URLVisaPayment,
} from "../../../../data/RecoilState/Payment/StripeURLsPayment";
import { Flip, toast } from "react-toastify";
import { priceOfTotalState } from "../../../../data/RecoilState/Search/TicketData";

const styleLi = `max-w-[554px] cursor-pointer border border-[#656565] rounded-[8px] mx-auto  w-full`;
const styleLabel = `flex w-full py-[18px] px-[24px] cursor-pointer`;

function FormBookingPay() {
  const [togglePrice, setTogglePrice] = useState(true);
  const [URLPayPalPaymentState] = useRecoilState(URLPayPalPayment);
  const [URLApplePayPaymentState] = useRecoilState(URLApplePayPayment);
  const [URLVisaPaymentState] = useRecoilState(URLVisaPayment);
  const [URLfawryPaymentState] = useRecoilState(URLfawryPayment);
  // console.log(URLsPaymentState);

  const [, setSelectedPaymentType] = useState<string>("");
  const [handleLinkPay, setHandleLinkPay] = useState<string>("");
  const handleSumited = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // const navigate = useNavigate();

  const [URLPaymentState, setURLPaymentState] = useRecoilState(URLPayment);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentType(e.target.value);

    const handleLink =
      e.target.value === "PayPal"
        ? URLPayPalPaymentState
        : e.target.value === "ApplePay"
        ? URLApplePayPaymentState
        : e.target.value === "Fawry"
        ? URLfawryPaymentState
        : e.target.value === "Visa"
        ? URLVisaPaymentState
        : "";
    // if (handleLink === "") {
    //   return navigate("/airData");
    // }
    setURLPaymentState(handleLink);
    setHandleLinkPay(handleLink);
  };
  const [priceOfTotal] = useRecoilState(priceOfTotalState);

  useEffect(() => {}, [
    URLPayPalPaymentState,
    URLApplePayPaymentState,
    URLfawryPaymentState,
    URLVisaPaymentState,
  ]);
  return (
    <div
      className={`bg-[#e9e9e9] duration-500 rounded-[16px] mt-[16px] lg:mb-[570px] mb-[70px]`}
    >
      <button
        name="togglePrice"
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
        <div className={`mt-[31.68px] lg:px-[24px] px-[10px] w-full`}>
          <form onSubmit={handleSumited}>
            <ul dir="rtl" className={`flex flex-col gap-[16px]`}>
              <li className={`${styleLi}`}>
                <label className={`${styleLabel}`}>
                  <input
                    value="PayPal"
                    className={`inputPay`}
                    type="radio"
                    name="typePay"
                    onChange={handleRadioChange}
                  />
                  <span className={`mx-auto`}>{iconPayPal}</span>
                </label>
              </li>
              <li className={`${styleLi}`}>
                <label className={`${styleLabel}`}>
                  <input
                    value="ApplePay"
                    className={`inputPay`}
                    type="radio"
                    name="typePay"
                    onChange={handleRadioChange}
                  />
                  <span className={`mx-auto`}>{iconApplePay}</span>
                </label>
              </li>
              <li className={`${styleLi}`}>
                <label className={`${styleLabel}`}>
                  <input
                    value="Fawry"
                    className={`inputPay`}
                    type="radio"
                    name="typePay"
                    onChange={handleRadioChange}
                  />
                  <span className={`mx-auto`}>{iconFawry}</span>
                </label>
              </li>
              <li className={`${styleLi}`}>
                <label className={`${styleLabel}`}>
                  <input
                    value="Visa"
                    className={`inputPay`}
                    type="radio"
                    name="typePay"
                    onChange={handleRadioChange}
                  />
                  <span className={`mx-auto`}>{iconVisa}</span>
                </label>
              </li>
            </ul>

            <div className={`h-[120px]`}></div>
            {/* desktop */}
            {URLPaymentState === "" ? (
              <button
                name="togglePrice"
                onClick={() =>
                  toast.warn("يجب اختيار طريقة دفع", {
                    position: "top-right",
                    autoClose: 5075,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                  })
                }
                className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
              >
                <div
                  className={`lg:w-[506px] w-[306px] h-[86px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex flex-col justify-center relative top-5 items-center `}
                >
                  <span>إكمال عملة الدفع</span>
                  <div className={`flex items-center gap-1 justify-center `}>
                    <span> جنية مصري </span>
                    <div>
                      <span className={`text-[24px]`}>
                        {Math.floor(+priceOfTotal)}
                      </span>
                      <span>
                        .{Math.round(+priceOfTotal - Math.floor(+priceOfTotal))}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ) : (
              <Link
                to={handleLinkPay}
                className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
              >
                <div
                  className={`lg:w-[506px] w-[306px] h-[86px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex flex-col justify-center relative top-5 items-center `}
                >
                  <span>إكمال عملة الدفع</span>
                  <div className={`flex items-center gap-1 justify-center `}>
                    <span> جنية مصري </span>
                    <div>
                      <span className={`text-[24px]`}>
                        {Math.floor(+priceOfTotal)}
                      </span>
                      <span>
                        .{Math.round(+priceOfTotal - Math.floor(+priceOfTotal))}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* mobile */}
            {URLPaymentState === "" ? (
              <button
                name="togglePrice"
                onClick={() =>
                  toast.warn("يجب اختيار طريقة دفع", {
                    position: "top-right",
                    autoClose: 5075,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                  })
                }
                className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
              >
                <div
                  className={`lg:w-[506px] w-[306px] h-[86px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex flex-col justify-center relative top-5 items-center `}
                >
                  <span>إكمال عملة الدفع</span>
                  <div className={`flex items-center gap-1 justify-center `}>
                    <span> جنية مصري </span>
                    <div>
                      <span className={`text-[24px]`}>
                        {Math.floor(+priceOfTotal)}
                      </span>
                      <span>
                        .{Math.round(+priceOfTotal - Math.floor(+priceOfTotal))}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ) : (
              <Link
                to={handleLinkPay}
                className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
              >
                <div
                  className={`lg:w-[506px] w-[306px] h-[86px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex flex-col justify-center relative top-5 items-center `}
                >
                  <span>إكمال عملة الدفع</span>
                  <div className={`flex items-center gap-1 justify-center `}>
                    <span> جنية مصري </span>
                    <div>
                      <span className={`text-[24px]`}>
                        {Math.floor(+priceOfTotal)}
                      </span>
                      <span>
                        .{Math.round(+priceOfTotal - Math.floor(+priceOfTotal))}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormBookingPay;
