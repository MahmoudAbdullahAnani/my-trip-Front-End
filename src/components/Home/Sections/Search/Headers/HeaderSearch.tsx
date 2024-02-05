import { useLocation } from "react-router-dom";
import UiFildesDate from "../../../FieldsDate/UiFildesDate";
import HandleFieldsSearch from "../../../HandleData/HandleFieldsSearch";
import BtnSearch from "../../../Systems/BtnSearch";
import HeaderMobile from "./HeaderMobile";

function HeaderSearch() {
  const { pathname } = useLocation();
  return (
    <>
      {/* Header Mobile */}
      <header
        className={`lg:hidden pt-[calc(25px+54px)] pb-[89px] relative bg-d[url('/public/assets/mapHeader.png')]`}
      >
        <HeaderMobile />
      </header>
      {/* Header Desktop */}
      {pathname !== "/airData" && (
        <header
          className={`bg-[#FFF] lg:block hidden pb-[47.5px] pt-[57.5px] relative bg-d[url('/public/assets/mapHeader.png')]`}
        >
          <div
            className={`flex flex-wrap  gap-[24px] justify-center items-center `}
          >
            <div className={`relative top-[14px]`}>
              <BtnSearch />
            </div>
            <UiFildesDate isSearch={true} />
            <HandleFieldsSearch isSearch={true} />
          </div>
          {/* <div className={`absolute w-full h-full top-0`}></div> */}
        </header>
      )}
    </>
  );
}

export default HeaderSearch;
