import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  loading: boolean;
  modal: boolean;
  modalText: string;
}

export const UiInitialState: UiState = {
  loading: false,
  modal: false,
  modalText: "",
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
    openModal: (initialState, action: PayloadAction<string>) => ({
      ...initialState,
      modal: true,
      modalText: action.payload,
    }),
    closeModal: (initialState) => ({
      ...initialState,
      modal: false,
      modalText: "",
    }),
  },
});

export const uiActionsReducer = UiSlice.reducer;

export const {
  openLoading: openLoadingActionCreator,
  closeLoading: closeLoadingActionCreator,
  openModal: openModalActionCreator,
  closeModal: closeModalActionCreator,
} = UiSlice.actions;
