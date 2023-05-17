import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../../types/types";
import { UserLoginData } from "../../../types/types";

export const userInitialState: UserState = {
  id: "",
  accessToken: "",
  email: "",
  name: "",
  isLogged: false,
  favouriteProducts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    login: (initialState, action: PayloadAction<UserLoginData>) => ({
      ...initialState,
      ...action.payload,
      isLogged: true,
    }),
    logout: () => ({
      ...userInitialState,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const { login: loginActionCreator, logout: logoutActionCreator } =
  userSlice.actions;
