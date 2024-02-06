import { useState } from "react";
import BtnLogin from "../../../BtnAuth/BtnLogin";
import { iconGoogle } from "../../../../assets/icons/home";
import HandlerFieldsBooking from "./HandlerFieldsBooking";

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
          <div
            className={`flex flex-wrap-reverse justify-end items-center gap-[24px] pe-[12px] ps-[12px]`}
          >
            <div className={`flex gap-[18px] justify-between items-center`}>
              <button className="">
                <BtnLogin title={`حساب جوجل`} icon={iconGoogle} />
              </button>
              <button>
                <BtnLogin title={`حساب جوجل`} icon={iconGoogle} />
              </button>
            </div>
            <h2 className={`text-[16px] text-end text-[#117C99] font-medium`}>
              يمكن التسجيل السريع من خلال
            </h2>
          </div>
          <HandlerFieldsBooking />
        </div>
        
      </div>
    </div>
  );
}

export default FormBookingData;
