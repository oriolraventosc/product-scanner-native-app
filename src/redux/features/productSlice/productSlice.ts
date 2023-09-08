import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/types";

interface ProductState {
  product: Product;
  myProducts: Product[];
  productsList: Product[];
  productsListLimit: number;
  myProductsLimit: number;
  statusProductsLimit: number;
  statusProductsList: Product[];
  statusSupplementsList: Product[];
  status: string;
  statusSupplementsLimit: number;
}

export const ProductInitialState: ProductState = {
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

const ProductSlice = createSlice({
  name: "product",
  initialState: ProductInitialState,
  reducers: {
    loadProducts: (initialState, action: PayloadAction<Product[]>) => ({
      ...initialState,
      productsList: [...action.payload],
    }),
    loadProduct: (initialState, action: PayloadAction<Product>) => ({
      ...initialState,
      product: { ...action.payload },
    }),
    loadFavouriteProducts: (
      initialState,
      action: PayloadAction<Product[]>
    ) => ({
      ...initialState,
      myProducts: [...action.payload],
    }),
    deleteFavouriteProducts: (initialState, action: PayloadAction<string>) => ({
      ...initialState,
      myProducts: [
        ...initialState.myProducts.filter(
          (product) => product.ean !== action.payload
        ),
      ],
    }),
    loadStatusProducts: (initialState, action: PayloadAction<Product[]>) => ({
      ...initialState,
      statusProductsList: [...action.payload],
    }),
    loadSupplementsProducts: (
      initialState,
      action: PayloadAction<Product[]>
    ) => ({
      ...initialState,
      statusSupplementsList: [...action.payload],
    }),
    setStatus: (initialState, action: PayloadAction<string>) => ({
      ...initialState,
      status: action.payload,
    }),
    increaseLimitProductsList: (initialState) => ({
      ...initialState,
      productsListLimit: initialState.productsListLimit + 6,
    }),
    increaseLimitMyProductsList: (initialState) => ({
      ...initialState,
      myProductsLimit: initialState.myProductsLimit + 6,
    }),
    increaseLimitStatusProductsList: (initialState) => ({
      ...initialState,
      statusProductsLimit: initialState.statusProductsLimit + 6,
      statusSupplementsLimit: initialState.statusSupplementsLimit + 6,
    }),
  },
});

export const ProductReducer = ProductSlice.reducer;

export const {
  loadProducts: loadProductsActionCreator,
  loadProduct: loadProductInformationActionCreator,
  loadFavouriteProducts: loadFavouriteProductsActionCreator,
  deleteFavouriteProducts: deleteFavouriteProductsActionCreator,
  loadStatusProducts: loadStatusProductsActionCreator,
  loadSupplementsProducts: loadSupplementsProductsActionCreator,
  setStatus: setStatusActionCreator,
  increaseLimitProductsList: increaseLimitProductsListActionCreator,
  increaseLimitMyProductsList: increaseLimitMyProductsListActionCreator,
  increaseLimitStatusProductsList: increaseLimitStatusProductsListActionCreator,
} = ProductSlice.actions;
