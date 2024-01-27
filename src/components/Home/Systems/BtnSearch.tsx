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
import { Flip, toast } from "react-toastify";
import { Link } from "react-router-dom";

function BtnSearch() {
  const [locationFrom] = useRecoilState(originSearch);
  const [destinationSearchState] = useRecoilState(destinationSearch);
  const [dateGoState] = useRecoilState(dateGo);
  const [dateReturnState] = useRecoilState(dateReturn);
  const [levelTravelDataState] = useRecoilState(levelTravelData);
  const [childrenDataState] = useRecoilState(childrenData);
  const [youthsDataState] = useRecoilState(youthsData);
  const [adultsDataState] = useRecoilState(adultsData);

  const handleSearchData = () => {

    if (!locationFrom || !destinationSearchState) {
      return toast.warn(" يجب اختيار اماكن الذهاب و العودة ", {
        position: "top-right",
        autoClose: 5075,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }
    if (!dateGoState) {
      return toast.warn(" يجب تاريخ المغادرة علي الاقل", {
        position: "top-right",
        autoClose: 5075,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }
    console.log({
      locationFrom,
      destinationSearchState,
      dateGoState,
      dateReturnState,
      levelTravelDataState,
      childrenDataState,
      youthsDataState,
      adultsDataState,
    });
  };

  return (
    <Link
      onClick={handleSearchData}
      to={`${
        !locationFrom || !destinationSearch || !dateGoState ? "/" : "/search"
      }`}
    >
      <button
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className={`w-[177px] h-[47px] mt-2  rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 px-[68px] mm:text-[14.957px] mm:font-black text-[14px] font-[500] `}
      >
        ابحث
      </button>
    </Link>
  );
}

export default BtnSearch;
