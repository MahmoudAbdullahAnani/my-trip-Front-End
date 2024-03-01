import { iconSignout } from "../../assets/icons/home";
import DialogComponent from "../ResetPassword/OAuthNavberDesktop/DialogComponent";
import ControllerProfile from "./ControllerProfile";



function HeaderProfile() {

  return (
    <>
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
      
    </>
  );
}

export default HeaderProfile;
