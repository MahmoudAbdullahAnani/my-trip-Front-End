import { useRecoilState } from "recoil";
import DetailsBill from "./DetailsBill";
import { adultsData } from "../../../../data/RecoilState/FormSearchData";

function AirBill({ priceTotal }: { priceTotal: number }) {
  const [adultsDataState] = useRecoilState(adultsData);
  return (
    <div
      className={`w-full h-full relative ps-[39px] pe-[24px] flex flex-col bg-[#FFF] rounded-[16px]`}
    >
      <h1
        className={`text-[#000] w-full text-center pt-[30px] pb-[70px] text-[24px] font-bold`}
      >
        ملخص السعر
      </h1>
      <div className={`flex flex-col gap-[30px]`}>
        <DetailsBill
          title={`مسافر${adultsDataState}:بالغ`}
          content={{
            price: `${priceTotal * +adultsDataState}`,
          }}
        />
        <DetailsBill title={`رسوم اخرى`} content={{ price: "60.70" }} />
        <DetailsBill
          title={`ضريبة القيمة المضافة %0`}
          content={{ price: "0000000" }}
        />
      </div>
      <hr className={`h-[2px] bg-[#4F4F4F] my-[47px]`} />
      <div>
        <DetailsBill
          title={`إجمالي السعر`}
          content={{ price: `${priceTotal * +adultsDataState + 60.7}` }}
        />
      </div>
      <div
        className={`roundedCornerPay absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#e9e9e9] p-2 rounded-t-[16px]`}
      >
        <button
          className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-2 items-center `}
        >
          إكمال عملة الدفع
        </button>
      </div>
    </div>
  );
}

export default AirBill;
