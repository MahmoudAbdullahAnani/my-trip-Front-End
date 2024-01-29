import { iconFFilters } from "../../../../../assets/icons/home";

function FiltersBtn() {
  return (
    <div
      className={`text-[#000] text-[24px] font-[700] flex gap-[0px] justify-center items-center bg-[#FFF] p-[10px] rounded-[16px] h-[48px] w-[188px]`}
    >
      <span>تصفية</span>
      <span>{iconFFilters}</span>
    </div>
  );
}

export default FiltersBtn;
