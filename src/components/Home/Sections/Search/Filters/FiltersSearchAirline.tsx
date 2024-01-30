import FilterPrice from "./FilterPrice";
import NumberOfStopsAirline from "./NumberOfStopsAirline";

function FiltersSearchAirline() {
  return (
    <div className={` flex flex-col items-end  w-full`}>
      {/* FilterPrice */}
      <FilterPrice />
      <hr
        className={`xl:w-[294px] w-full h-[2px] mt-[30px] mb-[26px] bg-[#656565]`}
      />
      {/* numberOfStops Filter */}
      <NumberOfStopsAirline />
      <hr
        className={`xl:w-[294px] w-full h-[2px] mt-[30px] mb-[26px] bg-[#656565]`}
      />
    </div>
  );
}

export default FiltersSearchAirline;
