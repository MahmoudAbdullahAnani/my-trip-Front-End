import { atom } from "recoil";

const originSearch = atom({
  key: "originSearch", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const destinationSearch = atom({
  key: "destinationSearch", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

// ================================
const fromSwitchData = atom({
  key: "fromSwitchData", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const toSwitchData = atom({
  key: "toSwitchData", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

// =================================================
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
  default: "oneWay", // roundTrip, oneWay, hyper
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
  originSearch,
  destinationSearch,
  dateGo,
  dateReturn,
  typeTravel,
  dateSearchOrigin,
  dateSearchDestination,
  typeSystem,
  fromSwitchData,
  toSwitchData,
};
