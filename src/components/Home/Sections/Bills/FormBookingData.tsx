import { useState } from "react";
import HandlerFieldsBooking from "./HandlerFieldsBooking";
// import BtnLoginAirData from "../../../BtnAuth/BtnLoginAirData";

function FormBookingData() {
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
        من فضلك أضف بيانات المسافر
      </button>
      <div
        style={{
          boxShadow: "rgb(0 90 108 / 30%)  0 4px 4px",
        }}
        className={`w-full  ${
          togglePrice ? "" : "h-[0px] hidden"
        } relative duration-500 flex flex-wrap items-end flex-col bg-[#FFF] rounded-[16px] rounded-tr-[0px]`}
      >
        <div className={`mt-[31.68px]`}>
          <HandlerFieldsBooking />
        </div>
      </div>
    </div>
  );
}

export default FormBookingData;
