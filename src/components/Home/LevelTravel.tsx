import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState } from "recoil";
import {
  adultsData,
  childrenData,
  studentsoverData,
  youthsData,
} from "../../data/RecoilState/FormSearchData";
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
  //---> studentsover Data
  const [studentsoverDataState, setstudentsoverData] =
    useRecoilState(studentsoverData);
  const incrementStudentsover = () => {
    setstudentsoverData(studentsoverDataState + 1);
  };
  const decrementStudentsover = () => {
    if (studentsoverDataState >= 1) {
      setstudentsoverData(studentsoverDataState - 1);
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
  return (
    <div className={``}>
      <div className={`flex flex-col gap-[6px]`}>
        {/* Input Origin Air */}
        <h4 className={`text-[#000] text-[20px] font-[500] `}>المغادرة من</h4>
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className={`w-[212px] h-[48px] rounded-lg bg-[#FFF]`}
        ></div>
      </div>

      <div>
        <Menu
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
                  onClick={incrementStudentsover}
                >
                  +
                </span>
                <span>{studentsoverDataState}</span>
                <span
                  className={`border rounded-md px-2 ${
                    studentsoverDataState < 1 && "opacity-30"
                  }`}
                  onClick={decrementStudentsover}
                >
                  -
                </span>
              </div>
              <span>
                طالب
                <span className={`text-[12px]`}> اكبر من 18</span>
              </span>
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
                شباب
                <span className={`text-[12px]`}> اكبر من 12-17</span>
              </span>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default LevelTravel;
