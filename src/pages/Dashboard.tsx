import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useTranslation } from "react-i18next";
import DashboardTrips from "./Air/DashboardTrips";
import DashboardHotels from "./Hotels/DashboardHotels";
import DashboardCars from "./Cars/DashboardCars";

function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Lang
  const { t, i18n } = useTranslation();

  const [typeDashboardView, setTypeDashboardView] = React.useState("trips");

  return (
    <div className={`lg:mt-[100px] px-[96px] `}>
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`flex items-center gap-[14px]`}
      >
        <h1 className={`text-[32px] font-bold text-[#000]`}>
          {t("لوحة التحكم")}
          <span className={`text-[16px] `}>{` ${t(typeDashboardView)}`}</span>
        </h1>
        <div className="">
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
            <div className={`flex flex-col w-[200px] gap-[10px]`}>
              <button
                onClick={() => {
                  handleClose();
                  setTypeDashboardView("trips");
                }}
                className={`text-[20px] font-semibold ${
                  typeDashboardView === "trips" && "bg-[#3990a8] text-white"
                } rounded-t-[8px] hover:bg-[#3990a8] hover:text-white `}
              >
                {t("طيران")}
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setTypeDashboardView("hotels");
                }}
                className={`text-[20px] font-semibold ${
                  typeDashboardView === "hotels" && "bg-[#3990a8] text-white"
                } hover:bg-[#3990a8] hover:text-white `}
              >
                {t("فنادق")}
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setTypeDashboardView("cars");
                }}
                className={`text-[20px] font-semibold rounded-b-[8px] ${
                  typeDashboardView === "cars" && "bg-[#3990a8] text-white"
                } hover:bg-[#3990a8] hover:text-white `}
              >
                {t("توصيل")}
              </button>
            </div>
          </Menu>
        </div>
      </div>

      {typeDashboardView === "trips" && <DashboardTrips />}
      {typeDashboardView === "hotels" && <DashboardHotels />}
      {typeDashboardView === "cars" && <DashboardCars />}
    </div>
  );
}

export default Dashboard;
