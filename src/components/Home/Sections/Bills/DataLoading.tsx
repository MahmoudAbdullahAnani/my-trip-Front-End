import { atom } from "recoil";

export const DataLoading = atom({
  key: "DataLoading", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
