import { atom } from "recoil";

export const openLoginPageState = atom({
  key: "openLoginPageState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const openSignupPageState = atom({
  key: "openSignupPageState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Password
export const showPassword = atom({
  key: "showPassword", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const openForgotPasswordPageState = atom({
  key: "openForgotPasswordPageState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});