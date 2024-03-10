import { useTranslation } from "react-i18next";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import { DataOfUserSearchPrivateNotifications } from "../../data/RecoilState/Notifications/NotificationsData";
import { useRecoilState } from "recoil";

export async function getNewNotifications(_id: string) {
  const data = await axios.get(
    import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
      ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/notifications/${_id}`
      : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/notifications/${_id}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return data?.data.Notifications;
}

function CreatePrivateNotificationForm() {
  // Lang
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [mainError, setMainError] = useState("");
  const [{ _id, avatar, firstName, lastName, email, age }, setDataOfUser] =
    useRecoilState(DataOfUserSearchPrivateNotifications);
  const CreateNotification = async () => {
    if (_id === "") {
      return setMainError("يجب عليك اختيار مستخدم اولا");
    }
    if (title === "" || title.length<=2) {
      return setTitleError("يجب عليك ادخال عنوان الموضوع");
    }
    if (content === "" || content.length<=2) {
      return setContentError("يجب عليك ادخال محتوي الموضوع");
    }

    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/notifications/${_id}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/notifications/${_id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(async () => {
        const notification = await getNewNotifications(_id);

        setTitle("");
        setContent("");
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
        setDataOfUser({
          ...{ _id, avatar, firstName, lastName, email, age },
          notification,
        });
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
          disabled={!_id}
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
        aria-label="maximum height"
        disabled={!title}
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

      <button
        onClick={CreateNotification}
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className={`py-2 mt-2 rounded-[13px] bg-[#117C99] hover:bg-[#216678] text-[#FFF] hover:text-[#cfcfcf] duration-150 mm:text-[14.957px] mm:font-black text-[14px] font-[500] `}
      >
        {t("Create Private Notification")}
      </button>
    </div>
  );
}

export default CreatePrivateNotificationForm;
