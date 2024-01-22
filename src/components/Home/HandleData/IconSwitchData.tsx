import {
  switchLocation,
  switchLocationMobile,
} from "./../../../assets/icons/home";
import { useRecoilState } from "recoil";
import {
  destinationSearch,
  fromSwitchData,
  originSearch,
  toSwitchData,
} from "../../../data/RecoilState/FormHandling";
import { useState } from "react";
function IconSwitchData() {
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
    <>
      <span
        onClick={handleSwitchData}
        className={`relative top-[calc(38px/2)] cursor-pointer duration-300 hidden sm:block ${animation}`}
      >
        {switchLocation}
      </span>
      <span
        onClick={handleSwitchData}
        className={`absolute left-[45px] z-10 cursor-pointer duration-300 sm:hidden block ${animation}`}
      >
        {switchLocationMobile}
      </span>
    </>
  );
}

export default IconSwitchData;
