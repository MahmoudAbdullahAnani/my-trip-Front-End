import { EGP } from "../../../../../Formater/FormatPrice";

function CheckOutTicket({
  degree,
  totalPriceEGP,
}: {
  degree: string;
  totalPriceEGP: number;
}) {
  return (
    <>
      <div
        className={`xl:flex hidden flex-col items-center justify-center relative cornerTicket rounded-e-[16px] w-full`}
      >
        <div
          className={`text-[#117C99] text-[16px] font-[700] p-[8px] rounded-[8px] bg-[#B6E7FB] text-center`}
        >
          الدرجة {degree}
        </div>
        <div
          className={`mt-[11px] mb-[8px] text-[#117C99] text-[24px] font-[700]`}
        >
          {EGP.format(+totalPriceEGP)}
        </div>
        <button
          className={`text-[#FFF] text-[20px] w-[154px] h-[48px] font-[700] py-[10px] px-[16px] rounded-[16px] duration-200 bg-[#117C99] hover:bg-[#117c99ba]`}
        >
          <span>اختار الرحلة</span>
        </button>
      </div>
      <div
        className={`flex xl:hidden flex-col items-center justify-center relative cornerTicketLG rounded-e-[16px] w-full`}
      >
        <div
          className={`text-[#117C99] text-[16px] font-[700] p-[8px] rounded-[8px] bg-[#B6E7FB] text-center`}
        >
          الدرجة {degree}
        </div>
        <div
          className={`mt-[11px] mb-[8px] text-[#117C99] text-[24px] font-[700]`}
        >
          {EGP.format(+totalPriceEGP)}
        </div>
        <button
          className={`text-[#FFF] text-[20px] w-[154px] h-[48px] font-[700] py-[10px] px-[16px] rounded-[16px] duration-200 bg-[#117C99] hover:bg-[#117c99ba]`}
        >
          <span>اختار الرحلة</span>
        </button>
      </div>
    </>
  );
}

export default CheckOutTicket;
