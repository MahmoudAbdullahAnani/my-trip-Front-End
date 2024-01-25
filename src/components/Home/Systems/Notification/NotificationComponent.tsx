// State Management
// import { useRecoilState } from "recoil";
// import { allNotifications } from "../../../../data/RecoilState/Notifications/NotificationsData";
import { iconNotifications } from "../../../../assets/icons/home";

function NotificationComponent() {
  // const [allNotificationsState] = useRecoilState(allNotifications);
  // console.log("allNotificationsState===> ", allNotificationsState);

  return (
    <div>
      {/* {allNotificationsState.map(({ title }: { title: string }) => (
        <span key={`${title}--${Math.random()}`}>{title}</span>
      ))} */}
      {iconNotifications}
    </div>
  );
}

export default NotificationComponent;
