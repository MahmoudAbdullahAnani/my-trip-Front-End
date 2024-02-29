import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SchemaUser } from "../../pages/Auth/Login";

// export interface CounterState {
//   value: number;
// }

const initialState = {
  password: "",
  age: 0,
  email: "",
  phoneNumber: "",
  userName: "",
  _id: "",
  firstName: "",
  lastName: "",
  role: "",
  avatar: "",

  passportNumber: "",
  country: "",
  nationality: "",
  gender: "",
};

export const isLoggedUser = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    addUserLogged: (state, action: PayloadAction<SchemaUser>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state = action.payload;
      return state;
    },
    userLoggedOut: (state) => {
      state.password = "";
      state.age = 0;
      state.email = "";
      state.phoneNumber = "";
      state.userName = "";
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.role = "";
      state.avatar = "";

      state.passportNumber = "";
      state.country = "";
      state.nationality = "";
      state.gender = "";
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserLogged, userLoggedOut } = isLoggedUser.actions;

export default isLoggedUser.reducer;
