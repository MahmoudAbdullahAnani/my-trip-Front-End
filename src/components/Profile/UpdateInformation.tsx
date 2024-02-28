import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { iconPenEdit } from "../../assets/icons/home";
import UpdateName from "./UpdateName";
import UpdateBarthDay from "./UpdateBarthDay";
import PassportNumber from "./PassportNumber";
import CountryAndNationality from "./CountryAndNationality";

const topTitleStyle = "text-[#231F20] text-[20px] font-bold mb-[10px]";
const titleStyle = "text-[#231F20] text-[16px] font-medium mb-[16px]";
const iconStyle = (
  <div className={` border border-[#FFFFFF] p-[12px] rounded-[16px]`}>
    {iconPenEdit}
  </div>
);
function UpdateInformation() {
  const {
    firstName,
    lastName,
    age,
    passportNumber,
    nationality,
    country,
    // gender,
  } = useSelector((state: RootState) => state.loggedUser);
  const handleAge = age || 0;
  return (
    <div className={`flex justify-between mt-[24px]`}>
      <div
        className={`w-full sm:block hidden max-w-[413px] bg-no-repeat bg-auto bg-[url('/public/assets/profile/catSemLoago.png')]`}
      ></div>
      <div className={`w-full flex flex-col`}>
        {/* Name */}
        <UpdateName
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data={{ firstName, lastName }}
          topTitleStyle={topTitleStyle}
          titleStyle={titleStyle}
          iconStyle={iconStyle}
        />
        <UpdateBarthDay
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data={{ age: handleAge }}
          topTitleStyle={topTitleStyle}
          titleStyle={titleStyle}
          iconStyle={iconStyle}
        />
        <PassportNumber
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data={{ passportNumber }}
          topTitleStyle={topTitleStyle}
          titleStyle={titleStyle}
          iconStyle={iconStyle}
        />
        <CountryAndNationality
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data={{ nationality, country }}
          topTitleStyle={topTitleStyle}
          titleStyle={titleStyle}
          iconStyle={iconStyle}
        />
      </div>
    </div>
  );
}

export default UpdateInformation;
