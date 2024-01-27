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
        style={{
          boxShadow: "0px 4px 4px 0px rgba(17, 124, 153, 0.30)",
        }}
        className={`bg-[#FFF] p-[16px] rounded-[26px] flex flex-col gap-[17px] relative`}
      >
        <div className={`rounded-[16px] `}>
          <img
            src={exampleImage}
            className={`h-full w-full`}
            width={100}
            height={100}
          />
          <span
            className={`text-[#F36E16] text-[14px] font-normal p-[8px] bg-[#FDEAB4] rounded-[30px] text-center absolute top-[calc(8px+16px)] right-[calc(8px+16px)]`}
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
            {price} EGP
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
            {price} EGP
          </h5>
          {toggleMore ? (
            <h5 className={`text-[#117C99] text-[20px] font-[700] text-end`}>
              {price} EGP
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
            className={`text-[#117C99] rounded-[16px] p-[8px] w-[137px] flex items-center justify-center border border-[#117C99] hover:bg-[#d6eaef6e] gap-[8px]`}
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

// Maha
/* 
      <div className="container mx-auto px-4">
        <div className="flex mt-3 relative">
          <div className="absolute left-[272px] top-[10px] bg-orange-200 text-orange-400 w-[45px] h-[33px] rounded-[15px] flex justify-center items-center pb-[5px]">
            مميز
          </div>

          <img src={mainImg} alt="" />
        </div>

        <div className="flex font-medium my-3">
          <p className="mr-[125px]">{date}</p>
          <p>{title}</p>
        </div>

        <p className="flex justify-end opacity-50 font-medium">
          {detailDate.from}-{detailDate.to}
        </p>

        <p className="flex justify-end font-bold text-cyan-600 my-3">
          {price}EGP
        </p>

        <div className="flex justify-between font-medium my-3">
          <div className="flex justify-between font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#117C99"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-cyan-600 font-bold">المزيد</p>
          </div>

          <div className="flex justify-between text-cyan-600 w-[125px] h-[50px] rounded-[30px] border-solid border-cyan-600 border-[1px] font-bold px-[17px] items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M15.5 6L9.5 12L15.5 18"
                stroke="#117C99"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <a href="/">احجز الان</a>
          </div>
        </div>
      </div>

*/
