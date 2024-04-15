import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ControllerProfile from "../../components/Profile/ControllerProfile";
import DialogComponent from "../ResetPassword/OAuthNavberDesktop/DialogComponent";
import { iconSignout } from "../../assets/icons/home";
import { useTranslation } from "react-i18next";
function TopHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // handle lang
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-[14px] mt-[100px]`}>
      <h1 className={`text-[32px] font-bold text-[#000]`}>
        {t("إعدادات المستخدم")}
      </h1>
      <div className="block ll:hidden">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className={`text-red-900 bg-red-500`}
        >
          {open ? (
            <MenuOpenIcon className={`text-[#117c99]`} />
          ) : (
            <MenuIcon className={`text-[#117c99] `} />
          )}
        </Button>
        <Menu
          className="rounded-[16px]"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div dir="rtl" className="p-2 h-[170px]">
            <ControllerProfile />
          </div>
          <DialogComponent
            isMobile={false}
            iconOut={iconSignout}
            stylesBtn={`absolute flex gap-[8px] items-center justify-center bottom-[0px] right-[0px] w-[100%] bg-[#FCDAD1] text-[#CD1E3F] text-center py-[8px] rounded-[0px_0px_16px_16px]`}
          />
        </Menu>
      </div>
    </div>
  );
}

export default TopHeader;
