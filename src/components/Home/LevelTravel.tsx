import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState } from "recoil";
import {
  adultsData,
  childrenData,
  levelTravelData,
  youthsData,
} from "../../data/RecoilState/FormSearchData";
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20911 16 6.99997C16 4.79083 14.2091 2.99997 12 2.99997C9.79086 2.99997 8 4.79083 8 6.99997C8 9.20911 9.79086 11 12 11Z"
      stroke="#333333"
      stroke-width="2"
      stroke-linecap="round"
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

function handleTranslationLevelTravelData(data: string): string {
  const result =
    data === "economy"
      ? "اقتصادية"
      : data === "tourism"
      ? "سياحية"
      : "رجال اعمال";
  return result;
}
function LevelTravel() {
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
  const incrementAdults = () => {
    setAdultsData(adultsDataState + 1);
  };
  const decrementAdults = () => {
    if (adultsDataState >= 1) {
      setAdultsData(adultsDataState - 1);
    }
  };

  //---> Youths Data
  const [youthsDataState, setyouthsData] = useRecoilState(youthsData);
  const incrementYouthsDataState = () => {
    setyouthsData(youthsDataState + 1);
  };
  const decrementYouthsDataState = () => {
    if (youthsDataState >= 1) {
      setyouthsData(youthsDataState - 1);
    }
  };
  //---> Children Data
  const [childrenDataState, setchildrenDataState] =
    useRecoilState(childrenData);
  const incrementChildrenDataState = () => {
    setchildrenDataState(childrenDataState + 1);
  };
  const decrementChildrenDataState = () => {
    if (childrenDataState >= 1) {
      setchildrenDataState(childrenDataState - 1);
    }
  };

  //---> Level Travel Data
  const [levelTravelDataState, setLevelTravelData] =
    useRecoilState(levelTravelData);
  function handleChangeLevelTravelData(e: { target: { value: string } }) {
    setLevelTravelData(e.target.value);
  }
  return (
    <div className={``}>
      <div className={`flex flex-col gap-[6px]`}>
        {/* Input Origin Air */}
        <h4 className={`text-[#000] text-[20px] font-[500] `}>
          المسافرين & الدرجة
        </h4>
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className={`text-[14px] relative font-medium text-[#117C99]  w-[212px] h-[48px] rounded-lg bg-[#FFF] flex justify-start items-center px-[15px] cursor-pointer `}
        >
          {iconData}
          <div className={`flex gap-[5px]`}>
            <div className={`ms-[13px]`}>
              <span>{adultsDataState} </span>
              <span>بالغ</span>
            </div>
            {/* {youthsDataState > 0 && (
              <>
                &
                <div className={``}>
                  <span>{youthsDataState}</span>
                  <span>شاب</span>
                </div>
              </>
            )}
            {childrenDataState > 0 && (
              <>
                &
                <div className={``}>
                  <span>{childrenDataState}</span>
                  <span>رضيع</span>
                </div>
              </>
            )} */}
            {levelTravelDataState !== "" && (
              <>
                &
                <div className={``}>
                  <span>
                    {handleTranslationLevelTravelData(levelTravelDataState)}
                  </span>
                </div>
              </>
            )}
          </div>
          <span className={`absolute left-[15px]`}>{iconDropDown}</span>
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
          <MenuItem>
            <div className={`w-[179px] mt-5 flex justify-between `}>
              <div className={`flex gap-2`}>
                <span
                  className={`border rounded-md px-2 `}
                  onClick={incrementAdults}
                >
                  +
                </span>
                <span>{adultsDataState}</span>
                <span
                  className={`border rounded-md px-2 ${
                    adultsDataState < 1 && "opacity-30"
                  }`}
                  onClick={decrementAdults}
                >
                  -
                </span>
              </div>
              <span className={``}>بالغون</span>
            </div>
          </MenuItem>
          <MenuItem>
            <div className={`w-[200px] mt-5 flex justify-between `}>
              <div className={`flex gap-2`}>
                <span
                  className={`border rounded-md px-2 `}
                  onClick={incrementYouthsDataState}
                >
                  +
                </span>
                <span>{youthsDataState}</span>
                <span
                  className={`border rounded-md px-2 ${
                    youthsDataState < 1 && "opacity-30"
                  }`}
                  onClick={decrementYouthsDataState}
                >
                  -
                </span>
              </div>
              <span>
                شباب
                <span className={`text-[12px]`}> اكبر من 12-17</span>
              </span>
            </div>
          </MenuItem>
          <MenuItem>
            <div className={`w-[200px] mt-5 flex justify-between `}>
              <div className={`flex gap-2`}>
                <span
                  className={`border rounded-md px-2 `}
                  onClick={incrementChildrenDataState}
                >
                  +
                </span>
                <span>{childrenDataState}</span>
                <span
                  className={`border rounded-md px-2 ${
                    childrenDataState < 1 && "opacity-30"
                  }`}
                  onClick={decrementChildrenDataState}
                >
                  -
                </span>
              </div>
              <span>
                رضيع
                <span className={`text-[12px]`}> اكبر من 12-17</span>
              </span>
            </div>
          </MenuItem>
          <hr className={`my-2 h-1`} />
          <div className={`flex items-center justify-between mx-4`}>
            <select
              className={`p-2 rounded-md border`}
              dir="rtl"
              onChange={handleChangeLevelTravelData}
              name="levelTravel"
              id="levelTravel"
            >
              <option value="economy">اقتصادية</option>
              <option value="tourism">سياحية</option>
              <option value="business">رجال اعمال</option>
            </select>
            <label htmlFor="levelTravel">الدرجة</label>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default LevelTravel;
