import { useRecoilState } from "recoil";
import {
  dateGo,
  dateReturn,
  destinationSearch,
  originSearch,
  typeSystem,
  typeTravel,
} from "../../../data/RecoilState/FormHandling";
import {
  adultsData,
  childrenData,
  levelTravelData,
  youthsData,
} from "../../../data/RecoilState/FormSearchData";
import { Flip, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ReSearch } from "../../../data/RecoilState/Search/TypeSystemSearch";
import { LoadingDataSearch } from "../../../data/RecoilState/Search/MainData";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../data/store";

function BtnSearch() {
  const [locationFrom] = useRecoilState(originSearch);
  const [destinationSearchState] = useRecoilState(destinationSearch);
  const [dateGoState] = useRecoilState(dateGo);
  const [dateReturnState] = useRecoilState(dateReturn);
  const [levelTravelDataState] = useRecoilState(levelTravelData);
  const [childrenDataState] = useRecoilState(childrenData);
  const [youthsDataState] = useRecoilState(youthsData);
  const [adultsDataState] = useRecoilState(adultsData);
  const [reSearchState, setReSearch] = useRecoilState(ReSearch);
  const [, setLoading] = useRecoilState(LoadingDataSearch);

  // handle catch data
  // const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [typeSearch] = useRecoilState(typeTravel);
  const [systemSearch] = useRecoilState(typeSystem);

  // roundTrip, oneWay, hyper
  const sendCatchData = async () => {
    const searchData = {
      systemSearch: systemSearch,
      typeSearch: typeSearch,
      fromLocation: locationFrom,
      toLocation: destinationSearchState,
      fromDate: dateGoState,
      toDate: typeSearch !== "oneWay" ? dateReturnState : "",
      numberAdults: adultsDataState,
      numberChild: childrenDataState,
      numberInfant: youthsDataState,
      typeClass: levelTravelDataState,
    };

    const sessionId = localStorage.getItem("sessionId");
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/catch-data/search/${sessionId}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/catch-data/search/${sessionId}`,
        {
          search: { ...searchData },
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
    return true;
  };

  const handleSearchData = async () => {
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

    setReSearch(!reSearchState);
    setLoading(true);
    // console.log({
    //   locationFrom,
    //   destinationSearchState,
    //   dateGoState,
    //   dateReturnState,
    //   levelTravelDataState,
    //   childrenDataState,
    //   youthsDataState,
    //   adultsDataState,
    // });
    await sendCatchData();
  };

  // Lang
  const { t } = useTranslation();

  return (
    <Link
      onClick={handleSearchData}
      to={`${
        !locationFrom || !destinationSearch || !dateGoState ? "/" : "/search"
      }`}
      // to={"/"}
    >
      <button
        name="search"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className={`w-[177px] h-[47px] mt-2  rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 px-[68px] mm:text-[14.957px] mm:font-black text-[14px] font-[500] `}
      >
        {t("ابحث")}
      </button>
    </Link>
  );
}

export default BtnSearch;
