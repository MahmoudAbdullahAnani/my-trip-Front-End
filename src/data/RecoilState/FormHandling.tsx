import { atom } from "recoil";

const textSearch = atom({
  key: "textSearch", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const destinationSearch = atom({
  key: "destinationSearch", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const dateGo = atom({
  key: "dateGo", // unique ID (with respect to other atoms/selectors)
  default: "" as string | number | undefined | readonly string[], // default value (aka initial value)
});
const dateReturn = atom({
  key: "dateReturn", // unique ID (with respect to other atoms/selectors)
  default: "" as string | number | undefined | readonly string[], // default value (aka initial value) new Date() as Date | undefined
});



const typeTravel = atom({
  key: "typeTravel", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
const dateSearchOrigin = atom({
  key: "dateSearchOrigin", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
const dateSearchDestination = atom({
  key: "dateSearchDestination", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const typeSystem = atom({
  key: "typeSystem", // unique ID (with respect to other atoms/selectors)
  default: "air", // default value (aka initial value)
});

export {
  textSearch,
  destinationSearch,
  dateGo,
  dateReturn,
  typeTravel,
  dateSearchOrigin,
  dateSearchDestination,
  typeSystem,
};
