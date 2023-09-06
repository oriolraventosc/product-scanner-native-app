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
  password: "",
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
    update: (initialState, action: PayloadAction<UserState>) => ({
      ...initialState,
      ...action.payload,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const {
  login: loginActionCreator,
  logout: logoutActionCreator,
  update: updateActionCreator,
} = userSlice.actions;
