import { useRecoilState } from "recoil";
import DetailsBill from "./DetailsBill";
import { adultsData } from "../../../../data/RecoilState/FormSearchData";
import { useState } from "react";
import { BtnPay } from "./Iusso";
import { StoreCurrency } from "../../../../data/Fetching/StoreCurrency";

const tex = 60.7;
const texAddition = 0;

function AirBill({ priceTotal }: { priceTotal: number }) {
  const [adultsDataState] = useRecoilState(adultsData);
  const [togglePrice, setTogglePrice] = useState(true);

  const [storeCurrency] = useRecoilState(StoreCurrency);
  // const totalPriceEUR = price.total;
  const totalPriceUSD = +priceTotal * +storeCurrency.rates.EUR;
  const totalPriceEGP = totalPriceUSD * +storeCurrency.rates.EGP;

  const priceOfAdults = Math.round(+totalPriceEGP * +adultsDataState);
  const priceOfTotal = Math.round(+priceOfAdults + +tex + +texAddition);

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
        <BtnPay />
      </div>
    </div>
  );
}

export default AirBill;
