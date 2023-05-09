import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  loading: boolean;
}

export const UiInitialState: UiState = {
  loading: false,
};

const UiSlice = createSlice({
  name: "ui",
  initialState: UiInitialState,
  reducers: {
    openLoading: (initialState) => ({
      ...initialState,
      loading: true,
    }),
    closeLoading: (initialState) => ({
      ...initialState,
      loading: false,
    }),
  },
});

export const uiActionsReducer = UiSlice.reducer;

export const {
  openLoading: openLoadingActionCreator,
  closeLoading: closeLoadingActionCreator,
} = UiSlice.actions;
