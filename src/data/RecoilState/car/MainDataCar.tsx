import { atom } from "recoil";

// CityNameCars
export const CityNameCars = atom({
  key: "CityNameCars",
  default: "",
});
// CountryNameCars
export const CountryNameCars = atom({
  key: "CountryNameCars",
  default: "",
});
// AgeCars
export const AgeCars = atom({
  key: "AgeCars",
  default: 0,
});
// GeoLocation

export const GeoLocation = atom({
  key: "GeoLocation",
  default: {
    lat: 0,
    long: 0,
  },
});
