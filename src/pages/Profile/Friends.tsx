import ContainerFriends from "../../components/Profile/ContainerFriends";
import ContainerPendingFriends from "../../components/Profile/ContainerPendingFriends";
import HeaderProfile from "../../components/Profile/HeaderProfile";
import SearchUserFriend from "../../components/Profile/SearchUserFriend";

import TopHeader from "../../components/Profile/TopHeader";

function Friends() {
  return (
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px]`}
      dir="rtl"
    >
      <TopHeader />
      <div className={`flex flex-wrap gap-[24px] items-start justify-start`}>
        {/* side bar */}
        <HeaderProfile />
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
