import { useEffect } from "react";
import { MessageStore } from "../data/RecoilState/Chat/Message";
import { useRecoilState } from "recoil";
import { arabic_letters } from "./Home/Systems/Notification/NotificationComponent";

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
  chatSocketId,
  email,
  firstName,
  lastName,
  userId,
}: data) {
  // console.log(messages, avatar, chatSocketId, email, firstName, lastName);

  // console.log(userId);
  const [messagesState] = useRecoilState(MessageStore);

  useEffect(() => {}, [messagesState]);
  // console.log(messagesState, "messagesState");
  const messageData = messagesState.filter(
    (message) =>
      message.message.message.SenderNumber === chatSocketId ||
      message.message.userId === userId
  );
  // const senderUser = messagesState.filter(
  //   (message) => message.message.message.SenderNumber === chatSocketId
  // );
  // const reciverAdmin = messagesState.filter(
  //   (message) => message.message.userId === userId
  // );
  // console.log(senderUser);

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
          {messageData.map((message: Message) => (
            <div
              key={`--${Math.random()}--${Math.random()}`}
              className={`text-${
                arabic_letters.includes(
                  message.message.message.message === undefined
                    ? ""
                    : message.message.message.message[0]
                )
                  ? "end"
                  : "start"
              }`}
            >
              <div
                className={`flex flex-col gap-1 text-${
                  message.message.userId === userId ? "start" : "end"
                } bg-slate-100 my-1 px-2 py-1 rounded-lg`}
              >
                <div
                  className={`flex justify-${
                    message.message.userId === userId ? "start" : "end"
                  }  items-center gap-2`}
                >
                  {message.message.userId === userId ? (
                    <>
                      <img
                        width={28}
                        height={28}
                        src={message.avatar}
                        className={`rounded-full`}
                        alt={`${message.firstName}-${message.lastName}`}
                      />
                      <h6
                        className={`text-[10px] `}
                      >{`${message.firstName} ${message.lastName}`}</h6>
                    </>
                  ) : (
                    <>
                      <h6
                        className={`text-[10px] `}
                      >{`${message.firstName} ${message.lastName}`}</h6>
                      <img
                        width={28}
                        height={28}
                        src={message.avatar}
                        className={`rounded-full`}
                        alt={`${message.firstName}-${message.lastName}`}
                      />
                    </>
                  )}
                </div>
                <p>{message.message.message.message}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div>
          {senderUser.map((message: Message) => (
            <div
              key={`--${Math.random()}--${Math.random()}`}
              className={`text-${
                arabic_letters.includes(
                  message.message.message.message === undefined
                    ? ""
                    : message.message.message.message[0]
                )
                  ? "end"
                  : "start"
              }`}
            >
              <div
                className={`flex flex-col text-end bg-slate-100 my-1 px-2 py-1 rounded-lg`}
              >
                <div className={`flex justify-end items-center gap-2`}>
                  <h6
                    className={`text-[10px] `}
                  >{`${message.firstName} ${message.lastName}`}</h6>
                  <img
                    width={28}
                    height={28}
                    src={message.avatar}
                    className={`rounded-full`}
                    alt={`${message.firstName}-${message.lastName}`}
                  />
                </div>
                <p>{message.message.message.message}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default ChatSingleUser;
