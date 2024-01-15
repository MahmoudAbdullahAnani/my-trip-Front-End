import { useRecoilState } from "recoil";
// import HandleForm from "../HandleForm";
import { useState } from "react";
import { typeTravel } from "../../data/RecoilState/FormHandling";
import FieldSearchAirs from "../FieldSearchAirs";
import HandleFieldsData from "../HandleFieldsData";
import LevelTravel from "./LevelTravel";
import MoreData from "./MoreData";
import ControlSystems from "./ControlSystems";
// import TypeTravelComponent from "../TypeTravelComponent";

function HeroSection() {
  const [, setTypeTravelRecoilState] = useRecoilState(typeTravel);
  const [typeTravelState, setTypeTravel] = useState("roundTrip");

  return (
    <div className={`flex flex-col`}>
      <ControlSystems />
      <div
        dir="rtl"
        style={{
          fill: "rgba(182, 231, 251, 0.30)",
          strokeWidth: "1px",
          stroke: "#FFF",
          backdropFilter: "blur(10px)",
        }}
        className={`pr-[106px] py-10 flex flex-col gap-5 h-[calc(283px-(47px+.5rem))] w-[calc(100vw-210px)] `}
      >
        <div>
          <form className={`flex justify-between w-[30%]`}>
            <div className={`flex gap-[12px]`}>
              <input
                onChange={() => {
                  setTypeTravel("roundTrip");
                  setTypeTravelRecoilState(false);
                }}
                id="roundTrip"
                name="TypeTravel"
                type="radio"
                className={`cursor-pointer`}
                checked={typeTravelState === "roundTrip" ? true : false}
              />
              <label
                htmlFor="roundTrip"
                className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer "
              >
                ذهاب وعودة
              </label>
            </div>
            <div className={`flex gap-[12px]`}>
              <input
                onChange={() => {
                  setTypeTravel("oneWay");
                  setTypeTravelRecoilState(true);
                }}
                id="oneWay"
                name="TypeTravel"
                type="radio"
                className={`cursor-pointer`}
                checked={typeTravelState === "oneWay" ? true : false}
              />
              <label
                htmlFor="oneWay"
                className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer"
              >
                ذهاب فقط
              </label>
            </div>
            <div className={`flex gap-[12px]`}>
              <input
                onChange={() => setTypeTravel("radio-1")}
                id="radio-1"
                name="TypeTravel"
                type="radio"
                className={`cursor-pointer`}
                checked={typeTravelState === "radio-1" ? true : false}
              />
              <label
                htmlFor="radio-1"
                className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer"
              >
                وجهات متعددة
              </label>
            </div>
          </form>
        </div>
        {/* Inputs */}
        {/* <TypeTravelComponent /> */}
        <div className={`flex`}>
          <FieldSearchAirs />
          <HandleFieldsData />
          <LevelTravel />
        </div>
        <div>
          <MoreData />
        </div>
      </div>
      <div className={`flex relative `}>
        {/* Get Travels*/}
        <div className={`absolute left-[30%] pt-2 z-[-1]`}>
          <button
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className={`w-[177px] h-[47px] rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 px-[68px] text-[14.957px] font-black `}
            onClick={() => {}}
          >
            ابحث
          </button>
        </div>
        <div
          style={{
            fill: "rgba(182, 231, 251, 0.30)",
            strokeWidth: "1px",
            stroke: "#FFF",
            backdropFilter: "blur(10px)",
          }}
          className={`w-[29%] h-[47px] rounded-r-lg absolute left-[0%] top-[100%] pt-[calc(47px+.5rem)] z-[-1]`}
        ></div>
        <div
          style={{
            fill: "rgba(182, 231, 251, 0.30)",
            strokeWidth: "1px",
            stroke: "#FFF",
            backdropFilter: "blur(10px)",
          }}
          className={`w-[calc(99%-(177px+30%))] rounded-l-lg h-[47px]  absolute right-[0] top-[100%] pt-[calc(47px+.5rem)] z-[-1]`}
        ></div>
      </div>
    </div>
  );
}

export default HeroSection;
