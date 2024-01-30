import FilterPrice from "./FilterPrice";
import NumberOfStopsAirline from "./NumberOfStopsAirline";

function FiltersSearchAirline() {
  return (
    <div className={` flex flex-col items-end  w-full`}>
      {/* FilterPrice */}
      <FilterPrice />
      <hr className={`w-[294px] h-[2px] mt-[30px] mb-[26px] bg-[#656565]`} />
      {/* numberOfStops Filter */}
      <NumberOfStopsAirline />
    </div>
  );
}

export default FiltersSearchAirline;
