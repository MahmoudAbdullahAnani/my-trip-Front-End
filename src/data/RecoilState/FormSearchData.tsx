import { atom } from "recoil";

// Adults
const adultsData = atom({
  key: "adults",
  default: 1,
});
// Studentsover
const studentsoverData = atom({
  key: "studentsoverData",
  default: 0,
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

export { adultsData, studentsoverData, youthsData, childrenData };
