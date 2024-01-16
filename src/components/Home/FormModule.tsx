import ControlSystems from "./ControlSystems";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
function FormModule({ children }: Props) {
  return (
    <div className={`flex flex-col mx-5`}>
      <ControlSystems />
      <div
        dir="rtl"
        style={{
          fill: "rgba(182, 231, 251, 0.30)",
          strokeWidth: "1px",
          stroke: "#FFF",
          backdropFilter: "blur(10px)",
        }}
        className={`lg:pr-[106px] lg:pe-[82px] pr-[10px] sm:py-10 py-1 flex flex-col sm:gap-5 gap-1 xl:h-[calc(283px-(47px+.5rem))] sm:rounded-t-[0px] rounded-t-[25px] sm:rounded-tl-[25px]  border border-[#FFF] border-1 border-b-0  `}
      >
        {children}
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
          className={`rounded-bl-[25px] border border-[#FFF] border-1 border-t-0 w-[29%] h-[47px] rounded-r-lg absolute left-[0%] top-[100%] pt-[calc(47px+.5rem)] z-[-1]`}
        ></div>
        <div
          style={{
            fill: "rgba(182, 231, 251, 0.30)",
            strokeWidth: "1px",
            stroke: "#FFF",
            backdropFilter: "blur(10px)",
          }}
          className={`rounded-br-[25px] border border-[#FFF] border-1 border-t-0 w-[calc(99%-(177px+30%))] rounded-l-lg h-[47px]  absolute right-[0] top-[100%] pt-[calc(47px+.5rem)] z-[-1]`}
        ></div>
      </div>
    </div>
  );
}

export default FormModule;