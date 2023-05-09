import {
  ProductInitialState,
  ProductReducer,
  loadProductInformationActionCreator,
  loadProductsActionCreator,
} from "./productSlice";
import { productMock } from "../../../mocks/productMock";

describe("Given a Product reducer", () => {
  describe("When it is invoked with the method loadProducts", () => {
    test("Then it should return a list of products", () => {
      const action = loadProductsActionCreator([productMock]);
      const expectedState = {
        product: {
          name: "",
          image: "",
          ingredients: "",
          description: "",
          brand: [""],
          weight: 0,
          benefits: [""],
          ean: "",
          status: "",
          sideEffects: "",
          howToUse: "",
        },
        myProducts: [productMock],
      };

      const newState = ProductReducer(ProductInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method loadProduct", () => {
    test("Then it should return an object with 'Tomato sauce' product data", () => {
      const action = loadProductInformationActionCreator(productMock);
      const expectedState = {
        product: productMock,
        myProducts: [],
      };

      const newState = ProductReducer(ProductInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
