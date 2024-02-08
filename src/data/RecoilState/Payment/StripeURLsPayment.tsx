import { atom } from "recoil";

export const URLsPayment = atom({
  key: "URLsPayment", // unique ID (with respect to other atoms/selectors)
  default: {
    PayPal: "",
    ApplePay: "",
    Visa: "",
    MasterCard: "",
  }, // default value (aka initial value)
});
