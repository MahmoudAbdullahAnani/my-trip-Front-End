import { Link } from "react-router-dom";
import { iconShiftStep } from "../../../../../assets/icons/home";

function HandleStep({
  icon,
  title,
  typeStep,
  linkEdit,
  link,
}: {
  title: string;
  link: string;
  linkEdit: boolean;
  typeStep: string;
  icon: JSX.Element;
}) {
  return (
    <>
      <div
        className={`flex relative ${
          !linkEdit && "bottom-3"
        } justify-center items-center gap-[7px]`}
      >
        <div
          className={`flex flex-col gap-[9px] justify-center items-end p-[10px]`}
        >
          <div className={`flex items-center gap-[20px] justify-center`}>
            {typeStep !== "3" && <span>{iconShiftStep}</span>}
            <span>{icon}</span>
          </div>
          <div className={`flex flex-col relative left-2 items-center`}>
            <span className={`text-[#117C99]  text-[14px] font-semibold `}>
              {title}
            </span>
            {linkEdit && (
              <Link
                className={`text-[#1D8FB2] text-[15px] font-medium hover:text[#1d8fb27b]`}
                to={link}
              >
                تغيير
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HandleStep;
