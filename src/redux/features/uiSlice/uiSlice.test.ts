import {
  UiInitialState,
  closeLoadingActionCreator,
  closeModalActionCreator,
  openLoadingActionCreator,
  openModalActionCreator,
  uiActionsReducer,
} from "./uiSlice";
import { productMock } from "../../../mocks/productMock";

describe("Given a ui reducer", () => {
  describe("When it is invoked with the method openLoading", () => {
    test("Then it should change it's loading property to true", () => {
      const action = openLoadingActionCreator();
      const expectedState = {
        loading: true,
        modal: false,
        modalText: "",
      };

      const newState = uiActionsReducer(UiInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method closeLoading", () => {
    test("Then it should change it's loading property to false", () => {
      const action = closeLoadingActionCreator();
      const initialState = { loading: true, modal: false, modalText: "" };
      const expectedState = {
        loading: false,
        modal: false,
        modalText: "",
      };

      const newState = uiActionsReducer(initialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method openModal", () => {
    test("Then it should change the modal property to true", () => {
      const action = openModalActionCreator("");
      const expectedState = {
        loading: false,
        modal: true,
        modalText: "",
      };

      const newState = uiActionsReducer(UiInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method closeModal", () => {
    test("Then it should change the modal property to false", () => {
      const action = closeModalActionCreator();
      const expectedState = {
        loading: false,
        modal: false,
        modalText: "",
      };

      const newState = uiActionsReducer(UiInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
