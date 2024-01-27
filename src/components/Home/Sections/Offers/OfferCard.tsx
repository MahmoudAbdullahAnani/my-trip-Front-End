// React
import { useState } from "react";
// react-router-dom
import { Link } from "react-router-dom";
// Images
import exampleImage from "./assets/Rectangle 27.png";
// Components Of Data
import {
  iconArrowDown,
  iconArrowLeft,
  iconArrowTop,
  iconDirection,
} from "../../../../assets/icons/home";
import { EGP } from "../../../../Formater/FormatPrice";

interface OfferCardInterface {
  mainImg: string;
  title: string;
  date: string;
  price: number;
  detailDate: {
    from: string;
    to: string;
    timeFrom: string;
    timeTo: string;
    timeTaken: string;
    airPortFrom: string;
    airPortTo: string;
    titleAirPortFrom: string;
    titleAirPortTo: string;
    cityFrom: string;
    cityTo: string;
  };
}
function OfferCard({
  date,
  title,
  // mainImg,
  detailDate,
  price,
}: OfferCardInterface) {
  const [toggleMore, setToggleMore] = useState(false);
  return (
    <>
      <div
        style={
          {
            // boxShadow: "0px 4px 4px 0px",
          }
        }
        className={`bg-[#FFF] p-[16px] rounded-[26px] flex flex-col gap-[17px] relative hover:shadow-lg shadow-[0_35px_60px_-15px_rgba(17, 124, 153, 0.30)]`}
      >
        <div className={`rounded-[16px] `}>
          <img
            src={exampleImage}
            className={`h-full w-full`}
            width={100}
            height={100}
          />
          <span
            className={`text-[#F36E16] text-[14px]  font-normal p-[8px] bg-[#FDEAB4] rounded-[30px] text-center absolute top-[calc(8px+8px+12px)] right-[calc(8px+8px+12px)]`}
          >
            مميز
          </span>
        </div>
        <div className={`flex items-start justify-between`}>
          <h6 className={`text-[#231F20] text-[14px] font-[600]`}>{date}</h6>
          <div className={`flex flex-col `}>
            <span className={`text-[#000] text-[14px] font-[600]`}>
              {title}
            </span>
            {!toggleMore && (
              <span
                className={`text-[#909090] text-[13px] font-[600] lg:hidden block text-end mt-[17px]`}
              >
                {detailDate.from}-{detailDate.to}
              </span>
            )}
          </div>
        </div>
        {!toggleMore && (
          <h5
            className={`text-[#117C99] text-[20px] lg:hidden block font-[700] text-end`}
          >
            {EGP.format(price)}
          </h5>
        )}
        {toggleMore && (
          <div className={`flex gap-[20px] items-center justify-center`}>
            <div className={`flex flex-col items-end justify-center`}>
              <h6 className={`text-[#000] text-[16px] font-[700] `}>
                {detailDate.timeTo}
              </h6>
              <h5 className={`text-[#000] text-[20px] font-[700]`}>
                {detailDate.airPortTo}
              </h5>
              <div
                className={`flex flex-col items-end text-[#4F4F4F] text-[13px] font-[400] text-end`}
              >
                <h6>{detailDate.cityTo}</h6>
                <h6>{detailDate.titleAirPortTo}</h6>
              </div>
            </div>
            <div className={`relative left-[20px]`}>{iconDirection}</div>

            <div className={`flex flex-col items-end justify-center`}>
              <h6 className={`text-[#000] text-[16px] font-[700] `}>
                {detailDate.timeFrom}
              </h6>
              <h5 className={`text-[#000] text-[20px] font-[700]`}>
                {detailDate.airPortFrom}
              </h5>
              <div
                className={`flex flex-col items-end text-[#4F4F4F] text-[13px] font-[400] text-end`}
              >
                <h6>{detailDate.cityFrom}</h6>
                <h6>{detailDate.titleAirPortFrom}</h6>
              </div>
            </div>
          </div>
        )}
        <div
          className={`lg:flex hidden gap-[20px] items-center justify-center`}
        >
          <div className={`flex flex-col items-end justify-center`}>
            <h6 className={`text-[#000] text-[16px] font-[700] `}>
              {detailDate.timeTo}
            </h6>
            <h5 className={`text-[#000] text-[20px] font-[700]`}>
              {detailDate.airPortTo}
            </h5>
            <div
              className={`flex flex-col items-end text-[#4F4F4F] text-[13px] font-[400] text-end`}
            >
              <h6>{detailDate.cityTo}</h6>
              <h6>{detailDate.titleAirPortTo}</h6>
            </div>
          </div>
          <div className={`relative left-[20px]`}>{iconDirection}</div>

          <div className={`flex flex-col items-end justify-center`}>
            <h6 className={`text-[#000] text-[16px] font-[700] `}>
              {detailDate.timeFrom}
            </h6>
            <h5 className={`text-[#000] text-[20px] font-[700]`}>
              {detailDate.airPortFrom}
            </h5>
            <div
              className={`flex flex-col items-end text-[#4F4F4F] text-[13px] font-[400] text-end`}
            >
              <h6>{detailDate.cityFrom}</h6>
              <h6>{detailDate.titleAirPortFrom}</h6>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-${
            toggleMore ? "center gap-[41px]" : "between"
          }`}
        >
          <h5
            className={`text-[#117C99] text-[20px] lg:block hidden font-[700] text-end`}
          >
            {EGP.format(price)}
          </h5>
          {toggleMore ? (
            <h5 className={`text-[#117C99] text-[20px] font-[700] text-end`}>
              {EGP.format(price)}
            </h5>
          ) : (
            <button
              onClick={() => setToggleMore(!toggleMore)}
              className={`text-[#005A6C] hover:text-[#005a6cc0] text-[14px] font-[700] flex lg:hidden items-center justify-center`}
            >
              <span className={`mt-2`}>
                {toggleMore ? iconArrowTop : iconArrowDown}
              </span>
              <span>المزيد</span>
            </button>
          )}
          <Link
            className={`text-[#117C99] rounded-[30px] p-[8px] w-[137px] flex items-center justify-center border border-[#117C99] hover:bg-[#d6eaef6e] gap-[8px]`}
            to={`/`}
          >
            <span>{iconArrowLeft}</span>
            <span>احجز الان</span>
          </Link>
        </div>
        {toggleMore && (
          <button
            onClick={() => setToggleMore(!toggleMore)}
            className={`text-[#005A6C] hover:text-[#005a6cc0] text-[14px] font-[700] flex lg:hidden items-center justify-center`}
          >
            <span className={`mt-2`}>
              {toggleMore ? iconArrowTop : iconArrowDown}
            </span>
            <span>المزيد</span>
          </button>
        )}
      </div>
    </>
  );
}

export default OfferCard;
