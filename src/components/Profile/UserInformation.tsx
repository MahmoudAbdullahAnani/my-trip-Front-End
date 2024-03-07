import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { iconBarthDay, iconGender } from "../../assets/icons/home";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";

function UserInformation() {
  const { avatar, age, email, gender, firstName, lastName } = useSelector(
    (state: RootState) => state.loggedUser
  );

  // handle lang
  const { t } = useTranslation();
  console.log(email);

  const [file, setFile] = useState(avatar);

  // handle upload avatar
  const uploadImage = async (fileUpload: unknown) => {
    const token = localStorage.getItem("token") || "";
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/upload`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/upload`,
        {
          file: fileUpload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        // if (error.response?.data.statusCode === 401) {
        //   localStorage.removeItem("token");
        // }
      });
    return true;
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async function handleChange(e) {
    console.log(e.target.files);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFile(URL.createObjectURL(e.target.files[0]));
    await uploadImage(e.target.files[0]);
  }

  return (
    <div
      className={`w-full h-[250px] bg-cover bg-no-repeat object-fill bg-[url('/public/assets/profile/bg-user-information.png')] flex p-[10px] gap-[14px] sm:gap-[24px] items-start justify-end sm:px-[32px] sm:py-[36px] `}
      // dir={i18n.language === "ar" ? "rtl" : "ltr"}
      dir="ltr"
    >
      <div className={`flex flex-col justify-start items-end gap-[18px] `}>
        <h2 className={`text-[#117C99] text-[16px] font-bold `} dir="rtl">
          {t("مرحباً بك")} {firstName} {lastName}
        </h2>
        <h5 className={`text-[#117C99] text-[16px] font-medium`}>{email}</h5>
        <div className="flex flex-row-reverse gap-[26px]">
          {/* BarthDay */}
          <div
            className={`flex justify-center items-center text-[#117C99] text-[16px] font-medium`}
          >
            {age && age > 0 ? <span>{age}</span> : null}
            <span>{iconBarthDay}</span>
          </div>
          {/* Gender */}
          <div
            className={` flex justify-center items-center text-[#117C99] text-[16px] font-medium`}
          >
            {gender && <span>{t(gender)}</span>}
            {gender && <span>{iconGender}</span>}
          </div>
        </div>
      </div>
      <div className="mt-[50px] w-[80px] h-[80px]">
        <label className={`cursor-pointer `}>
          <img
            src={
              avatar ||
              file ||
              "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            }
            alt={`${firstName}-${lastName}`}
            className={`object-contain rounded-[8px]`}
          />
          {/* <div className={`text-[#117C99] text-[12px] text-center pt-[1px] relative w-[80px] rounded-b-[8px] bg-slate-200 font-medium`}>{t("اختر صورة")}</div> */}
          <input
            onChange={handleChange}
            className="hidden"
            type="file"
            id="avatar"
            name="avatar"
            accept=".jpg, .jpeg, .png"
          />
        </label>
      </div>
    </div>
  );
}

export default UserInformation;
