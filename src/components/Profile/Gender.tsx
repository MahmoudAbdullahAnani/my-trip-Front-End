import axios from "axios";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";

interface TypeComponent {
  data: {
    gender: string;
  };
  topTitleStyle?: string;
  titleStyle?: string;
  iconStyle?: JSX.Element;
}

function Gender({ data, iconStyle }: TypeComponent) {
  const { gender } = data;
  const [, setGenderEdit] = useState(true);
  const genderRef = useRef(null);
  const [genderChange, setGenderChange] = useState(gender);
  const [errorGender, setErrorGender] = useState("");
  const [toggleSave, setToggleSave] = useState(true);
  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const updateGender = async () => {
    const token = localStorage.getItem("token") || "";

    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/me`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/me`,
        {
          gender: genderChange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setReRenderDataApp(!reRenderDataApp))
      .catch((err) => {
        // setErrorGender(err);
        console.log("Gender ===> ", err);
      });
  };
  return (
    <div className={`w-full mt-[24px]`} dir="rtl">
      <div
        className={`flex flex-nowrap items-end justify-start gap-[10px] w-full`}
      >
        <div className="w-full max-w-[448px] ">
          <div className="w-full  flex flex-col gap-[5px]">
            <h5 className={`text-[#000000] text-[16px] font-medium`}>النوع</h5>
            <select
              style={{
                boxShadow: "0 4px 4px #005a6c4d",
              }}
              disabled={toggleSave}
              ref={genderRef}
              dir="rtl"
              id="nationality"
              className={` h-[42px] px-[12px] py-[9px] rounded-[8px]`}
              onChange={(e) => setGenderChange(e.target.value)}
            >
              <option value={gender || ""}>
                {gender === "male"
                  ? "ذكر"
                  : gender === "female"
                  ? "أنثى"
                  : "اختر"}
              </option>
              {gender !== "male" && <option value={"male"}>ذكر</option>}
              {gender !== "female" && <option value={"female"}>أنثى</option>}
            </select>
            {errorGender && (
              <span className={`text-red-500 text-[12px]`}>{errorGender}</span>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setErrorGender("");
            setToggleSave(!toggleSave);
            if (toggleSave) {
              return setGenderEdit(false);
            }

            setGenderEdit(false);
            return updateGender();
          }}
          className="rounded-[16px] w-[48px] h-[48px] bg-[#ffffff99] hover:bg-[#ffffff2c] duration-200"
        >
          {/* passportBeforeChange === `${firstName} ${lastName}` || */}
          {toggleSave ? iconStyle : "حفظ"}
        </button>
      </div>
    </div>
  );
}

export default Gender;
