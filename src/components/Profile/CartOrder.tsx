import { useEffect, useState } from "react";
import { iconArrowDown, iconArrowTop, iconDot } from "../../assets/icons/home";
// Date
import { parseISO, format } from "date-fns";

interface metaData {
  description: string;
  logo: string;
  price: string;
  timeGo: string;
  timeSet: string;
  user_id: string;
  durationH: string;
  durationM: string;
  isStope: number;
}

function CartOrder({
  description,
  logo,
  timeGo,
  timeSet,
  isStope,
  user_id,
  durationM,
  durationH,
}: // price,
metaData) {
  const [toggle, setToggle] = useState(false);

  // handle Date
  const [handleParsedDepartureTime, setHandleParsedDepartureTime] =
    useState("");
  const [handleParsedArrivalTime, setHandleParsedArrivalTime] = useState("");
  useEffect(() => {
    if (timeGo !== "") {
      const parsedDepartureDate = parseISO(timeGo);
      const handleTimeGo = format(parsedDepartureDate, "h:mm a");
      setHandleParsedDepartureTime(handleTimeGo);
    }
    if (timeSet !== "") {
      const parsedArrivalDate = parseISO(timeSet);
      const handleTimeSet = format(parsedArrivalDate, "h:mm a");
      setHandleParsedArrivalTime(handleTimeSet);
    }
  }, [timeGo, timeSet]);

  return (
    <div
      key={`${user_id}---${Math.random()}`}
      dir={"ltr"}
      className="w-full px-[24px] pt-[30px] pb-[14px] xl:mt-0 mt-[50px] rounded-[16px] bg-[#FFF]"
      style={{ boxShadow: "rgba(0, 90, 108, 0.3) 0px 4px 4px" }}
    >
      <div className="flex flex-wrap justify-end items-center lg:gap-[113px] gap-[53px] ">
        <div>
          <img
            src={logo}
            alt="image-air"
            width="100"
            height="100"
            className="object-cover object-center w-[122px] "
          />
        </div>
        <div className="flex flex-col items-end justify-end gap-[16px] ">
          <h1 className="text-[#005A6C] text-[30px] font-bold ">
            {description}
          </h1>
          <div className="flex gap-[11px] ">
            {+isStope === 0 && (
              <div className="flex items-center gap-[2px]">
                <span className="text-[#181818] text-[13px] font-[700]">
                  بدون توقف
                </span>
                <span className="relative top-[2px]">{iconDot}</span>
              </div>
            )}
            <div className="text-[#181818] text-[14px] flex">
              <span className="text-[#181818] text-[14px] font-bold">
                ({durationH}h{durationM}m)
              </span>
              <div className="flex">
                <span>{handleParsedArrivalTime}</span>
                <span>{handleParsedDepartureTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end mt-[54px]">
        <div className={`flex justify-between items-center w-full`}>
          <div></div>
          <button
            name="toggle"
            className="flex items-center justify-center gap-[8px] text-[#117C99] hover:text-[#117c999c] text-[15px]"
            onClick={() => setToggle(!toggle)}
          >
            <span className="relative top-[2px]">
              {!toggle ? iconArrowDown : iconArrowTop}
            </span>
            <span>مشاهدة تفاصيل </span>
          </button>
        </div>
        {toggle && <div className="">Details Data</div>}
      </div>
    </div>
  );
}

export default CartOrder;
