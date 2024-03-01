import { useRecoilState } from "recoil";
import {
  PendingFriends,
  ReRebderingFriendsState,
} from "../../data/RecoilState/Profile/Friends";
import notFoundUsers from "/public/assets/profile/notFoundUsers.png";
import { RootState } from "../../data/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import axios from "axios";
import TicketLoading from "../loder/TicketLoading";
import CardPendingFriend from "./CardPendingFriend";

export interface IFriends {
  _id: string;
  firstName: string;
  lastName: string;
  friends: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  }[];
  avatar?: string;
}
function ContainerPendingFriends() {
  const [pendingFriendsState, setPendingFriendsState] =
    useRecoilState(PendingFriends);
  // console.log(pendingFriendsState);

  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // console.log(stateUserData);
  const navigator = useNavigate();

  const [reRenderDataApp, setReRenderDataApp] = useRecoilState(reRenderData);
  const [reRebderingFriends] = useRecoilState(ReRebderingFriendsState);
  const [loading, setLoading] = useState(false);

  const getFriends = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/pending-friends`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/pending-friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        // console.log("friends ==>", res.data);
        setPendingFriendsState(res?.data.pendingFriends);
        setReRenderDataApp(!reRenderDataApp);
      })
      .catch((err) => {
        setLoading(false);
        // setErrorGender(err);
        console.log("Gender ===> ", err);
      });
  };

  useEffect(() => {
    if (stateUserData._id === "") {
      navigator("/");
    }
    getFriends();
  }, [reRebderingFriends]);

  if (loading) {
    return (
      <div className={`my-[50px]`}>
        <TicketLoading />
      </div>
    );
  }

  if (pendingFriendsState.length <= 0) {
    return (
      <div className={`flex flex-col gap-[20px] mt-[80px]`}>
        <h2 className={`text-[#000000] text-[32px] font-bold text-center`}>
          لا يوجد طلبات صداقة حالياً
        </h2>
        <div className={`flex justify-center items-center`}>
          <img
            className={`w-[236px] h-[277px]`}
            src={notFoundUsers}
            width={100}
            height={100}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-1 gap-[40px] lg:grid-cols-3`}>
      {pendingFriendsState.map((items: IFriends) => (
        <CardPendingFriend key={`${items._id}-${Math.random()}`} {...items} />
      ))}
    </div>
  );
}

export default ContainerPendingFriends;
