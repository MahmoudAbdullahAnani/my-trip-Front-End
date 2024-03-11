import { useRecoilState } from "recoil";
import {
  DataOfUserSearchPrivateNotifications,
  ReRenderNotificationData,
  UpdatePrivateNotificationContentData,
  UpdatePrivateNotificationTitleData,
  UpdatePrivateNotification_idDataComponent,
} from "../../data/RecoilState/Notifications/NotificationsData";
import { useTranslation } from "react-i18next";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import { getNewNotifications } from "./CreatePrivateNotificationForm";
import { useState } from "react";

function UpdatePrivateNotificationForm() {
  const [UpdatePrivateNotificationTitle, setUpdatePrivateNotificationTitle] =
    useRecoilState(UpdatePrivateNotificationTitleData);
  const [
    UpdatePrivateNotificationContent,
    setUpdatePrivateNotificationContent,
  ] = useRecoilState(UpdatePrivateNotificationContentData);

  const [UpdatePrivateNotification_id, serUpdatePrivateNotification_id] =
    useRecoilState(UpdatePrivateNotification_idDataComponent);
  const [{ _id, avatar, firstName, lastName, email, age }, setDataOfUser] =
    useRecoilState(DataOfUserSearchPrivateNotifications);
  // Lang
  const { t, i18n } = useTranslation();
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(
    ReRenderNotificationData
  );
  const [mainError, setMainError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const updatePrivateNotificationById = async () => {
    if (_id === "") {
      return setMainError("يجب عليك اختيار مستخدم اولا");
    }
    if (
      UpdatePrivateNotificationTitle === "" ||
      UpdatePrivateNotificationTitle.length <= 2
    ) {
      return setTitleError("يجب عليك ادخال عنوان الموضوع");
    }
    if (
      UpdatePrivateNotificationContent === "" ||
      UpdatePrivateNotificationContent.length <= 2
    ) {
      return setContentError("يجب عليك ادخال محتوي الموضوع");
    }
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/notifications/${_id}/${UpdatePrivateNotification_id}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/notifications/${_id}/${UpdatePrivateNotification_id}`,
        {
          title: UpdatePrivateNotificationTitle,
          content: UpdatePrivateNotificationContent,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(async () => {
        const notification = await getNewNotifications(_id);

        setUpdatePrivateNotificationTitle("");
        setUpdatePrivateNotificationContent("");
        serUpdatePrivateNotification_id("");
        setMainError("");

        toast.success(t("تم التعديل"), {
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
        setDataOfUser({
          ...{
            _id,
            avatar,
            firstName,
            lastName,
            email,
            age,
          },
          notification,
        });
        setReRenderDataApp(!reRenderDataApp);
      })
      .catch((error) => {
        console.log("updatePrivateNotificationById==> ", error);
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
    <div>
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`flex flex-col gap-[5px]`}
      >
        {mainError && (
          <p className={`text-[#ff0000] text-[14px]`}>{t(mainError)}</p>
        )}
        <label>
          <input
            disabled={!UpdatePrivateNotification_id}
            type="text"
            value={UpdatePrivateNotificationTitle}
            placeholder={t("عنوان الموضوع")}
            onChange={(e) => {
              setTitleError("");
              setMainError("");
              setUpdatePrivateNotificationTitle(e.target.value);
            }}
            className={`shadow-lg border focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
          />
        </label>
        {titleError && (
          <p className={`text-[#ff0000] text-[14px]`}>{t(titleError)}</p>
        )}
        <TextareaAutosize
          disabled={!UpdatePrivateNotificationTitle}
          value={UpdatePrivateNotificationContent}
          color="neutral"
          minRows={3}
          // maxRows={2}
          placeholder={t("محتوى الموضوع")}
          onChange={(e) => {
            setContentError("");
            setMainError("");
            setUpdatePrivateNotificationContent(e.target.value);
          }}
          className={`shadow-lg border w-full h-[50px] focus-visible:outline-none focus-visible:border-[#58a8f7] p-2 rounded-lg`}
        />
        {contentError && (
          <p className={`text-[#ff0000] text-[14px]`}>{t(contentError)}</p>
        )}
        <button
          // disabled={!UpdatePrivateNotification_id}
          onClick={updatePrivateNotificationById}
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          className={`py-2 mt-2 rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 mm:text-[14.957px] mm:font-black text-[14px] font-[500] `}
        >
          {t("تحديث")}
        </button>
      </div>
    </div>
  );
}

export default UpdatePrivateNotificationForm;
