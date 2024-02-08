import { useState } from "react";
import { Link } from "react-router-dom";

function FormBookingPay() {
  const [togglePrice, setTogglePrice] = useState(true);

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
