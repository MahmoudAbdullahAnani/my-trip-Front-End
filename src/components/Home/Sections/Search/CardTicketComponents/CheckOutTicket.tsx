import { useRecoilState } from "recoil";
import { EGP } from "../../../../../Formater/FormatPrice";
import { TicketId } from "../../../../../data/RecoilState/Search/TicketData";
import { useNavigate } from "react-router-dom";

function CheckOutTicket({
  degree,
  totalPriceEGP,
  isMobile,
  ticketId,
}: {
  degree: string;
  ticketId: string;
  totalPriceEGP: number;
  isMobile?: boolean;
}) {
  const [, setTicketIdState] = useRecoilState(TicketId);
  const navigator = useNavigate();
  const ChoseTicket = () => {
    navigator("/airData");
    setTicketIdState(ticketId);
  };
  if (isMobile) {
    return (
      <>
        <div
          className={`cr:flex hidden w-full gap-[12px] justify-center  items-center pt-[36px] pb-[32px] px-[12px] relative cornerTicketMobile`}
        >
          <div
            className={`text-[#117C99] text-[16px] font-[700] p-[6px] rounded-[8px] bg-[#B6E7FB] flex justify-center items-center w-[144px] h-[32px]`}
          >
            الدرجة {degree}
          </div>
          <div
            className={`mt-[11px] mb-[8px] text-[#117C99] text-[24px] font-[700]`}
          >
            {EGP.format(+totalPriceEGP)}
          </div>
        </div>
        <div
          className={`flex cr:hidden w-full gap-[12px] justify-center  items-center pt-[36px] pb-[32px] px-[12px] relative  `}
        >
          <div
            className={`text-[#117C99] text-[16px] font-[700] p-[6px] rounded-[8px] bg-[#B6E7FB] flex justify-center items-center w-[144px] h-[32px]`}
          >
            الدرجة {degree}
          </div>
          <div
            className={`mt-[11px] mb-[8px] text-[#117C99] text-[24px] font-[700]`}
          >
            {EGP.format(+totalPriceEGP)}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`xl:flex hidden flex-col items-center justify-center relative cornerTicket  rounded-e-[16px] w-full`}
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
          onClick={ChoseTicket}
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
          onClick={ChoseTicket}
          className={`text-[#FFF] text-[20px] w-[154px] h-[48px] font-[700] py-[10px] px-[16px] rounded-[16px] duration-200 bg-[#117C99] hover:bg-[#117c99ba]`}
        >
          <span>اختار الرحلة</span>
        </button>
      </div>
    </>
  );
}

export default CheckOutTicket;
