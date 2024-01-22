import { useRecoilState } from "recoil";
import {
  dateGo,
  dateReturn,
  destinationSearch,
  originSearch,
} from "../../../data/RecoilState/FormHandling";
import {
  adultsData,
  childrenData,
  levelTravelData,
  youthsData,
} from "../../../data/RecoilState/FormSearchData";

function BtnSearch() {
  const [locationFrom] = useRecoilState(originSearch);
  const [destinationSearchState] = useRecoilState(destinationSearch);
  const [dateGoState] = useRecoilState(dateGo);
  const [dateReturnState] = useRecoilState(dateReturn);
  const [levelTravelDataState] = useRecoilState(levelTravelData);
  const [childrenDataState] = useRecoilState(childrenData);
  const [youthsDataState] = useRecoilState(youthsData);
  const [adultsDataState] = useRecoilState(adultsData);

  return (
    <button
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      className={`w-[177px] h-[47px] mt-2  rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 px-[68px] text-[14.957px] font-black `}
      onClick={() =>
        console.log({
          locationFrom,
          destinationSearchState,
          dateGoState,
          dateReturnState,
          levelTravelDataState,
          childrenDataState,
          youthsDataState,
          adultsDataState,
        })
      }
    >
      ابحث
    </button>
  );
}

export default BtnSearch;
