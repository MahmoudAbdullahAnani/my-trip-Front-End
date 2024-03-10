import { useTranslation } from "react-i18next";
import SearchForUserPrivateNotifications from "./SearchForUserPrivateNotifications";
import {
  DataOfUserSearchPrivateNotifications,
  ReRenderNotificationData,
  UpdatePrivateNotificationContentData,
  UpdatePrivateNotificationTitleData,
  UpdatePrivateNotification_idDataComponent,
} from "../../data/RecoilState/Notifications/NotificationsData";
import { useRecoilState } from "recoil";
import { iconBarthDay } from "../../assets/icons/home";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import CreatePrivateNotificationForm from "./CreatePrivateNotificationForm";
import UpdatePrivateNotificationForm from "./UpdatePrivateNotificationForm";

function UpdatePrivateNotification() {
  const { t, i18n } = useTranslation();
  const [
    dataOfUserSearchPrivateNotificationsState,
    setDataOfUserSearchPrivateNotificationsState,
  ] = useRecoilState(DataOfUserSearchPrivateNotifications);
  const [, setUpdatePrivateNotificationTitleDataState] = useRecoilState(
    UpdatePrivateNotificationTitleData
  );
  const [, setUpdatePrivateNotificationContentDataState] = useRecoilState(
    UpdatePrivateNotificationContentData
  );
  const [, setUpdatePrivateNotification_idDataComponent] = useRecoilState(
    UpdatePrivateNotification_idDataComponent
  );

  const { avatar, firstName, lastName, email, age, _id, notification } =
    dataOfUserSearchPrivateNotificationsState;
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(
    ReRenderNotificationData
  );
  const deletePrivateNotification = async (notification_id: string) => {
    const token = localStorage.getItem("token") || "";
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/notificationsUserMe/${notification_id}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/notificationsUserMe/${notification_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
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
        setReRenderDataApp(!reRenderDataApp);
        const newData = dataOfUserSearchPrivateNotificationsState;
        const notification =
          dataOfUserSearchPrivateNotificationsState.notification.filter(
            (n: { _id: string }) => n._id !== notification_id
          );
        console.log({ notification });

        setDataOfUserSearchPrivateNotificationsState({
          ...newData,
          notification,
        });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
  };

  const updatePrivateNotification = (
    _id: string,
    title: string,
    content: string
    // date: string,
    // isSee: string
  ) => {
    setUpdatePrivateNotificationTitleDataState(title);
    setUpdatePrivateNotificationContentDataState(content);
    setUpdatePrivateNotification_idDataComponent(_id);
  };
  return (
    <div dir={i18n.language === "ar" ? "rtl" : "lrt"}>
      <SearchForUserPrivateNotifications />
      {_id !== "" && (
        <div
          className={`flex flex-wrap justify-center my-2 items-center lg:justify-start gap-2 mt-2`}
        >
          <div>
            <img
              width={100}
              height={100}
              className={`rounded-lg max-w-[200px] max-h-[150px] `}
              src={
                avatar ||
                "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              }
              alt={`${firstName}-${lastName}`}
            />
          </div>
          <div className={`flex flex-col items-center`}>
            <span>
              {firstName} {lastName}
            </span>
            <span>{email}</span>
            <span className={`flex `}>
              {iconBarthDay}
              {age}
            </span>
          </div>
        </div>
      )}

      <div className={`flex flex-wrap justify-center lg:justify-between`}>
        <div className={`flex flex-col gap-5 mt-2`}>
          {notification &&
            notification.map(({ isSee, title, content, date, _id }) => {
              const exDateFormat = new Date(date).toLocaleDateString("en-GB");
              return (
                <div
                  key={`${_id}--${Math.random()}--${date}`}
                  className={`${isSee && "hidden"}`}
                >
                  <div className={`flex items-center `}>
                    <h3 className={"font-bold text-[20px]"}>{title}</h3>
                    <div className={`flex items-center`}>
                      <button
                        className={`text-red-500 hover:bg-red-100 p-2 rounded-lg`}
                        onClick={() => deletePrivateNotification(_id)}
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        className={`text-blue-500 hover:bg-blue-100 p-2 rounded-lg`}
                        onClick={() =>
                          updatePrivateNotification(
                            _id,
                            title,
                            content
                            // date,
                            // isSee
                          )
                        }
                      >
                        <UpdateIcon />
                      </button>
                      <span>
                        {t("تم الانشاء في ")} {exDateFormat}
                      </span>
                    </div>
                  </div>
                  <h6>{content}</h6>
                </div>
              );
            })}
        </div>
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <UpdatePrivateNotificationForm />
          <CreatePrivateNotificationForm />
        </div>
      </div>
    </div>
  );
}

export default UpdatePrivateNotification;
