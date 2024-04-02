import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useTranslation } from "react-i18next";
import DashboardTrips from "./Air/DashboardTrips";
import DashboardHotels from "./Hotels/DashboardHotels";
import DashboardCars from "./Cars/DashboardCars";
import axios from "axios";
import MainChartsTop from "../components/Dashboard/MainChartsTop";
// import ChatAdmins from "../WebSocket/Chat/ChatAdmins";

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

  const [allUsers, setAllUsers] = React.useState([]);
  const [allUsersActive, setAllUsersActive] = React.useState([]);
  const [allUsersUnActive, setAllUsersUnActive] = React.useState([]);

  // Cash-Data
  const [cashData, setCashData] = React.useState({ data: [], count: 0 });

  const getAllUsers = async () => {
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/users`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setAllUsers(data);
        const usersActive = data.filter(
          ({ active = true }: { active: boolean }) => active === true
        );
        setAllUsersActive(usersActive);
        const usersUnActive = data.filter(
          ({ active = true }: { active: boolean }) => active === false
        );
        setAllUsersUnActive(usersUnActive);
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
  };
  const getCatchData = async () => {
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/catch-data`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/catch-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setCashData(data);
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
  };

  React.useEffect(() => {
    getAllUsers();
    getCatchData();
  }, []);

  return (
    <div className={`my-[20px] lg:px-[96px] px-[10px] `}>
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`flex items-center `}
      >
        <h1 className={`whitespace-nowrap text-[32px] font-bold text-[#000]`}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-[20px]">
        <MainChartsTop
          allUsers={allUsers}
          allUsersActive={allUsersActive}
          allUsersUnActive={allUsersUnActive}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cashData={cashData}
        >
          {/* <ChatAdmins />  */}
          {typeDashboardView === "trips" && (
            <DashboardTrips
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              cashData={cashData}
            />
          )}
          {typeDashboardView === "hotels" && <DashboardHotels />}
          {typeDashboardView === "cars" && <DashboardCars />}
        </MainChartsTop>
      </div>
    </div>
  );
}

export default Dashboard;
