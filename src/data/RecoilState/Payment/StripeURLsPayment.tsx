import { atom } from "recoil";

export const URLsPayment = atom({
  key: "URLsPayment", // unique ID (with respect to other atoms/selectors)
  default: {
    PayPal: "",
    ApplePay: "",
    Visa: "",
    MasterCard: "",
    fawry: "",
  }, // default value (aka initial value)
});
export const URLPayment = atom({
  key: "URLPayment", // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
