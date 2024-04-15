import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../data/store";
import axios from "axios";
import {
  Friends,
  ReRebderingFriendsState,
  SearchFriendsState,
} from "../../data/RecoilState/Profile/Friends";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { useTranslation } from "react-i18next";

function SearchUserFriend() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  useEffect(() => {
    if (stateUserData._id === "") {
      navigator("/");
    }
  }, []);
  const [searchFriends, setSearchfriends] = useRecoilState(SearchFriendsState);
  const [valueSearch, setValueSearch] = useState("");

  const [friendsState] = useRecoilState(Friends);
  // console.log(friendsState);

  const searchFriend = async (keyword: string) => {
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
        const IDsFriends = friendsState.map(({ _id }: { _id: string }) => _id);
        const filterFriends = data.data.filter(
          ({ _id }: { _id: string }) =>
            _id !== stateUserData._id && !IDsFriends.includes(_id)
        );

        setSearchfriends({
          friends: filterFriends,
          count: filterFriends.length,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);
  const [reRebderingFriends, setReRebderingFriends] = useRecoilState(
    ReRebderingFriendsState
  );

  const addToFriend = async (_id: string) => {
    const token = localStorage.getItem("token") || "";
    // console.log({ _id });

    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/pending-friends`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/pending-friends`,
        {
          userReceiver: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setReRebderingFriends(!reRebderingFriends);
        setValueSearch("");
        setSearchfriends({ friends: [], count: 0 });
        setReRenderDataApp(!reRenderDataApp);
      })
      .catch((error) => {
        console.log("SearchUserFriend ==> ", error);
      });
  };
  const inputRef = useRef(null);

  // handle lang
  const { t, i18n } = useTranslation();

  return (
    <div className={``}>
      <div className={`flex gap-[10px]`}>
        <div className={`w-full max-w-[548px] relative`}>
          <div className={`w-full max-w-[548px] relative`}>
            <input
              ref={inputRef}
              type="text"
              className={`w-full max-w-[548px] focus-visible:shadow-lg shadow-[#005a6c4d] rounded-[16px] focus-visible:outline-[#117c99b8] text-start ${
                searchFriends.count > 0 ? "rounded-b-none" : ""
              }  text-[#333333] text-[16px] font-medium p-[12px]`}
              placeholder={t("اضافة صديق")}
              onChange={(e) => {
                setValueSearch(e.target.value);
                searchFriend(e.target.value);
              }}
              value={valueSearch}
            />
            <span
              className={`absolute bg-[#117c99b8] text-white ${
                searchFriends.count > 99
                  ? "h-[50px] w-[50px]"
                  : "h-[30px] w-[30px]"
              }  border border-[#117C99] flex justify-center items-center rounded-[50%] top-[50%] ${
                i18n.language === "ar" ? "left-5" : "right-5"
              } translate-x-[-50%] translate-y-[-50%]`}
            >
              {searchFriends.count}
            </span>
          </div>
          <div className={`w-full rounded-b-lg bg-white`}>
            {searchFriends.count === 0 &&
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
            {searchFriends.friends.map(
              ({ _id, avatar, firstName, lastName }) => (
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
                      name="addFriend"
                      className={`text-white h-[48px] w-[48px] flex justify-center items-center rounded-[16px] bg-[#117c99b8] hover:bg-[#117c99e0]`}
                      onClick={() => addToFriend(_id)}
                    >
                      {t("اضافة")}
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

export default SearchUserFriend;
