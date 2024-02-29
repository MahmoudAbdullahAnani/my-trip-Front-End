import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../data/store";

function SearchUserFriend() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  useEffect(() => {
    if (stateUserData._id === "") {
      navigator("/");
    }
  }, []);
  return (
    <div className={``}>
      <div className={`flex gap-[10px]`}>
        <input
          type="text"
          className={`w-full max-w-[548px] focus-visible:shadow-lg shadow-[#005a6c4d] focus-visible:outline-[#117c99b8] text-start rounded-[16px] text-[#333333] text-[16px] font-medium p-[12px]`}
          placeholder="اضافة صديق"
        />
        <button
          className={`text-[#FFFFFF] bg-[#117C99] hover:bg-[#117c99b8] duration-200 rounded-[16px] h-[48px] p-[10px]`}
        
        >
          بحث
        </button>
      </div>
    </div>
  );
}

export default SearchUserFriend;
