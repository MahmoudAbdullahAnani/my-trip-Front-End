import { atom } from "recoil";

const publicNotifications = atom({
  key: "publicNotifications", // unique ID (with respect to other atoms/selectors)
  default: [] as { title: string }[], // default value (aka initial value)
});
const privateNotifications = atom({
  key: "privateNotifications", // unique ID (with respect to other atoms/selectors)
  default: [] as { title: string }[], // default value (aka initial value)
});
const allNotifications = atom({
  key: "allNotifications", // unique ID (with respect to other atoms/selectors)
  default: [] as { title: string }[], // default value (aka initial value)
});
const reRenderData = atom({
  key: "reRenderData", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
export {
  publicNotifications,
  privateNotifications,
  allNotifications,
  reRenderData,
};
