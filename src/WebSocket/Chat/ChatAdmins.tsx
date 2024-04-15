import ChatIcon from "@mui/icons-material/Chat";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";
// import { WebsocketContext } from "./WebsocketContext";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// type MessagePayload = {
//   SenderNumber: string;
//   message: string;
// };
import { io } from "socket.io-client";
import axios from "axios";
import ChatSingleUser from "../../components/ChatSingleUser";
import { useRecoilState } from "recoil";
import { MessageStore } from "../../data/RecoilState/Chat/Message";

export interface MessageRes {
  client: string;
  message: { message: string; SenderNumber: string };
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  chatSocketId: string;
  avatar: string;
}
export type MessageResArray = {
  firstName: string;
  lastName: string;
  email: string;
  chatSocketId: string;
  avatar: string;
  message: MessageRes;
};
function ChatAdmins() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // const [socket, setSocket] = useState(null);

  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useRecoilState(MessageStore);
  // const socket = useContext(WebsocketContext);
  const getUserData = async (userId: string) => {
    const token = localStorage.getItem("token") || "";
    const dataUser = await axios.get(
      import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
        ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/users/${userId}`
        : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dataUser.data;
  };
  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
        ? `${
            import.meta.env.VITE_PUBLIC_API_LOCAL
          }?userIdDB=${localStorage.getItem("userIdDB")}`
        : `${
            import.meta.env.VITE_PUBLIC_API_PRODUCTION
          }?userIdDB=${localStorage.getItem("userIdDB")}`
    );
    socket.on("connect", () => {
      // console.log("Connected!");
    });
    socket.on("userId", () => {
      // console.log("userId event received!");
      // console.log("User Id==> ", userId);
    });
    socket.on("message", async (message: MessageRes) => {
      // console.log("userId event received!");
      // console.log("message1==> ", message);
      const { avatar, firstName, lastName, email, chatSocketId } =
        await getUserData(message.userId);
      // console.log({ data });

      setMessages((prev) => [
        ...prev,
        { firstName, lastName, email, chatSocketId, avatar, message },
      ]);
    });
    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("message");
    };
  }, []);
  // console.log("chatSocketAdminId==> ", stateUserData.chatSocketAdminId);

  const [borderValidation, setBorderValidation] = useState("0");
  const inputRef = useRef<HTMLInputElement>(null);
  const [singleUserMessage, setSingleUserMessage] = useState({});
  // console.log(singleUserMessage);

  const [singleUserMessageView, setSingleUserMessageView] = useState(false);
  const onSubmit = async () => {
    if (value === "") {
      setBorderValidation("2");
      inputRef.current?.focus();
      return;
    }
    const socket = io(
      import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
        ? `${
            import.meta.env.VITE_PUBLIC_API_LOCAL
          }?userIdDB=${localStorage.getItem("userIdDB")}`
        : `${
            import.meta.env.VITE_PUBLIC_API_PRODUCTION
          }?userIdDB=${localStorage.getItem("userIdDB")}`
    );
    socket.on("message", async (message: MessageRes) => {
      console.log("message.client==>", message);
      const { avatar, firstName, lastName, email, chatSocketId } =
        await getUserData(message.userId);
      // console.log({ data });

      setMessages((prev) => [
        ...prev,
        { firstName, lastName, email, chatSocketId, avatar, message },
      ]);
      return message.client;
    });

    // socket.emit("message", {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   SenderNumber: stateUserData.chatSocketAdminId,
    //   message: value,
    // });

    socket.emit("message", {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      SenderNumber: singleUserMessage.chatSocketId,
      message: value,
    });

    console.log("p2");

    setValue("");
  };
  // console.log({messages});

  // Lang
  const { t } = useTranslation();

  const uniqueData = {};
  messages.forEach((item: MessageResArray) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const key = item.message.userId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!uniqueData[key]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uniqueData[key] = item;
    }
  });

  const uniqueArray = Object.values(uniqueData) as MessageResArray[];
  const messageData = uniqueArray.filter(
    (message) => message.message.userId !== localStorage.getItem("userIdDB")
  );
  return (
    <form
      className={`fixed bottom-12 right-5 z-50 flex flex-col no-scrollbar p-3 ${
        !toggle && "items-center"
      }`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {toggle && (
        <>
          <div
            className={`shadow-lg border border-b-0 border-[#117c99c7] w-[300px] bg-white  p-3 sm:h-[400px] h-[200px]  rounded-t-lg overflow-y-auto no-scrollbar`}
          >
            <div
              className={`w-full flex items-center justify-${
                singleUserMessageView ? "around" : "center"
              } text-white font-semibold h-[48px] no-scrollbar bg-[#117c99c7] rounded-t-lg`}
            >
              {singleUserMessageView && (
                <div
                  onClick={() =>
                    setSingleUserMessageView(!singleUserMessageView)
                  }
                  className={` p-2 bg-[#1f4d5a42] hover:bg-[#1f4d5a89]  rounded-lg `}
                >
                  <ArrowBackIcon />
                </div>
              )}
              <div>{t("تواصل معنا الان")}</div>
            </div>
            {singleUserMessageView ? (
              <div>
                {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                // @ts-ignore */}
                <ChatSingleUser {...singleUserMessage} />
              </div>
            ) : (
              <div>
                {messageData.length === 0 ? (
                  <div>{t("لا توجد رسائل")}</div>
                ) : (
                  <>
                    <div className="overflow-hidden">
                      {messageData.map(
                        ({
                          chatSocketId,
                          email,
                          firstName,
                          lastName,
                          message,
                          avatar,
                        }) => {
                          return (
                            <button
                              name="message"
                              onClick={() => {
                                setSingleUserMessage({
                                  chatSocketId,
                                  email,
                                  firstName,
                                  lastName,
                                  messages,
                                  avatar,
                                  userId: message.userId,
                                });
                                setSingleUserMessageView(
                                  !singleUserMessageView
                                );
                              }}
                              className={`flex p-2 overflow-hidden items-center justify-start gap-3 bg-slate-200 w-full my-2 rounded-lg`}
                              key={`${chatSocketId}---${message.userId}`}
                            >
                              <img
                                src={
                                  avatar ||
                                  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                                }
                                width={48}
                                height={48}
                                alt={`${firstName}-${lastName}`}
                              />
                              <div
                                className={`flex flex-col items-start text-sm`}
                              >
                                <div className={`flex w-full justify-between`}>
                                  <h3>
                                    {firstName} {lastName}
                                  </h3>
                                  <p>
                                    {message.message.message.slice(0, 20)}...
                                  </p>
                                </div>
                                <p className={`text-slate-500`}>{email}</p>
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {singleUserMessageView && (
            <div
              className={`border shadow-lg border-y-0 border-[#117c99c7] flex items-center justify-center gap-3 p-2 relative bg-white bottom-0`}
            >
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setBorderValidation("0");
                }}
                className={`bg-[#117c994d] border-${borderValidation} border-red-400 focus-visible:outline-none w-[200px] p-2 rounded-lg`}
              />
              <button
                name="send"
                type="submit"
                onClick={onSubmit}
                className={`text-[#117c99ee] hover:text-[#117c99c5] p-2 rounded-lg bg-[#117c9920] hover:bg-[#117c994d] `}
              >
                <SendIcon />
              </button>
            </div>
          )}
        </>
      )}
      <button
        name="toggle"
        onClick={() => {
          if (stateUserData._id !== "") {
            setToggle(!toggle);
          }
        }}
        className={`text-white bg-[#117C99] p-2  ${
          toggle ? "rounded-b-full" : "rounded-full"
        }`}
      >
        <ChatIcon />
      </button>
    </form>
  );
}

export default ChatAdmins;
