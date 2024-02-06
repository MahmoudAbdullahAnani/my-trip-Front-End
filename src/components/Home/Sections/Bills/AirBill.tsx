import { useRecoilState } from "recoil";
import DetailsBill from "./DetailsBill";
import { adultsData } from "../../../../data/RecoilState/FormSearchData";
import { useState } from "react";
import { BtnPay } from "./Iusso";

function AirBill({ priceTotal }: { priceTotal: number }) {
  const [adultsDataState] = useRecoilState(adultsData);
  const [togglePrice, setTogglePrice] = useState(true);
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
              price: `${priceTotal * +adultsDataState}`,
            }}
          />
          <div className={`flex flex-col gap-[10px]`}>
            <DetailsBill title={`رسوم اخرى`} content={{ price: "60.70" }} />
            <DetailsBill
              title={`ضريبة القيمة المضافة %0`}
              content={{ price: "0000000" }}
            />
          </div>
        </div>
        <hr className={`h-[2px] bg-[#4F4F4F] my-[47px]`} />
        <div>
          <DetailsBill
            title={`إجمالي السعر`}
            content={{ price: `${priceTotal * +adultsDataState + 60.7}` }}
          />
        </div>
        <div className={`h-[calc(64px+80px)]`}></div>
        <BtnPay />
      </div>
    </div>
  );
}

export default AirBill;
