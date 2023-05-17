import {
  loginActionCreator,
  logoutActionCreator,
  userInitialState,
  userReducer,
} from "./userSlice";

describe("Given a userReducer", () => {
  describe("When it is invoked with the method login", () => {
    test("Then it should change the property isLogged to true", () => {
      const action = loginActionCreator({
        email: "example@gmail.com",
        accessToken: "12345678910",
        id: "12345678910",
      });
      const expectedState = {
        email: "example@gmail.com",
        accessToken: "12345678910",
        id: "12345678910",
        isLogged: true,
      };

      const newState = userReducer(userInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method logout", () => {
    test("Then it should change the property isLogged from true to false", () => {
      const action = logoutActionCreator();
      const initialState = {
        email: "example@gmail.com",
        accessToken: "12345678910",
        id: "12345678910",
        isLogged: true,
      };

      const newState = userReducer(initialState, action);

      expect(newState).toStrictEqual(userInitialState);
    });
  });
});
