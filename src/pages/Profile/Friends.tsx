import { iconSignout } from "../../assets/icons/home";
import ContainerFriends from "../../components/Profile/ContainerFriends";
import ContainerPendingFriends from "../../components/Profile/ContainerPendingFriends";
import ControllerProfile from "../../components/Profile/ControllerProfile";
import SearchUserFriend from "../../components/Profile/SearchUserFriend";
import DialogComponent from "../../components/ResetPassword/OAuthNavberDesktop/DialogComponent";

function Friends() {
  return (
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px]`}
      dir="rtl"
    >
      <h1 className={`text-[32px] font-bold text-[#000]`}>إعدادات المستخدم</h1>
      <div className={`flex flex-wrap gap-[24px] items-start justify-start`}>
        {/* side bar */}
        <div
          className={` ll:block hidden ll:w-[188px] w-[0px] h-[359px] overflow-hidden rounded-[16px]  bg-[#FFFFFF] relative`}
          style={{
            boxShadow: "0 4px 4px #005a6c4d",
          }}
        >
          <ControllerProfile />

          <DialogComponent
            isMobile={false}
            iconOut={iconSignout}
            stylesBtn={`absolute flex gap-[8px] items-center justify-center bottom-[0px]  right-[0px] w-[100%] bg-[#FCDAD1] text-[#CD1E3F] text-center py-[8px] rounded-[0px_0px_16px_16px]`}
          />
        </div>
        {/* content */}
        <div
          className={`ll:w-[calc(100%-250px)] w-[100%] flex flex-col gap-[20px]`}
        >
          <div className={`w-full max-w-[848px] `}>
            <SearchUserFriend />
          </div>
          <div>
            <div>
              <h2 className="text-[32px] font-bold text-[#000] mb-[24px]">
                الاصدقاء
              </h2>
              <ContainerFriends />
            </div>
            <div className="mt-[24px]">
              <h2 className="text-[32px] font-bold text-[#000] mb-[24px]">
                طلبات الصداقة
              </h2>
              <ContainerPendingFriends />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;