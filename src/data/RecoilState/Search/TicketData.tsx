import { atom } from "recoil";
// Interface Data
import { FlightOffer } from "../../../interface/MainData";

const TicketId = atom({
  key: "TicketId", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const TicketChose = atom({
  key: "TicketChose", // unique ID (with respect to other atoms/selectors)
  default: {} as FlightOffer, // default value (aka initial value)
});
const NameBooking = atom({
  key: "NameBooking", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export { TicketId, NameBooking, TicketChose };
