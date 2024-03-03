import { useRecoilState } from "recoil";
import { typeTravel } from "../../../data/RecoilState/FormHandling";
import { useTranslation } from "react-i18next";

function TypeTravelComponent() {
  const [typeTravelState, setTypeTravelRecoilState] =
    useRecoilState(typeTravel);
  // const [typeTravelState, setTypeTravel] = useState("roundTrip");

  // Lang
  const { t } = useTranslation();

  return (
    <>
      <div className="lg:block hidden">
        <form
          className={`flex justify-start lg:gap-[26px] gap-[10px] lg:flex-nowrap flex-wrap`}
        >
          <div className={`flex gap-[12px] `}>
            <input
              onChange={() => {
                setTypeTravelRecoilState("roundTrip");
              }}
              id="roundTrip"
              name="TypeTravel"
              type="radio"
              className={`cursor-pointer`}
              checked={typeTravelState === "roundTrip"}
            />
            <label
              htmlFor="roundTrip"
              className={`radio-label text-[14px] font-[400] text-[#000] cursor-pointer whitespace-nowrap`}
            >
              {t("ذهاب وعودة")}
            </label>
          </div>
          <div className={`flex gap-[12px]`}>
            <input
              onChange={() => {
                setTypeTravelRecoilState("oneWay");
              }}
              id="oneWay"
              name="TypeTravel"
              type="radio"
              className={`cursor-pointer`}
              checked={typeTravelState === "oneWay"}
            />
            <label
              htmlFor="oneWay"
              className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer whitespace-nowrap"
            >
              {t("ذهاب فقط")}
            </label>
          </div>
          <div className={`flex gap-[12px]`}>
            <input
              onChange={() => setTypeTravelRecoilState("hyper")}
              id="hyper"
              name="TypeTravel"
              type="radio"
              className={`cursor-pointer`}
              checked={typeTravelState === "hyper"}
            />
            <label
              htmlFor="hyper"
              className="radio-label text-[14px] font-[400] text-[#000] cursor-pointer whitespace-nowrap"
            >
              {t("وجهات متعددة")}
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default TypeTravelComponent;
