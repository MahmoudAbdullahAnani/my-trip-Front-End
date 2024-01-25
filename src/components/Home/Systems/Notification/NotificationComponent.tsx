// State Management
import { useRecoilState } from "recoil";
import { allNotifications } from "../../../../data/RecoilState/Notifications/NotificationsData";

function NotificationComponent() {
  const [allNotificationsState] = useRecoilState(allNotifications);
  console.log("allNotificationsState===> ", allNotificationsState);
  // console.log("publicNotifications===> ", publicNotifications);
  // useEffect(() => {}, [allNotifications]);
  return (
    <div>
      {allNotificationsState.map(({ title }: { title: string }) => (
        <span key={`${title}--${Math.random()}`}>{title}</span>
      ))}
    </div>
  );
}

export default NotificationComponent;
