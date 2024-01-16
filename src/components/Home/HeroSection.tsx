import { useRecoilState } from "recoil";
// import HandleForm from "../HandleForm";
import { useState } from "react";
import { typeSystem, typeTravel } from "../../data/RecoilState/FormHandling";
import FieldSearchAirs from "../FieldSearchAirs";
import HandleFieldsData from "../HandleFieldsData";
import LevelTravel from "./LevelTravel";
import MoreData from "./MoreData";
import FormModule from "./FormModule";
// import TypeTravelComponent from "../TypeTravelComponent";

function HeroSection() {
  const [, setTypeTravelRecoilState] = useRecoilState(typeTravel);
  const [typeSystemState] = useRecoilState(typeSystem);
  const [typeTravelState, setTypeTravel] = useState("roundTrip");

  if (typeSystemState === "car") {
    return <FormModule>cart</FormModule>;
  }
  if (typeSystemState === "hotel") {
    return <FormModule>Hotels</FormModule>;
  }
  return (
    <FormModule>
      <div>
        <form
          className={`flex justify-start gap-[26px] lg:flex-nowrap flex-wrap`}
        >
          <div className={`flex gap-[12px] `}>
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
              className={`radio-label text-[14px] font-[400] text-[#000] cursor-pointer whitespace-nowrap`}
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
              className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer whitespace-nowrap"
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
              className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer whitespace-nowrap"
            >
              وجهات متعددة
            </label>
          </div>
        </form>
      </div>
      {/* Inputs */}
      {/* <TypeTravelComponent /> */}
      <div className={`flex xl:flex-nowrap flex-wrap gap-[24px] `}>
        <FieldSearchAirs />
        <HandleFieldsData />
        <LevelTravel />
      </div>
      <div>
        <MoreData />
      </div>
    </FormModule>
  );
}

export default HeroSection;
