import axios from "axios";
import { iconDelete } from "../../assets/icons/home";
import { IFriends } from "./ContainerFriends";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { Bounce, toast } from "react-toastify";
import { ReRebderingFriendsState } from "../../data/RecoilState/Profile/Friends";

function CardFriend({ _id, firstName, avatar, lastName }: IFriends) {
  // console.log({ _id, firstName, friends, avatar, lastName });

  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const [reRebderingFriends, setReRebderingFriendsState] = useRecoilState(
    ReRebderingFriendsState
  );

  const deleteFriend = async () => {
    const token = localStorage.getItem("token") || "";
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/friends/${_id}/delete`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/friends/${_id}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async () => {
        setReRenderDataApp(!reRenderDataApp);
        setReRebderingFriendsState(!reRebderingFriends);
        return toast.success("تم الحذف", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      key={_id}
      className={`flex gap-[17px] bg-[#FFFFFF] rounded-[16px] justify-between items-center p-5`}
    >
      <div className={`w-[20%] `}>
        <img
          src={
            avatar || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          }
          className={`rounded-[50%]`}
          width={100}
          height={100}
          alt={`${firstName}-${lastName}`}
        />
      </div>
      <div className={`flex gap-[17px] items-center justify-between flex-1`}>
        <h4>
          {`${firstName} ${lastName}`.length > 25
            ? `${firstName} ${lastName}`.slice(0, 25) + "..."
            : `${firstName} ${lastName}`}
        </h4>
        <button
          name="delete"
          className={`h-[48px] w-[48px] flex justify-center items-center rounded-[16px] bg-[#FCDAD1] hover:bg-[#f4beb0b0]`}
          onClick={deleteFriend}
        >
          {iconDelete}
        </button>
      </div>
    </div>
  );
}

export default CardFriend;
