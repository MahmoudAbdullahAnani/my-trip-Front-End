import { useRecoilState } from "recoil";
import { typeTravel } from "../../../../data/RecoilState/FormHandling";
import { iconDirectionSmall, iconDot } from "../../../../assets/icons/home";
import { MinPrice } from "../../../../data/RecoilState/Search/MainData";

function Ticket({
  daysDifference,
  aircraftCode,
  carrierCode,
  flightNumber,
  price,
}: {
  daysDifference: number;
  aircraftCode: string;
  carrierCode: string;
  flightNumber: string;
  price: string;
}) {
  const [travelTypeState] = useRecoilState(typeTravel);
  const [minPriceState] = useRecoilState(MinPrice);

  if (travelTypeState === "oneWay") {
    return (
      <div className={` relative rounded-s-[16px] col-span-4  `} dir="rtl">
        <div
          className={`flex justify-between px-[10px] items-start w-full h-full border border-t-0 border-x-0`}
        >
          {/* الطائرة */}
          <div className={`flex    flex-col gap-[8px] mt-[31px]`}>
            {/* الطائرة  image*/}
            <span>
              <img src="" alt="image-air" />
            </span>
            <div className={`flex justify-start gap-[21px]`}>
              {/* كود الرحلة */}
              <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                {carrierCode}-{flightNumber}
              </span>
              {/* كود الطائرة */}
              <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
                Airbus A{aircraftCode}
              </span>
            </div>
          </div>
          {/* Date */}
          <div className={`grid w-[309px]  grid-cols-3 mt-[14px] `}>
            <div className={`flex flex-col gap-[8px]`}>
              <span className={`text-[#231F20] text-[14px] font-[700]`}>
                CAI
              </span>
              <span className={`text-[#000] text-[20px] font-[700]`}>
                9:00 AM
              </span>
              <span className={`text-[#333] text-[14px] font-[700]`}>
                16 Feb,2024
              </span>
            </div>
            <div
              className={`flex flex-col gap-[8px] justify-center items-center`}
            >
              <span>1h30m</span>
              <span>{iconDirectionSmall}</span>
              <div className={`flex items-center   gap-[2px]`}>
                <span className={`relative top-[2px]`}>{iconDot}</span>
                <span className={`text-[#117C99] text-[13px] font-[700]`}>
                  بدون توقف
                </span>
              </div>
            </div>
            <div className={`flex flex-col gap-[8px] items-end`}>
              <span className={`text-[#231F20] text-[14px] font-[700]`}>
                DHB
              </span>
              <span className={`text-[#000] text-[20px] font-[700]`}>
                11:30 AM
              </span>
              <span className={`text-[#333] text-[14px] font-[700]`}>
                16 Feb,2024
              </span>
            </div>
          </div>
          {/* افضل سعر */}
          <div className={` `}>
            {minPriceState + 500 > +price && (
              <div
                className={`bg-[#B3E0D2] w-[82px] ms-auto h-[38px] rounded-[8px] flex justify-center items-center mt-[14px]`}
              >
                <span className={`text-[#006C4B] text-[13px] font-[700]`}>
                  افضل سعر
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`lg:w-[548px] ll:w-[648px] relative rounded-s-[16px] flex flex-col justify-center items-center flex-1 `}
      dir="rtl"
    >
      <span
        className={`text-[#000] text-[15px] font-[400] absolute bg-[#FFF] border border-[#656565] w-[59px] h-[35px] flex justify-center items-center rounded-[30px]`}
      >
        {daysDifference} يوم
      </span>
      <div
        className={`flex justify-between px-[10px] items-start w-full h-full border border-t-0 border-x-0`}
      >
        {/* الطائرة */}
        <div className={`flex    flex-col gap-[8px] mt-[31px]`}>
          {/* الطائرة  image*/}
          <span>
            <img src="" alt="image-air" />
          </span>
          <div className={`flex justify-start gap-[21px]`}>
            {/* كود الرحلة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              {carrierCode}-{flightNumber}
            </span>
            {/* كود الطائرة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              Airbus A{aircraftCode}
            </span>
          </div>
        </div>
        {/* Date */}
        <div className={`grid w-[309px]  grid-cols-3 mt-[14px] `}>
          <div className={`flex flex-col gap-[8px]`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>CAI</span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              9:00 AM
            </span>
            <span className={`text-[#333] text-[14px] font-[700]`}>
              16 Feb,2024
            </span>
          </div>
          <div
            className={`flex flex-col gap-[8px] justify-center items-center`}
          >
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              1h30m
            </span>
            <span>{iconDirectionSmall}</span>
            <div className={`flex items-center   gap-[2px]`}>
              <span className={`relative top-[2px]`}>{iconDot}</span>
              <span className={`text-[#117C99] text-[13px] font-[700]`}>
                بدون توقف
              </span>
            </div>
          </div>
          <div className={`flex flex-col gap-[8px] items-end`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>DHB</span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              11:30 AM
            </span>
            <span className={`text-[#333] text-[14px] font-[700]`}>
              16 Feb,2024
            </span>
          </div>
        </div>
        {/* افضل سعر */}
        <div className={` `}>
          {minPriceState + 500 > +price && (
            <div
              className={`bg-[#B3E0D2] w-[82px] ms-auto h-[38px] rounded-[8px] flex justify-center items-center mt-[14px]`}
            >
              <span className={`text-[#006C4B] text-[13px] font-[700]`}>
                افضل سعر
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex justify-between px-[10px] items-start w-full h-full border border-t-0 border-x-0`}
      >
        {/* الطائرة */}
        <div className={`flex    flex-col gap-[8px] mt-[31px]`}>
          {/* الطائرة  image*/}
          <span>
            <img src="" alt="image-air" />
          </span>
          <div className={`flex justify-start gap-[21px]`}>
            {/* كود الرحلة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              {carrierCode}-{flightNumber}
            </span>
            {/* كود الطائرة */}
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              Airbus A{aircraftCode}
            </span>
          </div>
        </div>
        {/* Date */}
        <div className={`grid w-[309px]  grid-cols-3 mt-[14px] `}>
          <div className={`flex flex-col gap-[8px]`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>CAI</span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              9:00 AM
            </span>
            <span className={`text-[#333] text-[14px] font-[700]`}>
              16 Feb,2024
            </span>
          </div>
          <div
            className={`flex flex-col gap-[8px] justify-center items-center`}
          >
            <span className={`text-[#4F4F4F] text-[13px] font-[700]`}>
              1h30m
            </span>
            <span>{iconDirectionSmall}</span>
            <div className={`flex items-center   gap-[2px]`}>
              <span className={`relative top-[2px]`}>{iconDot}</span>
              <span className={`text-[#117C99] text-[13px] font-[700]`}>
                بدون توقف
              </span>
            </div>
          </div>
          <div className={`flex flex-col gap-[8px] items-end`}>
            <span className={`text-[#231F20] text-[14px] font-[700]`}>DHB</span>
            <span className={`text-[#000] text-[20px] font-[700]`}>
              11:30 AM
            </span>
            <span className={`text-[#333] text-[14px] font-[700]`}>
              16 Feb,2024
            </span>
          </div>
        </div>
        {/* افضل سعر */}
        <div className="mt-auto mb-[29px]">
          <div
            className={` border-2 border-[#117C99] hover:bg-[#117c99f3] text-[#005A6C] hover:text-[#fff] w-[93px] ms-auto h-[48px] rounded-[16px] flex justify-center items-center `}
          >
            <span className={` text-[16px] font-[700]`}>التفصيل</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
