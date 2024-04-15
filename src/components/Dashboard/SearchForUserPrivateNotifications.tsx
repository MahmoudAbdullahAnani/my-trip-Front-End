import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { RootState } from "../../data/store";
import { SearchUsers } from "../../data/RecoilState/Profile/Friends";
import { DataOfUserSearchPrivateNotifications } from "../../data/RecoilState/Notifications/NotificationsData";

function SearchForUserPrivateNotifications() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  useEffect(() => {
    if (stateUserData._id === "") {
      navigator("/");
    }
  }, []);
  const [searchUsersState, setSearchUsersState] = useRecoilState(SearchUsers);
  const [, setDataOfUserSearchPrivateNotificationsState] = useRecoilState(
    DataOfUserSearchPrivateNotifications
  );
  const [valueSearch, setValueSearch] = useState("");

  const searchUsers = async (keyword: string) => {
    const token = localStorage.getItem("token") || "";
    if (keyword === "") {
      return false;
    }
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/search-friends/${keyword}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/search-friends/${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setSearchUsersState(data.data);
      })
      .catch((error) => {
        console.log("Search Users Dashboard==> ", error);
      });
  };

  const addToUpdatePrivateNotifications = (
    _id: string,
    avatar: string,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    notification: []
  ) => {
    setSearchUsersState([]);
    setValueSearch("");
    const dataOfUserChoose = {
      _id,
      avatar,
      firstName,
      lastName,
      notification,
      age,
      email,
    };
    setDataOfUserSearchPrivateNotificationsState(dataOfUserChoose);
  };

  const inputRef = useRef(null);

  // handle lang
  const { t, i18n } = useTranslation();

  return (
    <div className={`my-2`}>
      <div className={`flex gap-[10px]`}>
        <div className={`w-full max-w-[548px] relative`}>
          <div className={`w-full max-w-[548px] relative`}>
            <input
              ref={inputRef}
              type="text"
              className={`text-center w-full max-w-[548px] focus-visible:shadow-lg border mx-auto shadow-[#005a6c4d] rounded-[16px] focus-visible:outline-[#117c99b8] ${
                searchUsersState.length > 0 ? "rounded-b-none" : ""
              }  text-[#333333] text-[16px] font-medium p-[12px]`}
              placeholder={t("اختر المستخدم")}
              onChange={(e) => {
                setValueSearch(e.target.value);
                searchUsers(e.target.value);
              }}
              value={valueSearch}
            />
            <span
              className={`absolute bg-[#117c99b8] text-white ${
                searchUsersState.length > 99
                  ? "h-[50px] w-[50px]"
                  : "h-[30px] w-[30px]"
              }  border border-[#117C99] flex justify-center items-center rounded-[50%] top-[50%] ${
                i18n.language === "ar" ? "left-5" : "right-5"
              } translate-x-[-50%] translate-y-[-50%]`}
            >
              {searchUsersState.length}
            </span>
          </div>
          <div className={`w-full rounded-b-lg bg-white`}>
            {searchUsersState.length === 0 &&
            valueSearch !== "" &&
            document.activeElement === inputRef.current ? (
              <div>
                <p
                  className={`text-center text-[#333333] text-[16px] font-medium p-5 relative button-5`}
                >
                  {t("لا يوجد نتائج")}
                </p>
              </div>
            ) : null}
            {searchUsersState.map(
              ({
                _id,
                avatar,
                firstName,
                lastName,
                notification,
                email,
                age,
              }) => (
                <div
                  key={`${_id}-${Math.random()}`}
                  className={`flex gap-[17px] bg-[#FFFFFF] rounded-[16px] justify-between items-center p-5`}
                >
                  <div className={`w-[20%] `}>
                    <img
                      src={
                        avatar ||
                        "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                      }
                      className={`rounded-[50%]`}
                      width={100}
                      height={100}
                      alt={`${firstName}-${lastName}`}
                    />
                  </div>
                  <div
                    className={`flex gap-[17px] items-center justify-between flex-1`}
                  >
                    <h4>
                      {`${firstName} ${lastName}`.length > 25
                        ? `${firstName} ${lastName}`.slice(0, 25) + "..."
                        : `${firstName} ${lastName}`}
                    </h4>
                    <button
                      name="addToUpdatePrivateNotifications"
                      className={`text-white h-[48px] w-[48px] flex justify-center items-center rounded-[16px] bg-[#117c99b8] hover:bg-[#117c99e0]`}
                      onClick={() =>
                        addToUpdatePrivateNotifications(
                          _id,
                          avatar,
                          firstName,
                          lastName,
                          email,
                          age,
                          notification
                        )
                      }
                    >
                      {t("اختيار")}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        {/* <button
          className={`text-[#FFFFFF] bg-[#117C99] hover:bg-[#117c99b8] duration-200 rounded-[16px] h-[48px] p-[10px]`}
        
        >
          بحث
        </button> */}
      </div>
    </div>
  );
}

export default SearchForUserPrivateNotifications;
