import axios from "axios";
import { iconDelete } from "../../assets/icons/home";
import { IFriends } from "./ContainerFriends";
import { useRecoilState } from "recoil";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { Bounce, toast } from "react-toastify";
import { ReRebderingFriendsState } from "../../data/RecoilState/Profile/Friends";

function CardPendingFriend({ _id, firstName, avatar, lastName }: IFriends) {
  // console.log({ _id, firstName, friends, avatar, lastName });

  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);

  const [reRebderingFriends, setReRebderingFriendsState] = useRecoilState(
    ReRebderingFriendsState
  );

  const filterPendingFriend = async (o: "yes" | "no") => {
    const token = localStorage.getItem("token") || "";
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/pending-friends/${_id}/${o}`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/pending-friends/${_id}/${o}`,
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
        if (o === "no") {
          toast.success("تم الحذف", {
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
        } else {
          toast.success("انتم الان اصدقاء", {
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
        }
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
            avatar ||
            "https://media.licdn.com/dms/image/D4D03AQHzjiCnOspqrg/profile-displayphoto-shrink_200_200/0/1703883364099?e=1714608000&v=beta&t=d8izU1BFQ91iHgqrzE_YUzT9lCVE1ADtI4f8TF1F93A"
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
        <div className={`flex gap-[10px]`}>
          <button
            className={`h-[48px] w-[48px] flex justify-center items-center rounded-[16px] bg-[#FCDAD1] hover:bg-[#f4beb0b0]`}
            onClick={() => filterPendingFriend("no")}
          >
            {iconDelete}
          </button>
          <button
            className={`h-[48px] text-white w-[48px] flex justify-center items-center rounded-[16px] bg-[#117C99] hover:bg-[#117c99b8]`}
            onClick={() => filterPendingFriend("yes")}
          >
            قبول
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPendingFriend;
