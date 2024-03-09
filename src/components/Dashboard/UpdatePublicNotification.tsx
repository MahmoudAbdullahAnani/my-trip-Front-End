import { useRecoilState } from "recoil";
import {
  ReRenderNotificationData,
  UpdatePublicNotificationContentData,
  UpdatePublicNotificationExDateData,
  UpdatePublicNotificationTitleData,
  UpdatePublicNotification_idData,
} from "../../data/RecoilState/Notifications/NotificationsData";
import { useTranslation } from "react-i18next";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Bounce, toast } from "react-toastify";
import CreatePublicNotification from "./CreatePublicNotification";

function UpdatePublicNotification() {
  const [UpdatePublicNotificationTitle, setUpdatePublicNotificationTitle] =
    useRecoilState(UpdatePublicNotificationTitleData);
  const [UpdatePublicNotificationContent, setUpdatePublicNotificationContent] =
    useRecoilState(UpdatePublicNotificationContentData);
  const [UpdatePublicNotificationExDate, setUpdatePublicNotificationExDate] =
    useRecoilState(UpdatePublicNotificationExDateData);
  const [UpdatePublicNotification_id] = useRecoilState(
    UpdatePublicNotification_idData
  );
  // Lang
  const { t, i18n } = useTranslation();
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(
    ReRenderNotificationData
  );

  const updatePublicNotificationById = async () => {
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/public/notifications/${UpdatePublicNotification_id}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/public/notifications/${UpdatePublicNotification_id}`,
        {
          title: UpdatePublicNotificationTitle,
          content: UpdatePublicNotificationContent,
          exDate: UpdatePublicNotificationExDate,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        toast.success(t("تم التعديل"), {
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
      })
      .catch((error) => {
        console.log("updatePublicNotificationById==> ", error);
      });
  };

  // const [startDate, setStartDate] = useState(
  //   new Date(UpdatePublicNotificationExDate)
  // );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  return (
    <div>
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`flex flex-col gap-[5px]`}
      >
        <label>
          <input
            disabled={!UpdatePublicNotification_id}
            type="text"
            defaultValue={UpdatePublicNotificationTitle}
            placeholder={t("عنوان الموضوع")}
            onChange={(e) => setUpdatePublicNotificationTitle(e.target.value)}
            className={`shadow-lg border focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
          />
        </label>
        <TextareaAutosize
          disabled={!UpdatePublicNotification_id}
          defaultValue={UpdatePublicNotificationContent}
          color="neutral"
          minRows={3}
          // maxRows={2}
          placeholder={t("محتوى الموضوع")}
          onChange={(e) => setUpdatePublicNotificationContent(e.target.value)}
          className={`shadow-lg border w-full h-[50px] focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
        />
        <DatePicker
          disabled={!UpdatePublicNotification_id}
          showTimeSelect
          minDate={new Date()}
          placeholderText={t("تاريخ الانتهاء")}
          selected={UpdatePublicNotificationExDate}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={(date) => setUpdatePublicNotificationExDate(date)}
          timeClassName={handleColor}
          dateFormat="dd/MM/yyyy HH:mm"
          className={`shadow-lg text-center border w-full h-[50px] focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
        />
        <button
          disabled={!UpdatePublicNotification_id}
          onClick={updatePublicNotificationById}
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          className={`py-2 mt-2 rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 mm:text-[14.957px] mm:font-black text-[14px] font-[500] `}
        >
          {t("تحديث")}
        </button>
      </div>
      <CreatePublicNotification />
    </div>
  );
}

export default UpdatePublicNotification;
