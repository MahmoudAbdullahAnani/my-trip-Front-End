import FildesODSearch from "./FildesODSearch";
import IconSwitchData from "./IconSwitchData";

function HandleFieldsSearch() {

  return (
    <div
      className={`flex sm:gap-[0px] gap-[10px] sm:justify-normal justify-center items-center lg:flex-nowrap sm:flex-row flex-col sm:w-fit w-full flex-wrap `}
    >
      <div
        className={`flex flex-col gap-[6.15px] justify-start items-start sm:w-fit w-full`}
      >
        <h4 className={`text-[#000] text-[20px] font-[500]  hidden sm:block`}>
          المغادرة من
        </h4>

        <FildesODSearch typeInput="from" />
      </div>
      <IconSwitchData/>
      <div
        className={`flex flex-col gap-[6.15px] justify-start items-start sm:w-fit w-full`}
      >
        <h4 className={`text-[#000] text-[20px] font-[500] hidden sm:block `}>
          الوجهة{" "}
        </h4>

        <FildesODSearch typeInput="to" />
      </div>
    </div>
  );
}

export default HandleFieldsSearch;
