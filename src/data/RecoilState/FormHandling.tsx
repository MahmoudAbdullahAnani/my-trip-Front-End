import { atom } from "recoil";

const textSearch = atom({
  key: "textSearch", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const destinationSearch = atom({
  key: "destinationSearch", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export { textSearch, destinationSearch };
