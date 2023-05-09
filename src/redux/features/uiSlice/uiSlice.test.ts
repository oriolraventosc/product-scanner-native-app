import {
  UiInitialState,
  closeLoadingActionCreator,
  openLoadingActionCreator,
  uiActionsReducer,
} from "./uiSlice";
import { productMock } from "../../../mocks/productMock";

describe("Given a ui reducer", () => {
  describe("When it is invoked with the method openLoading", () => {
    test("Then it should change it's loading property to true", () => {
      const action = openLoadingActionCreator();
      const expectedState = {
        loading: true,
      };

      const newState = uiActionsReducer(UiInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method closeLoading", () => {
    test("Then it should change it's loading property to false", () => {
      const action = closeLoadingActionCreator();
      const initialState = { loading: true };
      const expectedState = {
        loading: false,
      };

      const newState = uiActionsReducer(initialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
