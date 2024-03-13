import { useRecoilState } from "recoil";
import { typeSystem } from "../../../data/RecoilState/FormHandling";
import UiFildesDate from "../FieldsDate/UiFildesDate";
import LevelTravel from "../MoreData/LevelTravel";
// import MoreData from "../MoreData/MoreData";
import HandleFieldsSearch from "./HandleFieldsSearch";
import HandleFieldSearchHotels from "../../Hotel/Fields/HandleFieldSearchHotels";
import { useTranslation } from "react-i18next";
import LevelTravelHotel from "../../Hotel/Fields/LevelTravelHotel";

function FiledData() {
  const [typeSystemState] = useRecoilState(typeSystem);
  // Lang
  const { t, i18n } = useTranslation();

  return (
    <>
      <div
        className={`flex xl:flex-nowrap flex-wrap sm:gap-[24px] gap-[10px] sm:justify-normal ml:flex-row flex-row-reverse justify-center`}
      >
        {typeSystemState === "air" && <HandleFieldsSearch isSearch={false} />}
        {typeSystemState === "hotel" && (
          <div
            dir={i18n.language !== "ar" ? "rtl" : "ltr"}
            className={`flex flex-col gap-[6.15px] justify-start items-end sm:w-fit w-full`}
          >
            <h4
              className={`text-[#000]  text-[20px] font-[500] hidden sm:block `}
            >
              {t("وجهتك")}
            </h4>
            <HandleFieldSearchHotels />
          </div>
        )}
        {/* {typeSystemState === "car" && <HandleFieldsSearch isSearch={false} />} */}
        {/* Date */}
        <UiFildesDate isSearch={false} />
        {/* MorData */}
        {typeSystemState === "air" && <LevelTravel />}
        {typeSystemState === "hotel" && <LevelTravelHotel />}
      </div>
      <div>{/* <MoreData /> */}</div>
    </>
  );
}

export default FiledData;
