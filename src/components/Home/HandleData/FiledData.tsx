import UiFildesDate from "../FieldsDate/UiFildesDate";
import LevelTravel from "../MoreData/LevelTravel";
import MoreData from "../MoreData/MoreData";
import HandleFieldsSearch from "./HandleFieldsSearch";

function FiledData() {
  return (
    <>
      <div
        className={`flex xl:flex-nowrap flex-wrap sm:gap-[24px] gap-[10px] sm:justify-normal justify-center`}
      >
        <HandleFieldsSearch />
        <UiFildesDate />
        <LevelTravel />
      </div>
      <div>
        <MoreData />
      </div>
    </>
  );
}

export default FiledData;
