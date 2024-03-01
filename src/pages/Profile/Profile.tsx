import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserInformation from "../../components/Profile/UserInformation";
import UpdateInformation from "../../components/Profile/UpdateInformation";
import HeaderProfile from "../../components/Profile/HeaderProfile";

import TopHeader from "../../components/Profile/TopHeader";

function Profile() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  useEffect(() => {
    if (stateUserData._id === "") {
      return navigator("/");
    }
  }, []);
  return (
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px]`}
      dir="rtl"
    >
      <TopHeader/>
      <div className={`flex flex-wrap gap-[24px] items-start justify-start`}>
        {/* side bar */}
        <HeaderProfile />
        {/* content */}
        <div className={`ll:w-[calc(100%-250px)] w-[100%]`}>
          <div className={`w-full max-w-[848px] `} dir="ltr">
            <UserInformation />
          </div>
          <div dir="ltr">
            <UpdateInformation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
