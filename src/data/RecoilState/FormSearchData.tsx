import { atom } from "recoil";

// Adults
const adultsData = atom({
  key: "adults",
  default: 1,
});

// Youths
const youthsData = atom({
  key: "youthsData",
  default: 0,
});
// Children
const childrenData = atom({
  key: "childrenData",
  default: 0,
});
// LevelTravel
const levelTravelData = atom({
  key: "levelTravelData",
  default: "economy",
});

export { adultsData, youthsData, childrenData, levelTravelData };
