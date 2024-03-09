import { useRecoilState } from "recoil";
import { ReRenderNotificationData } from "../../data/RecoilState/Notifications/NotificationsData";
import { useTranslation } from "react-i18next";
import { TextareaAutosize } from "@mui/material";
import DatePicker from "react-datepicker";
import { useState } from "react";
import axios from "axios";
import { Flip, toast } from "react-toastify";

function CreatePublicNotification() {
  // Lang
  const { t, i18n } = useTranslation();
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(
    ReRenderNotificationData
  );
  // const [startDate, setStartDate] = useState(
  //   new Date(UpdatePublicNotificationExDate)
  // );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  const [exDate, setExDate] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [exDateError, setExDateError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [mainError, setMainError] = useState("");

  const CreateNotification = async () => {
    if (title === "") {
      return setTitleError("يجب عليك ادخال عنوان الموضوع");
    }
    if (content === "") {
      return setContentError("يجب عليك ادخال محتوي الموضوع");
    }
    if (exDate == null) {
      return setExDateError("يجب عليك تحديد تاريخ الانتهاء");
    }

    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/public/notifications`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/public/notifications`,
        {
          title,
          content,
          exDate,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setTitle("");
        setContent("");
        setExDate(null);
        setMainError("");

        toast.success(t("تم الانشاء"), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
        setReRenderDataApp(!reRenderDataApp);
      })
      .catch((error) => {
        console.log("updatePublicNotificationById==> ", error);
        toast.error(t(error.response?.data.message), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
        setMainError(error.response?.data.message);
      });
  };

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className={`flex flex-col gap-[5px] mt-5`}
    >
      {mainError && (
        <p className={`text-[#ff0000] text-[14px]`}>{t(mainError)}</p>
      )}
      <label>
        <input
          type="text"
          placeholder={t("عنوان الموضوع")}
          onChange={(e) => {
            setTitleError("");
            setMainError("");
            setTitle(e.target.value);
          }}
          value={title}
          className={`shadow-lg border focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
        />
      </label>
      {titleError && (
        <p className={`text-[#ff0000] text-[14px]`}>{titleError}</p>
      )}
      <TextareaAutosize
        color="neutral"
        minRows={3}
        // maxRows={2}
        placeholder={t("محتوى الموضوع")}
        onChange={(e) => {
          setContentError("");
          setMainError("");
          setContent(e.target.value);
        }}
        value={content}
        className={`shadow-lg border w-full h-[50px] focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
      />
      {contentError && (
        <p className={`text-[#ff0000] text-[14px]`}>{contentError}</p>
      )}
      <DatePicker
        showTimeSelect
        minDate={new Date()}
        placeholderText={t("تاريخ الانتهاء هذا الاشعار")}
        selected={exDate}
        onChange={(date) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setExDateError(null);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setExDate(date);
          setMainError("");
        }}
        timeClassName={handleColor}
        dateFormat="dd/MM/yyyy HH:mm"
        className={`shadow-lg text-center border w-full h-[50px] focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
      />
      {exDateError && (
        <p className={`text-[#ff0000] text-[14px]`}>{exDateError}</p>
      )}
      <button
        onClick={CreateNotification}
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className={`py-2 mt-2 rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 mm:text-[14.957px] mm:font-black text-[14px] font-[500] `}
      >
        {t("Create Notification")}
      </button>
    </div>
  );
}

export default CreatePublicNotification;
