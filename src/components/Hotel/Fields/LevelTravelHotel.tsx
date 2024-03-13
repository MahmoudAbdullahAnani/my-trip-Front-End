import * as React from "react";
import Menu from "@mui/material/Menu";
import { useRecoilState } from "recoil";
import {
  Rateing,
  adultsData,
  childrenData,
  youthsData,
} from "../../../data/RecoilState/FormSearchData";
import {
  iconAd,
  iconAdd,
  iconChelderin,
  iconDec,
} from "../../../assets/icons/home";
import { useTranslation } from "react-i18next";
import { typeSystem } from "../../../data/RecoilState/FormHandling";
import Rating from "@mui/material/Rating";

const iconData = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1715C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1715C5.42143 16.9217 5 17.9391 5 19V21"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20911 16 6.99997C16 4.79083 14.2091 2.99997 12 2.99997C9.79086 2.99997 8 4.79083 8 6.99997C8 9.20911 9.79086 11 12 11Z"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const iconDropDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 8.99997L12 15L18 8.99997"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

function LevelTravelHotel() {
  const [value, setValue] = useRecoilState(Rateing);

  // toggle Data
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Handle Data
  //---> Adults
  const [adultsDataState, setAdultsData] = useRecoilState(adultsData);

  //---> Youths Data
  const [youthsDataState, setYouthsData] = useRecoilState(youthsData);

  //---> Children Data
  const [childrenDataState, setChildrenDataState] =
    useRecoilState(childrenData);

  // Handle increment and decrement data
  function incrementAndDecrementData(
    typeData: string,
    data: string | number,
    typeOration: string
  ): void {
    if (typeOration === "increment") {
      if (typeData === "adults") {
        setAdultsData(+data + 1);
        return;
      } else if (typeData === "youths") {
        setYouthsData(+data + 1);
        return;
      } else if (typeData === "children") {
        setChildrenDataState(+data + 1);
        return;
      } else {
        return;
      }
    } else {
      if (typeData === "adults") {
        if (adultsDataState > 1) {
          setAdultsData(adultsDataState - 1);
        }
        return;
      } else if (typeData === "youths") {
        if (youthsDataState >= 1) {
          setYouthsData(youthsDataState - 1);
        }
        return;
      } else if (typeData === "children") {
        if (childrenDataState >= 1) {
          setChildrenDataState(childrenDataState - 1);
        }
        return;
      } else {
        return;
      }
    }
  }
  const [typeSystemState] = useRecoilState(typeSystem);

  // Lang
  const { t, i18n } = useTranslation();

  return (
    <div className={``}>
      <div className={`flex flex-col gap-[6px]  `}>
        {/* Input Origin Air */}
        <h4
          className={`text-[#000] text-[20px] font-[500] hidden sm:block`}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          {t("عدد الغرف و النزلاء")}
        </h4>
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className={`text-[14px] relative font-medium ${
            anchorEl && "shadow-lg"
          } shadow-[#58a8f752] text-[#117C99] sm:w-[212px] w-[156px] h-[48px] rounded-lg bg-[#FFF] flex justify-start items-center px-[15px] cursor-pointer `}
        >
          {iconData}
          <div
            className={`flex gap-[5px]`}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className={`ms-[13px]`}>
              <span>{adultsDataState} </span>
              <span>{t("بالغ")}</span>
            </div>
          </div>
          <span className={`absolute left-[15px] ${open && "rotate-180"}`}>
            {iconDropDown}
          </span>
        </div>
      </div>

      <div className="bg-red-900 relative">
        {anchorEl && (
          <span
            style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
            className="w-3 h-3 bg-[#FFF]  absolute top-[0px] left-[30%]"
          ></span>
        )}
        <Menu
          className="mt-3 "
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem> */}
          <div className={`w-full mt-5 px-[21px]  flex justify-between  `}>
            <div
              className={` border-2 border-[#909090] flex  px-[14px] py-[10px] w-[257px] h-[44px] rounded-[8px]  justify-between`}
            >
              <button
                className={` text-[#000000] rounded-md px-2 `}
                onClick={() =>
                  incrementAndDecrementData(
                    "adults",
                    adultsDataState,
                    "increment"
                  )
                }
              >
                {iconAdd}
              </button>
              <div className={`flex gap-[27px]`}>
                <div>
                  <div
                    className={`flex text-[#117C99] text-[14px] gap-[2px] font-medium`}
                    dir={i18n.language !== "ar" ? "rtl" : "ltr"}
                  >
                    <span>
                      {typeSystemState === "air"
                        ? t("مسافر")
                        : typeSystemState === "hotel"
                        ? "نازل"
                        : ""}
                    </span>
                    <span dir="" className={``}>
                      {adultsDataState}
                    </span>
                  </div>
                </div>
                <span>{iconAd}</span>
              </div>
              <button
                className={` text-[#000000] rounded-md px-2 ${
                  adultsDataState < 1 && "opacity-30"
                }`}
                onClick={() =>
                  incrementAndDecrementData(
                    "adults",
                    adultsDataState,
                    "decrement"
                  )
                }
              >
                {iconDec}
              </button>
            </div>
            {/* <span className={``}>بالغون</span> */}
          </div>
          {/* </MenuItem> */}
          {/* <MenuItem> */}
          <div className={`w-full mt-5 px-[21px]  flex justify-between  `}>
            <div
              className={` border-2 border-[#909090] flex  px-[14px] py-[10px] w-[257px] h-[44px] rounded-[8px]  justify-between`}
            >
              <button
                className={` text-[#000000] rounded-md px-2 `}
                onClick={() =>
                  incrementAndDecrementData(
                    "youths",
                    youthsDataState,
                    "increment"
                  )
                }
              >
                {iconAdd}
              </button>
              <div className={`flex gap-[27px]`}>
                <div>
                  <div
                    className={`flex text-[#117C99] text-[14px] gap-[2px] font-medium`}
                    dir={i18n.language !== "ar" ? "rtl" : "ltr"}
                  >
                    <span>{t("طفل")}</span>
                    <span dir="" className={``}>
                      {youthsDataState}
                    </span>
                  </div>
                </div>
                <span>{iconChelderin}</span>
              </div>
              <button
                className={`text-[#000000] rounded-md px-2 ${
                  youthsDataState < 1 && "opacity-30"
                }`}
                onClick={() =>
                  incrementAndDecrementData(
                    "youths",
                    youthsDataState,
                    "decrement"
                  )
                }
              >
                {iconDec}
              </button>
            </div>
            {/* <span>
              شباب
              <span className={`text-[12px]`}> اكبر من 12-17</span>
            </span> */}
          </div>
          <div
            className={`w-full mt-5 px-[21px]  flex justify-center items-center  `}
          >
            <div
              className={` border-2 border-[#909090] flex items-center justify-center px-[14px] py-[10px] w-[257px] h-[44px] rounded-[8px]  `}
            >
              <span className={`font-bold`}>{value}</span>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(_event, newValue) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setValue(newValue);
                }}
              />
              <span
                onClick={() => {
                  setValue(0);
                }}
                className={`text-red-800 hover:bg-red-400 cursor-pointer p-1 hover:text-white rounded-lg`}
              >
                {t("حذف")}
              </span>
            </div>
            {/* <span>
              شباب
              <span className={`text-[12px]`}> اكبر من 12-17</span>
            </span> */}
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default LevelTravelHotel;
