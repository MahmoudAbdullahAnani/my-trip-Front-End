import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SchemaUser } from "../../pages/Login";

// export interface CounterState {
//   value: number;
// }

const initialState: SchemaUser = {
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
};

export const isLoggedUser = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    addUserLogged: (state, action: PayloadAction<SchemaUser>) => {
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
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserLogged, userLoggedOut } = isLoggedUser.actions;

export default isLoggedUser.reducer;
