import Slider from "@mui/material/Slider";
import { EGP } from "../../../../../Formater/FormatPrice";
import {
  MainData,
  MaxPrice,
  MinPrice,
  PriceFilter,
  TripDataFilters,
} from "../../../../../data/RecoilState/Search/MainData";
import { useRecoilState } from "recoil";

function FilterPrice() {
  const [minPriceState] = useRecoilState(MinPrice);
  const [maxPriceState] = useRecoilState(MaxPrice);
  const [priceFilterState, setPriceFilterState] = useRecoilState(PriceFilter);
  const [mainDataState, ] = useRecoilState(MainData);
  const [, setTripDataFilters] =
    useRecoilState(TripDataFilters);

  // const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const newValueArray = newValue as number[];
    // set Date and tickets
    const ticketsFilter = mainDataState.filter(
      (ticket: { price: { total: string } }) =>
        +ticket.price.total >= newValueArray[0] &&
        +ticket.price.total <= newValueArray[1]
    );
    setTripDataFilters(ticketsFilter);
    // setUi
    setPriceFilterState({
      min: newValueArray[0],
      max: newValueArray[1] as number,
    });
  };
  return (
    <div className={`flex flex-col gap-[23px] w-[207px]`}>
      <h2 className={`text-[#000] text-[24px] font-[700] text-end`}>السعر</h2>
      <div className={`w-full flex flex-col gap-[8px]`}>
        <div
          className={`flex justify-between text-[#000] text-[16px] font-[700]`}
        >
          <span>{EGP.format(priceFilterState.min)}</span>
          <span>{EGP.format(priceFilterState.max)}</span>
        </div>
        <div>
          <Slider
            getAriaLabel={() => "Temperature range"}
            min={minPriceState}
            max={maxPriceState}
            valueLabelDisplay="off"
            onChange={handleChange}
            value={[priceFilterState.min, priceFilterState.max]}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
