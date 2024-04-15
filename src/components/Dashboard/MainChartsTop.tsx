import { useTranslation } from "react-i18next";
import { SchemaUser } from "../../pages/Auth/Login";
import { Chart } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import axios from "axios";
import { TokenJWT } from "../../data/RecoilState/AuthStatePages/Auth";
import { useEffect, useState } from "react";
import { arabic_letters } from "../Home/Systems/Notification/NotificationComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Bounce, toast } from "react-toastify";
import UpdatePublicNotification from "./UpdatePublicNotification";
import {
  DataOfUserSearchPrivateNotifications,
  ReRenderNotificationData,
  UpdatePublicNotificationContentData,
  UpdatePublicNotificationExDateData,
  UpdatePublicNotificationTitleData,
  UpdatePublicNotification_idData,
} from "../../data/RecoilState/Notifications/NotificationsData";
import UpdatePrivateNotification from "./UpdatePrivateNotification";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import StaticSections from "./StaticSections/StaticSections";
function countUsersOnMonths(data: []) {
  let countJanuary = 0;
  let countFebruary = 0;
  let countMarch = 0;
  let countApril = 0;
  let countMay = 0;
  let countJune = 0;
  let countJuly = 0;
  let countAugust = 0;
  let countSeptember = 0;
  let countOctober = 0;
  let countNovember = 0;
  let countDecember = 0;
  data.map(({ createdAt }) => {
    switch (new Date(createdAt).getMonth()) {
      case 0:
        countJanuary += 1;
        break;
      case 1:
        countFebruary += 1;
        break;
      case 2:
        countMarch += 1;
        break;
      case 3:
        countApril += 1;
        break;
      case 4:
        countMay += 1;
        break;
      case 5:
        countJune += 1;
        break;
      case 6:
        countJuly += 1;
        break;
      case 7:
        countAugust += 1;
        break;
      case 8:
        countSeptember += 1;
        break;
      case 9:
        countOctober += 1;
        break;
      case 10:
        countNovember += 1;
        break;
      case 11:
        countDecember += 1;
        break;
    }
  });
  return {
    countJanuary,
    countFebruary,
    countMarch,
    countApril,
    countMay,
    countJune,
    countJuly,
    countAugust,
    countSeptember,
    countOctober,
    countNovember,
    countDecember,
  };
}

function MainChartsTop({
  children,
  allUsers,
  allUsersActive,
  allUsersUnActive,
  cashData,
}: {
  allUsers: SchemaUser[];
  allUsersActive: SchemaUser[];
  allUsersUnActive: SchemaUser[];
  cashData: { data: []; count: number };
  children: React.ReactNode;
}) {
  // Lang
  const { t, i18n } = useTranslation();

  const [reRenderComponent, setReRenderComponent] = useRecoilState(
    ReRenderNotificationData
  );
  const dataUsers = {
    labels: [t("Total Users"), t("Active Users"), t("Inactive Users")],
    datasets: [
      {
        data: [allUsers.length, allUsersActive.length, allUsersUnActive.length],
        backgroundColor: ["#005A6C", "#36A2EB", "#FF6384"],
      },
    ],
  };
  const optionsUsers = {
    cutout: "20%",
  };
  const dataChart = countUsersOnMonths(cashData.data);
  // Handle Data Cashing
  const dataTrips = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `${t("Entries every month")}`,
        data: [
          dataChart.countJanuary,
          dataChart.countFebruary,
          dataChart.countMarch,
          dataChart.countApril,
          dataChart.countMay,
          dataChart.countJune,
          dataChart.countJuly,
          dataChart.countAugust,
          dataChart.countSeptember,
          dataChart.countOctober,
          dataChart.countNovember,
          dataChart.countDecember,
        ],
        backgroundColor: [
          "#117C99",
          "#005A6C",
          "#31B2E1",
          "#117C99",
          "#005A6C",
          "#31B2E1",
          "#117C99",
          "#005A6C",
          "#31B2E1",
          "#117C99",
          "#005A6C",
          "#31B2E1",
        ],
        barThickness: 20,
      },
    ],
  };
  // Handle Notifications
  const [publicNotifications, setPublicNotifications] = useState([]);
  const [tokenJWT] = useRecoilState(TokenJWT);

  const token = localStorage.getItem("token") || tokenJWT || "";

  const getPublicNotifications = async () => {
    // if get token then fetch to data me
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/public/notifications`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/public/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async ({ data }) => {
        setPublicNotifications(
          data?.AllNotifications.filter(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ({ exDate }: { exDate: string }) =>
              exDate !== "" && exDate > new Date().toISOString()
          )
        );
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
    // setLoading(false);
    return true;
  };

  const deletePublicNotification = async (_id: string) => {
    // if get token then fetch to data me
    await axios
      .delete(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/public/notifications/${_id}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/public/notifications/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async () => {
        setReRenderComponent(!reRenderComponent);
        toast.success(t("تم الحذف"), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
    // setLoading(false);
    return true;
  };
  const [, setUpdatePublicNotificationTitle] = useRecoilState(
    UpdatePublicNotificationTitleData
  );

  const [, setUpdatePublicNotificationContent] = useRecoilState(
    UpdatePublicNotificationContentData
  );
  const [, setUpdatePublicNotificationExDate] = useRecoilState(
    UpdatePublicNotificationExDateData
  );
  const [, UpdatePublicNotification_id] = useRecoilState(
    UpdatePublicNotification_idData
  );
  const updatePublicNotification = (
    _id: string,
    title: string,
    content: string,
    exDate: Date
  ) => {
    setUpdatePublicNotificationTitle(title);
    setUpdatePublicNotificationContent(content);
    UpdatePublicNotification_id(_id);
    setUpdatePublicNotificationExDate(new Date(exDate));
  };

  const [
    dataOfUserSearchPrivateNotificationsState,
    setDataOfUserSearchPrivateNotificationsState,
  ] = useRecoilState(DataOfUserSearchPrivateNotifications);
  useEffect(() => {
    getPublicNotifications();
  }, [reRenderComponent]);

  return (
    <>
      
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2
          className="text-lg font-semibold mb-4"
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
        >
          {t("المستخدمين")}
        </h2>
        <Chart type="doughnut" data={dataUsers} options={optionsUsers} />
      </div>
      <div className="bg-white p-4 rounded-md  shadow-md lg:col-span-2">
        <h2
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className="text-lg font-semibold mb-4"
        >
          {t("الدخول الي النظام")}
        </h2>
        <Chart
          type="bar"
          data={dataTrips}
          // height={100}
          className=" "
          // options={{
          //   scales: {
          //     y: {
          //       suggestedMin: 1,
          //       suggestedMax: 600,
          //     },
          //   },
          // }}
        />
      </div>
      <StaticSections />
      {children}
      <div className="bg-white p-4 rounded-md  shadow-md lg:col-span-2">
        <h2
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className="text-lg font-semibold mb-4"
        >
          {t("Public Notifications")}
        </h2>
        <div
          dir={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            arabic_letters.includes(publicNotifications[0]?.title[0] || "")
              ? "rtl"
              : "ltr"
          }
          className={`flex lg:flex-row flex-col gap-[15px] items-center lg:items-start`}
        >
          <div className={`w-[60%] block lg:hidden`}>
            <UpdatePublicNotification />
          </div>

          <div className={`flex flex-col gap-[15px]`}>
            {publicNotifications?.map(
              ({ _id, title, content, exDate, createdAt }) => {
                const exDateFormat = new Date(exDate).toLocaleDateString(
                  "en-GB"
                );
                return (
                  <div key={`${_id}--${Math.random()}--${createdAt}`}>
                    <div className={`flex items-center `}>
                      <h3 className={"font-bold text-[20px]"}>{title}</h3>
                      <div className={`flex items-center`}>
                        <button
                          name="delete"
                          className={`text-red-500 hover:bg-red-100 p-2 rounded-lg`}
                          onClick={() => deletePublicNotification(_id)}
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          name="update"
                          className={`text-blue-500 hover:bg-blue-100 p-2 rounded-lg`}
                          onClick={() =>
                            updatePublicNotification(
                              _id,
                              title,
                              content,
                              exDate
                            )
                          }
                        >
                          <UpdateIcon />
                        </button>
                        <span>
                          {t("تنتهي في ")} {exDateFormat}
                        </span>
                      </div>
                    </div>
                    <h6>{content}</h6>
                  </div>
                );
              }
            )}
          </div>
          <div className={`w-[60%] lg:block hidden`}>
            <UpdatePublicNotification />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md  shadow-md lg:col-span-2">
        <div
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className={`flex items-center mb-4 gap-2`}
        >
          <h2
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            className="text-lg font-semibold "
          >
            {t("Private Notifications")}
          </h2>
          {dataOfUserSearchPrivateNotificationsState._id !== "" && (
            <button
              name="delete"
              onClick={() =>
                setDataOfUserSearchPrivateNotificationsState({
                  _id: "",
                  avatar: "",
                  firstName: "",
                  lastName: "",
                  email: "",
                  age: 0,
                  notification: [],
                })
              }
              className={`text-red-500 hover:bg-red-100 p-2 rounded-lg`}
            >
              <RemoveCircleOutlineIcon />
            </button>
          )}
        </div>
        <UpdatePrivateNotification />
      </div>
    </>
  );
}

export default MainChartsTop;
