import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
    ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}?userIdDB=${localStorage.getItem(
        "userIdDB"
      )}`
    : `${
        import.meta.env.VITE_PUBLIC_API_PRODUCTION
      }?userIdDB=${localStorage.getItem("userIdDB")}`
);
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
