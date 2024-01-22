import FildesODSearch from "./FildesODSearch";
import { switchLocation } from "./../../../assets/icons/home";
import { useRecoilState } from "recoil";
import {
  destinationSearch,
  fromSwitchData,
  originSearch,
  toSwitchData,
} from "../../../data/RecoilState/FormHandling";
import { useState } from "react";
function HandleFieldsSearch() {
  // State Data
  const [originSearchState, setOriginSearchState] =
    useRecoilState(originSearch);
  const [destinationSearchState, setDestinationSearchState] =
    useRecoilState(destinationSearch);
  // View
  const [fromSwitchDataState, setFromSwitchDataState] =
    useRecoilState(fromSwitchData);
  const [toSwitchDataState, setToSwitchDataState] =
    useRecoilState(toSwitchData);

  const [animation, setAnimation] = useState("rotate-180");
  function handleSwitchData() {
    setAnimation(animation === "rotate-0" ? "rotate-180" : "rotate-0");
    // Switch Data
    setOriginSearchState(destinationSearchState);
    setDestinationSearchState(originSearchState);
    // Switch View
    setFromSwitchDataState(toSwitchDataState);
    setToSwitchDataState(fromSwitchDataState);
  }
  return (
    <div
      className={`flex sm:gap-[0px] gap-[10px] sm:justify-normal justify-center items-center lg:flex-nowrap flex-wrap`}
    >
      <div className={`flex flex-col gap-[6.15px] justify-start items-start`}>
        <h4 className={`text-[#000] text-[20px] font-[500] `}>المغادرة من</h4>

        <FildesODSearch typeInput="from" />
      </div>
      <span
        onClick={handleSwitchData}
        className={`relative top-[calc(38px/2)] cursor-pointer duration-300 ${animation}`}
      >
        {switchLocation}
      </span>
      <div className={`flex flex-col gap-[6.15px] justify-start items-start`}>
        <h4 className={`text-[#000] text-[20px] font-[500] `}>الوجهة </h4>

        <FildesODSearch typeInput="to" />
      </div>
    </div>
  );
}

export default HandleFieldsSearch;
