import { Link } from "react-router-dom";
import { iconHi, iconNotifications, iconUser } from "../assets/icons/home";

function NavTopMobile() {
  return (
    <div
      className={`lg:hidden flex justify-between ps-[16px] pe-[20px] pt-[calc(54px+26px)] z-20 absolute top-0 w-full`}
    >
      {/* Icon Notifications */}
      <div className={`rounded-full hover:bg-[#59adca3d] cursor-pointer`}>
        {iconNotifications}
      </div>
      {/* Icon User */}
      <div className={`flex gap-[16px]`}>
        <h4 className={`flex gap-[8px] text-[17px] font-[400]`}>
          <span>{iconHi}</span>
          <span>مرحبا بك</span>
        </h4>
        <Link  className={`rounded-full`} to={`/login`}>
          {iconUser}
        </Link>
      </div>
    </div>
  );
}

export default NavTopMobile;
