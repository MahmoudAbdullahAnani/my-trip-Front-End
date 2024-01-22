import { useRecoilState } from "recoil";
import { typeTravel } from "../../../data/RecoilState/FormHandling";
import NavTopMobile from "../../../layout/NavTopMobile";

function TypeTravelComponentMobile() {
  // ذهاب فقط ===> true
  const [typeTravelState, setTypeTravelState] = useRecoilState(typeTravel);

  return (
    <>
      <NavTopMobile />
      <div
        style={{
          borderRadius: "60px",
          border: "1px solid #FFF",
          background: "rgba(134, 216, 247, 0.30)",
          backdropFilter: "blur(5px)",
        }}
        className={`lg:hidden duration-200 z-20 flex justify-between h-[48px] mm:mx-[16px] py-[8px] px-[5px] bg-red-900 gap-[19px] mb-[24px] mt-[45px]`}
      >
        <div
          onClick={() => setTypeTravelState("hyper")}
          className={`${
            typeTravelState === "hyper"
              ? "bg-[#117C99] text-[#FFF] font-[700] whitespace-nowrap"
              : "font-[400] text-[#333] "
          }   flex-1 text-center rounded-[60px] flex items-center justify-center cursor-pointer text-[16px] p-[10px] lg:whitespace-nowrap `}
        >
          <h5>وجهات متعددة</h5>
        </div>

        <div
          onClick={() => setTypeTravelState("roundTrip")}
          className={`  ${
            typeTravelState === "roundTrip"
              ? "bg-[#117C99] text-[#FFF] font-[700] whitespace-nowrap"
              : "font-[400] text-[#333]"
          } flex-1 text-center rounded-[60px] flex items-center justify-center cursor-pointer text-[16px] p-[10px] lg:whitespace-nowrap `}
        >
          <h5>ذهاب وعودة</h5>
        </div>

        <div
          onClick={() => setTypeTravelState("oneWay")}
          className={` ${
            typeTravelState === "oneWay"
              ? "bg-[#117C99] text-[#FFF] font-[700] whitespace-nowrap"
              : "font-[400]  text-[#333]"
          }  flex-1 text-center rounded-[60px] flex items-center justify-center cursor-pointer text-[16px] p-[10px] lg:whitespace-nowrap`}
        >
          <h5>ذهاب فقط</h5>
        </div>
      </div>
    </>
  );
}

export default TypeTravelComponentMobile;
