import { Link } from "react-router-dom";
import { iconHi, iconNotifications, iconUser } from "../assets/icons/home";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";

function NavTopMobile() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  return (
    <div className={`lg:hidden flex justify-between ps-[16px] pe-[20px] `}>
      {/* Icon Notifications */}
      <div className={`rounded-full hover:bg-[#59adca3d] cursor-pointer`}>
        {iconNotifications}
      </div>
      {/* Icon User */}
      <div className={`flex gap-[16px]`}>
        {stateUserData.userName === "" ? (
          <h4 className={`flex gap-[8px] text-[17px] font-[400]`}>
            <span>{iconHi}</span>
            <span>مرحبا بك</span>
          </h4>
        ) : (
          <h4 className={`flex gap-[1px] text-[17px] font-[400]`}>
            <span>{stateUserData.firstName}</span>
            <span>{stateUserData.lastName}</span>
          </h4>
        )}
        {stateUserData.avatar === "" ? (
          <Link className={`rounded-full`} to={`/login`}>
            {iconUser}
          </Link>
        ) : (
          <Link className={`rounded-full`} to={`/login`}>
            {iconUser}
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavTopMobile;
