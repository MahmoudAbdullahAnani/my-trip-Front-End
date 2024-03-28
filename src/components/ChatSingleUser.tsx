import { useEffect } from "react";
import { MessageStore } from "../data/RecoilState/Chat/Message";
import { useRecoilState } from "recoil";

interface data {
  firstName: string;
  lastName: string;
  email: string;
  chatSocketId: string;
  avatar: string;
  userId: string;
  messages: [];
}
interface Message {
  firstName: string;
  lastName: string;
  email: string;
  chatSocketId: string;
  avatar?: string;
  message: {
    message: {
      SenderNumber: string;
      message: string;
    };
    client: string;
    userId: string;
  };
}

function ChatSingleUser({
  // messages,
  avatar,
  // chatSocketId,
  email,
  firstName,
  lastName,
  // userId,
}: data) {
  // console.log(messages, avatar, chatSocketId, email, firstName, lastName);

  // console.log(userId);
  const [messagesState] = useRecoilState(MessageStore);

  useEffect(() => {}, [messagesState]);
  // console.log(messagesState, "messagesState");
  // const messageData = messagesState.filter(
  //   (message) =>
  //     message.message.userId === userId &&
  //     message.message.userId !== localStorage.getItem("userIdDB")
  // );
  // console.log(messageData);

  return (
    <>
      <div className={`flex items-center justify-start gap-2 my-2`}>
        <img
          src={
            avatar || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          }
          width={48}
          height={48}
          alt={`${firstName}-${lastName}`}
        />
        <div className={`flex flex-col items-start text-sm`}>
          <div className={`flex w-full justify-between`}>
            <h3>
              {firstName} {lastName}
            </h3>
          </div>
          <p className={`text-slate-500`}>{email}</p>
        </div>
      </div>
      <div>
        <div>
          {messagesState.map((message: Message) => (
            <div key={`--${Math.random()}--${Math.random()}`}>
              <p>{message.message.message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChatSingleUser;
