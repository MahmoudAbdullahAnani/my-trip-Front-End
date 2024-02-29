import { atom } from "recoil";

export const Friends = atom({
  key: "Friends", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const ReRebderingFriendsState = atom({
  key: "ReRebderingFriendsState", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
