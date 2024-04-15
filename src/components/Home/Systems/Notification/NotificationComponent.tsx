// State Management
import { useRecoilState } from "recoil";
// import { allNotifications } from "../../../../data/RecoilState/Notifications/NotificationsData";
import {
  iconNotificationDesktop,
  iconNotificationDesktopExit,
} from "../../../../assets/icons/home";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TokenJWT,
  HolderNotifications,
} from "../../../../data/RecoilState/AuthStatePages/Auth";
import { LoderBtn } from "../../../loder/Loder";
import { useTranslation } from "react-i18next";
import { PendingFriends } from "../../../../data/RecoilState/Profile/Friends";
import { IFriends } from "../../../Profile/ContainerFriends";
import CardPendingFriend from "../../../Profile/CardPendingFriend";

function handleDate(dateString: Date) {
  const date = new Date(dateString);
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();
  return `${days}/${months}/${years}`;
}

export const arabic_letters = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
];

function NotificationComponent({ isMobile = false }: { isMobile?: boolean }) {
  const [toggle, setToggle] = useRecoilState(HolderNotifications);

  const [loading, setLoading] = useState(false);
  const [reRenderComponent, setReRenderComponent] = useState(true);
  const [publicNotifications, setPublicNotifications] = useState([]);
  const [privateNotifications, setPrivateNotifications] = useState([]);
  const [tokenJWT] = useRecoilState(TokenJWT);

  const token = localStorage.getItem("token") || tokenJWT || "";
  const [reRenderThisComponent, setTeRenderThisComponent] = useState(true);
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
  const getPrivateNotifications = async () => {
    // if get token then fetch to data me
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/notificationsUserMe`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/notificationsUserMe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async ({ data }) => {
        // console.log(data?.Notifications);
        const privateN = data?.Notifications.filter(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (notification) => !notification.exDate
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        setPrivateNotifications(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          privateN.filter((notification) => !notification.isSee)
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

  const setIsSee = async (_id: string) => {
    setLoading(true);
    await axios
      .patch(
        `${
          import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
            ? import.meta.env.VITE_PUBLIC_API_LOCAL
            : import.meta.env.VITE_PUBLIC_API_PRODUCTION
        }/notificationsUserMe/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setTeRenderThisComponent(!reRenderThisComponent);
        setReRenderComponent(!reRenderComponent);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      });
  };

  useEffect(() => {
    getPublicNotifications();
    getPrivateNotifications();
    // if (localStorage.getItem("token")) {
    // }
  }, [reRenderThisComponent]);
  // publicNotifications, privateNotifications, reRenderComponent

  // handle lang

  const { t, i18n } = useTranslation();

  const [pendingFriendsState] = useRecoilState(PendingFriends);

  return (
    <>
      {/* {toggle && (
        <div
          onClick={() => setToggle(!toggle)}
          style={{ height: `${bodyHight}px` }}
          className={`bg-[#00000059] w-[100%] h-[${bodyHight}px] absolute left-0 top-0 z-30`}
        ></div>
      )} */}
      <div
        id="dropdownAvatarName"
        className={`${toggle ? "block" : "hidden"}  ${
          isMobile ? "top-[65px]" : "top-[60px]"
        } absolute bg-white divide-y rounded-lg shadow lg:left-10 z-30 left-0 w-[300px] lg:w-[60vh]`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 ">
          <div className="truncate">{}</div>
        </div>
        <ul
          className={`overflow-y-scroll lg:max-h-[600px] max-h-[300px] py-2 px-2 flex flex-col gap-2 text-sm text-gray-700`}
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
          dir={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            arabic_letters.includes(publicNotifications[0]?.title[0] || "")
              ? "rtl"
              : "ltr"
          }
        >
          <h2
            dir={i18n.language !== "ar" ? "rtl" : "ltr"}
            className={`text-end`}
          >
            {t("الاشعارات الخاصة")}
          </h2>
          {privateNotifications.length >= 1 ? (
            loading ? (
              <div className={`w-full flex justify-center items-center`}>
                <LoderBtn />
              </div>
            ) : (
              privateNotifications.map(({ _id, title, content, date }) => {
                return (
                  <li key={_id}>
                    <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box">
                      <div className="text-sm pb-2">
                        <div className={`flex flex-col`}>
                          <div className={`text-start`}>
                            <span>{title}</span>
                            <button
                              name="exit"
                              onClick={() => {
                                setIsSee(_id);
                              }}
                              className="float-right rounded-full"
                            >
                              {iconNotificationDesktopExit}
                            </button>
                          </div>
                          <span className={`text-slate-400  text-[10px] `}>
                            {handleDate(date)}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 tracking-tight ">
                        {content}
                      </div>
                    </div>
                  </li>
                );
              })
            )
          ) : (
            <h5
              dir={i18n.language !== "ar" ? "rtl" : "ltr"}
              className={`text-center text-slate-500 text-[12px]`}
            >
              {t("لا توجد اشعارات حتي الان")}
            </h5>
          )}
          <h2
            dir={i18n.language !== "ar" ? "rtl" : "ltr"}
            className={`text-end`}
          >
            {t("الاشعارات العامة")}
          </h2>
          {/* title, content, timestamps, */}
          {publicNotifications.length >= 1 ? (
            publicNotifications.map(({ _id, title, content, exDate }) => {
              return (
                <li key={_id}>
                  <div className="shadow-lg rounded-lg bg-white mx-auto p-4 notification-box">
                    <div className="text-sm pb-2">
                      <div className={`flex flex-col `}>
                        <div className={`text-start`}>
                          <span>{title}</span>
                        </div>
                        <span className={`text-slate-400  text-[10px] `}>
                          {handleDate(exDate)}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 tracking-tight ">
                      {content}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <h5
              dir={i18n.language !== "ar" ? "rtl" : "ltr"}
              className={`text-center text-slate-500 text-[12px]`}
            >
              {t("لا توجد اشعارات حتي الان")}
            </h5>
          )}
          {pendingFriendsState.length >= 1 && (
            <h2
              dir={i18n.language !== "ar" ? "rtl" : "ltr"}
              className={`text-end`}
            >
              {t("طلبات الصداقة")}
            </h2>
          )}
          {pendingFriendsState.length >= 1 ? (
            loading ? (
              <div className={`w-full flex justify-center items-center`}>
                <LoderBtn />
              </div>
            ) : (
              pendingFriendsState.map((items: IFriends) => (
                <CardPendingFriend
                  key={`${items._id}-${Math.random()}`}
                  {...items}
                />
              ))
            )
          ) : (
            <></>
          )}
        </ul>
      </div>
      <button name="exit" onClick={() => setToggle(!toggle)} className="relative">
        <div className="absolute right-0 top-0 bg-red-500 rounded-full">
          <span className="text-[12px] text-white p-1">
            {publicNotifications.length + privateNotifications.length}
          </span>
        </div>
        <div
          style={
            {
              // background: "rgb(182 231 251 / 30%)",
            }
          }
          className={`bg-[#e9f7fd] w-[48px] h-[48px] rounded-full flex justify-center items-center`}
        >
          <span>{iconNotificationDesktop}</span>
        </div>
      </button>
      {/* <div className=""> */}

      {/* </div> */}
    </>
  );
}

export default NotificationComponent;
