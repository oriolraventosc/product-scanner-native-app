import {
  loginActionCreator,
  logoutActionCreator,
  updateActionCreator,
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
        favouriteProducts: [],
        name: "example",
        password: "example",
      });
      const expectedState = {
        email: "example@gmail.com",
        accessToken: "12345678910",
        id: "12345678910",
        isLogged: true,
        favouriteProducts: [],
        name: "example",
        password: "example",
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
        name: "",
        favouriteProducts: [],
        password: "example",
      };

      const newState = userReducer(initialState, action);

      expect(newState).toStrictEqual(userInitialState);
    });
  });

  describe("When it is invoked with the method update", () => {
    test("Then it should change the user information", () => {
      const action = updateActionCreator({
        email: "example@gmail.com",

        name: "example name",
      });
      const initialState = {
        email: "example@gmail.com",
        accessToken: "12345678910",
        id: "12345678910",
        isLogged: true,
        name: "",
        favouriteProducts: [],
        password: "example",
      };
      const expectedState = {
        email: "example@gmail.com",
        accessToken: "12345678910",
        id: "12345678910",
        isLogged: true,
        favouriteProducts: [],
        name: "example name",
        password: "example",
      };

      const newState = userReducer(initialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
