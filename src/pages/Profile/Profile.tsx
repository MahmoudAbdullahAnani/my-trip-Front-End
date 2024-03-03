import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserInformation from "../../components/Profile/UserInformation";
import UpdateInformation from "../../components/Profile/UpdateInformation";
import HeaderProfile from "../../components/Profile/HeaderProfile";

import TopHeader from "../../components/Profile/TopHeader";
import { useTranslation } from "react-i18next";

function Profile() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  useEffect(() => {
    if (stateUserData._id === "") {
      return navigator("/");
    }
  }, []);

  // handle lang
    const { i18n } = useTranslation();

  return (
    <div
      className={`lg:mt-[80px] lg:mb-[300px] mb-[200px] p-0 lg:px-[96px] px-[16px] flex flex-col gap-[24px]`}
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
    >
      <TopHeader/>
      <div className={`flex flex-wrap gap-[24px] items-start justify-start`}>
        {/* side bar */}
        <HeaderProfile />
        {/* content */}
        <div className={`ll:w-[calc(100%-250px)] w-[100%]`}>
          <div className={`w-full max-w-[848px] `} dir={i18n.language !== "ar" ? "rtl" : "ltr"}>
            <UserInformation />
          </div>
          <div dir={i18n.language !== "ar" ? "rtl" : "ltr"}>
            <UpdateInformation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
