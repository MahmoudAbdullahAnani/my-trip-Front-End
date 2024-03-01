import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ControllerProfile from "../../components/Profile/ControllerProfile";
function TopHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={`flex items-center gap-[14px]`}>
      <h1 className={`text-[32px] font-bold text-[#000]`}>إعدادات المستخدم</h1>
      <div className="block ll:hidden ">
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
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div dir="rtl" className="p-2">
            <ControllerProfile />
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default TopHeader;
