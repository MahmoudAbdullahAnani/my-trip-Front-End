import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { iconBarthDay, iconGender } from "../../assets/icons/home";

function UserInformation() {
  const { avatar, age, email, firstName, lastName } = useSelector(
    (state: RootState) => state.loggedUser
  );

  return (
    <div
      className={`w-full h-[250px] bg-cover bg-no-repeat object-fill bg-[url('/public/assets/profile/bg-user-information.png')] flex  gap-[24px] items-start justify-end sm:px-[32px] sm:py-[36px] `}
    >
      <div className={`flex flex-col justify-start items-end gap-[18px]`}>
        <h2 className={`text-[#117C99] text-[16px] font-bold `} dir="rtl">
          مرحباً بك {firstName} {lastName}
        </h2>
        <h5 className={`text-[#117C99] text-[16px] font-medium`}>{email}</h5>
        <div>
          {/* BarthDay */}
          <div
            className={`flex justify-center items-center text-[#117C99] text-[16px] font-medium`}
          >
            {age && <span>{age}</span>}
            <span>{iconBarthDay}</span>
          </div>
          {/* Gender */}
          <div
            className={` hidden justify-center items-center text-[#117C99] text-[16px] font-medium`}
          >
            <span></span>
            <span>{iconGender}</span>
          </div>
        </div>
      </div>
      <div className="mt-[50px]">
        <img
          className={`w-[71px] h-[81px] rounded-[8px] `}
          src={avatar}
          alt={`${firstName}-${lastName}`}
        />
      </div>
    </div>
  );
}

export default UserInformation;
