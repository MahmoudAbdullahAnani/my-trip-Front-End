// import { useRecoilState } from "recoil";
// import { typeSystem } from "../../data/RecoilState/FormHandling";
import { useRecoilState } from "recoil";
import { typeSystem } from "../../../data/RecoilState/FormHandling";
import BtnSearch from "./BtnSearch";
import ControlSystems from "./ControlSystems";
import BtnSearchHotel from "../../Hotel/BtnSearchHotel";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
function FormModule({ children }: Props) {
  const [typeSystemState] = useRecoilState(typeSystem);

  // const [TypeSystemState] = useRecoilState(typeSystem);
  return (
    <div className={`flex flex-col `}>
      <ControlSystems />
      <div
        dir="rtl"
        style={{
          fill: "rgba(182, 231, 251, 0.30)",
          strokeWidth: "1px",
          stroke: "#FFF",
          backdropFilter: "blur(10px)",
        }}
        className={`lg:pr-[24px] 2xl:pr-[106px] lg:pe-[82px] sm:pr-[10px] p-[15px] sm:py-10 ml:py-[24px] py-[24px] flex flex-col sm:gap-5 gap-1 xl:h-[calc(283px-(47px+.5rem))] lg:rounded-t-[0px] rounded-t-[17px] lg:rounded-tl-[25px] bg-[#b6e7fb29]  border border-[#FFF] border-1 border-b-0 lg:border-t-0  `}
      >
        <div
          className={`lg:block hidden w-[calc(100%-165px)] h-[.5px] rounded-l-[100%] bg-[#FFF] absolute bottom-[calc(100%-1px)] left-[20px]`}
        ></div>
        {children}
      </div>
      <div className={`flex relative `}>
        {/* Get Travels*/}
        <div className={`absolute left-[30%] z-[-1]`}>
          <div className={`w-[120%] h-[1px] relative right-4 bg-[#FFF]`}></div>

          {typeSystemState === "air" && <BtnSearch />}
          {typeSystemState === "hotel" && <BtnSearchHotel />}
        </div>
        <div
          style={{
            fill: "rgba(182, 231, 251, 0.30)",
            strokeWidth: "1px",
            stroke: "#FFF",
            backdropFilter: "blur(10px)",
          }}
          className={`rounded-bl-[25px] bg-[#b6e7fb29] border border-[#FFF] border-1 border-t-0 w-[29%] h-[47px] rounded-r-lg absolute left-[0%] top-[100%] pt-[calc(47px+.5rem)] z-[-1]`}
        ></div>
        <div
          style={{
            fill: "rgba(182, 231, 251, 0.30)",
            strokeWidth: "1px",
            stroke: "#FFF",
            backdropFilter: "blur(10px)",
          }}
          className={`rounded-br-[25px] bg-[#b6e7fb29] border border-[#FFF] border-1 border-t-0 w-[calc(99%-(177px+30%))] rounded-l-lg h-[47px]  absolute right-[0] top-[100%] pt-[calc(47px+.5rem)] z-[-1]`}
        ></div>
      </div>
    </div>
  );
}

export default FormModule;
