import { useRecoilState } from "recoil";
import { typeTravel } from "../../../data/RecoilState/FormHandling";

function TypeTravelComponentMobile() {
  // ذهاب فقط ===> true
  const [typeTravelState, setTypeTravelState] = useRecoilState(typeTravel);

  return (
    <div
      className={`lg:hidden duration-200 z-20 rounded-2xl flex justify-between mx-5 h-[50px] bg-green-500 mb-3`}
    >
      <div
        onClick={() => setTypeTravelState("hyper")}
        className={`${
          typeTravelState === "hyper" && "bg-red-900"
        }   flex-1 text-center rounded-2xl flex items-center justify-center cursor-pointer`}
      >
        <h5>وجهات متعددة</h5>
      </div>
      <div
        onClick={() => setTypeTravelState("oneWay")}
        className={`${
          typeTravelState === "oneWay" && "bg-red-900"
        }  flex-1 text-center rounded-2xl flex items-center justify-center cursor-pointer`}
      >
        <h5>ذهاب فقط</h5>
      </div>

      <div
        onClick={() => setTypeTravelState("roundTrip")}
        className={` ${
          typeTravelState === "roundTrip" && "bg-red-900"
        } flex-1 text-center rounded-2xl flex items-center justify-center cursor-pointer`}
      >
        <h5>ذهاب وعودة</h5>
      </div>
    </div>
  );
}

export default TypeTravelComponentMobile;
