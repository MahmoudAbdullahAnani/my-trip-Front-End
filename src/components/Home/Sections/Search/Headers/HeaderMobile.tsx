import { useRecoilState } from "recoil";

import { Link, useLocation } from "react-router-dom";
import {
  destinationSearch,
  originSearch,
} from "../../../../../data/RecoilState/FormHandling";
import { iconArrowLeftWhite } from "../../../../../assets/icons/home";

import mapHeader from "./../../../../../../public/assets/mapHeader.png";
import headMobile from "./../../../../../../public/assets/headMobile.png";

// عرض اسم المدينة مؤجل

function HeaderMobile() {
  const { pathname } = useLocation();
  const [destinationLocationCode] = useRecoilState(destinationSearch);
  const [originLocationCode] = useRecoilState(originSearch);
  return (
    <>
      {/* <div className={`absolute bottom-0 w-full z-20`}>{iconHeaderSearch}</div> */}
      <div
        className={` flex flex-col gap-[20px] px-[16px] relative z-20 text-[#FFF]`}
      >
        <Link
          to={
            pathname === "/search"
              ? "/"
              : pathname === "/airData"
              ? "/search"
              : pathname === "/airPay"
              ? "/airData"
              : ""
          }
          style={{
            backdropFilter: "blur(5px)",
          }}
          className={`w-[48px] h-[48px] bg-[#58a3b7] duration-150 hover:bg-[#58a3b7c4] flex justify-center items-center rounded-[48px] `}
        >
          {iconArrowLeftWhite}
        </Link>
        <div className={`flex justify-between`}>
          <div className={`flex flex-col items-end gap-[9px]`}>
            {/* <span>دبي , الإمارات</span> */}
            <span className={`text-[20px] font-[700]`}>
              {destinationLocationCode || "DXH"}
            </span>
          </div>
          <div></div>
          <div className={`flex flex-col items-end gap-[9px]`}>
            {/* <span>دبي , الإمارات</span> */}
            <span className={`text-[20px] font-[700]`}>
              {originLocationCode || "DXH"}
            </span>
          </div>
        </div>
      </div>
      <img
        src={mapHeader}
        className={`absolute w-full h-full top-0 object-cover z-10`}
      />
      <img
        src={headMobile}
        className={`absolute w-full h-[50px] bottom-0  z-10`}
      />
    </>
  );
}

export default HeaderMobile;
