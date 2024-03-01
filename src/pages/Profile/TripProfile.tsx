import HeaderProfile from "../../components/Profile/HeaderProfile";

import TopHeader from "../../components/Profile/TopHeader";

function TripProfile() {
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
        <div className={`ll:w-[calc(100%-250px)] w-[100%]`}>
          <div className={`w-full max-w-[848px] `}></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default TripProfile;
