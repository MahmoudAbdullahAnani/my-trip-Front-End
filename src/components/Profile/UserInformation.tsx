import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { iconBarthDay, iconGender } from "../../assets/icons/home";
import { useTranslation } from "react-i18next";

function UserInformation() {
  const { avatar, age, email, gender, firstName, lastName } = useSelector(
    (state: RootState) => state.loggedUser
  );

  // handle lang
  const { t } = useTranslation();

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
      <div className="mt-[50px]">
        <img
          className={`w-[71px] h-[81px] rounded-[8px] `}
          src={
            avatar ||
            "https://media.licdn.com/dms/image/D4D03AQHzjiCnOspqrg/profile-displayphoto-shrink_200_200/0/1703883364099?e=1714608000&v=beta&t=d8izU1BFQ91iHgqrzE_YUzT9lCVE1ADtI4f8TF1F93A"
          }
          alt={`${firstName}-${lastName}`}
        />
      </div>
    </div>
  );
}

export default UserInformation;
