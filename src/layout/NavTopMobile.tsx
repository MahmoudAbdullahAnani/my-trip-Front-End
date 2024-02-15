import { Link } from "react-router-dom";
import { iconHi, iconNotifications, iconUser } from "../assets/icons/home";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";

// Component
import NotificationComponent from "../components/Home/Systems/Notification/NotificationComponent";
// import { useRecoilState } from "recoil";
import { allNotifications } from "../data/RecoilState/Notifications/NotificationsData";
import { useEffect } from "react";
import { openLoginPageState } from "../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
function NavTopMobile() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);

  // const [allNotificationsState] = useRecoilState(allNotifications);
  // console.log("allNotificationsState===> ", allNotificationsState);
  // console.log("publicNotifications===> ", publicNotifications);
  useEffect(() => {}, [allNotifications]);

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const handleOpenPage = () => setOpenPage(true);
  return (
    <div className={`lg:hidden flex justify-between  mt-[calc(25px+54px)]`}>
      {/* Icon Notifications */}
      {stateUserData._id !== "" ? (
        <div
          onClick={handleOpenPage}
          className={`rounded-full hover:bg-[#59adca3d] cursor-pointer `}
        >
          {iconNotifications}
        </div>
      ) : (
        <NotificationComponent />
      )}
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
