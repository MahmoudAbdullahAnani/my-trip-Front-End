import { atom } from "recoil";

const TicketId = atom({
  key: "TicketId", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
const NameBooking = atom({
  key: "NameBooking", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export { TicketId, NameBooking };
