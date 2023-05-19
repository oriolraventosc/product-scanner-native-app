import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/types";

interface ProductState {
  product: Product;
  myProducts: Product[];
  productsList: Product[];
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
    deleteFavouriteProducts: (initialState) => ({
      ...initialState,
      myProducts: [],
    }),
  },
});

export const ProductReducer = ProductSlice.reducer;

export const {
  loadProducts: loadProductsActionCreator,
  loadProduct: loadProductInformationActionCreator,
  loadFavouriteProducts: loadFavouriteProductsActionCreator,
  deleteFavouriteProducts: deleteFavouriteProductsActionCreator,
} = ProductSlice.actions;
