import { useRecoilState } from "recoil";
import {
  Rateing,
  adultsData,
  childrenData,
} from "../../data/RecoilState/FormSearchData";
import {
  dateGo,
  dateReturn,
  originSearch,
} from "../../data/RecoilState/FormHandling";

function SearchHotels() {
  const [locationFrom] = useRecoilState(originSearch);
  const [dateGoState] = useRecoilState(dateGo);
  const [dateReturnState] = useRecoilState(dateReturn);
  const [childrenDataState] = useRecoilState(childrenData);
  const [adultsDataState] = useRecoilState(adultsData);
  const [RateingState] = useRecoilState(Rateing);
  console.log({
    locationFrom,
    dateGoState,
    dateReturnState,
    childrenDataState,
    adultsDataState,
    RateingState,
  });

  return <div></div>;
}

export default SearchHotels;
