import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, UserUpdateInformation } from "../../../types/types";
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
    login: (state, action: PayloadAction<UserLoginData>) => {
      return {
        ...state,
        ...action.payload,
        isLogged: true,
      };
    },
    logout: () => {
      return { ...userInitialState };
    },
    update: (state, action: PayloadAction<UserUpdateInformation>) => {
      return {
        ...state,
        isLogged: true,
        name: action.payload.name,
        email: action.payload.email,
      };
    },
  },
});

export const userReducer = userSlice.reducer;

export const {
  login: loginActionCreator,
  logout: logoutActionCreator,
  update: updateActionCreator,
} = userSlice.actions;
