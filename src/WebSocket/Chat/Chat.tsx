import ChatIcon from "@mui/icons-material/Chat";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";
// import { WebsocketContext } from "./WebsocketContext";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
// type MessagePayload = {
//   SenderNumber: string;
//   message: string;
// };
import { io } from "socket.io-client";
import { arabic_letters } from "../../components/Home/Systems/Notification/NotificationComponent";

interface MessageRes {
  client: string;
  message: { message: string; SenderNumber: string };
  userId: string;
}
function Chat() {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  // const [socket, setSocket] = useState(null);

  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  // const socket = useContext(WebsocketContext);

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
    socket.on("message", (message: MessageRes) => {
      // console.log("userId event received!");
      console.log("message1==> ", message);

      setMessages((prev) => [...prev, message.message.message]);
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
    let clientId = "";
    socket.on("message", (message: MessageRes) => {
      clientId = message.client;
      console.log("message.client==>", message.client);

      setMessages((prev) => [...prev, message.message.message]);
      return message.client;
    });

    socket.emit("message", {});
    // await new Promise<void>((resolve) => {
    //   setTimeout(async () => {
    //     await console.log("p1");
    //     await console.log("clientId==> ", clientId);
    //     resolve();
    //   }, 2000);
    // });
    console.log("clientId===> ", clientId);

    socket.emit("message", {
      SenderNumber:
        stateUserData.role === "user"
          ? stateUserData.chatSocketAdminId
          : clientId,
      message: value,
    });

    setValue("");
  };
  // Lang
  const { t } = useTranslation();
  // console.log(messages);

  return (
    <form
      className={`fixed bottom-12 right-5 z-50 flex flex-col p-3 ${
        !toggle && "items-center"
      }`}
    >
      {toggle && (
        <>
          <div
            className={`shadow-lg border border-b-0 border-[#117c99c7] w-[300px] bg-white p-3 sm:h-[400px] h-[200px] rounded-t-lg overflow-y-auto no-scrollbar`}
          >
            <div
              className={`fixed w-[276px] flex items-center justify-center text-white font-semibold h-[48px] bg-[#117c99c7] rounded-t-lg`}
            >
              {t("تواصل معنا الان")}
            </div>
            <div className={`mt-[48px]`}>
              {messages.length === 0 ? (
                <div>{t("لا توجد رسائل")}</div>
              ) : (
                <div>
                  {messages.map((msg) => (
                    <div key={`--${Math.random()}--${Math.random()}`}>
                      <p
                        className={`text-${
                          arabic_letters.includes(
                            msg === undefined ? "" : msg[0]
                          )
                            ? "end"
                            : "start"
                        }`}
                      >
                        {msg}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
              onClick={onSubmit}
              className={`text-[#117c99ee] hover:text-[#117c99c5] p-2 rounded-lg bg-[#117c9920] hover:bg-[#117c994d] `}
            >
              <SendIcon />
            </button>
          </div>
        </>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (stateUserData._id !== "") {
            setToggle(!toggle);
          }
        }}
        className={`shadow-xl text-white bg-[#117C99] p-2  ${
          toggle ? "rounded-b-full" : "rounded-full"
        }`}
        type="button"
      >
        <ChatIcon />
      </button>
    </form>
  );
}

export default Chat;
