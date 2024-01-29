import FilterPrice from "./FilterPrice";

function FiltersSearchAirline() {
  return (
    <div className={` flex flex-col items-end  w-full`}>
      {/* FilterPrice */}
      <FilterPrice />
      <hr className={`w-[294px] h-[2px]  bg-[#656565]`} />
    </div>
  );
}

export default FiltersSearchAirline;
