import { atom } from "recoil";

const TypeSystemSearch = atom({
  key: "TypeSystemSearch", // unique ID (with respect to other atoms/selectors)
  default: "airline", // default value (aka initial value)
});
export { TypeSystemSearch };
