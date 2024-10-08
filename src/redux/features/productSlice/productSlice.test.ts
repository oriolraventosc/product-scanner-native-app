import {
  ProductInitialState,
  ProductReducer,
  loadFavouriteProductsActionCreator,
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
          keywords: [],
          keywordsWithDescription: [],
        },
        productsList: [productMock],
        myProducts: [],
        productsListLimit: 10,
        myProductsLimit: 10,
        statusProductsLimit: 10,
        statusProductsList: [],
        statusSupplementsList: [],
        status: "",
        statusSupplementsLimit: 10,
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
        productsList: [],
        productsListLimit: 10,
        myProductsLimit: 10,
        statusProductsLimit: 10,
        statusProductsList: [],
        statusSupplementsList: [],
        status: "",
        statusSupplementsLimit: 10,
      };

      const newState = ProductReducer(ProductInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it is invoked with the method loadFavouriteProducts", () => {
    test("Then it should return a list of user favourite products", () => {
      const action = loadFavouriteProductsActionCreator([productMock]);
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
          keywords: [],
          keywordsWithDescription: [],
        },
        myProducts: [productMock],
        productsList: [],
        productsListLimit: 10,
        myProductsLimit: 10,
        statusProductsLimit: 10,
        statusProductsList: [],
        statusSupplementsList: [],
        status: "",
        statusSupplementsLimit: 10,
      };

      const newState = ProductReducer(ProductInitialState, action);

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
