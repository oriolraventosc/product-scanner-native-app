import axios from "axios";
import {
  loadProductsActionCreator,
  loadProductInformationActionCreator,
  loadFavouriteProductsActionCreator,
} from "../../redux/features/productSlice/productSlice";
import { useCallback } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { REACT_APP_API_URL } from "@env";
import {
  openLoadingActionCreator,
  closeLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useProduct = () => {
  const dispatch = useAppDispatch();
  const token = AsyncStorage.getItem("token");
  const loadProducts = useCallback(
    async (id: string) => {
      const url = `${REACT_APP_API_URL}product/search?name=${id}`;
      try {
        dispatch(openLoadingActionCreator());
        const response = await axios.get(url);
        const apiResponse = response.data;
        dispatch(loadProductsActionCreator(apiResponse.productsList));
        dispatch(closeLoadingActionCreator());
      } catch {
        dispatch(closeLoadingActionCreator());
      }
    },
    [dispatch, REACT_APP_API_URL]
  );
  const loadProduct = useCallback(
    async (id: string) => {
      const url = `${REACT_APP_API_URL}product/${id}`;
      try {
        dispatch(openLoadingActionCreator());
        const response = await axios.get(url);
        const apiResponse = response.data;
        dispatch(
          loadProductInformationActionCreator(apiResponse.productInformation)
        );
        dispatch(closeLoadingActionCreator());
      } catch {
        dispatch(closeLoadingActionCreator());
      }
    },
    [REACT_APP_API_URL, dispatch]
  );

  const loadFavouriteProducts = useCallback(async (email: string) => {
    const url = `${REACT_APP_API_URL}product/favourite-products/${email}`;
    try {
      dispatch(openLoadingActionCreator());
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const apiResponse = response.data;
      dispatch(
        loadFavouriteProductsActionCreator(apiResponse.favouriteProducts)
      );
      dispatch(closeLoadingActionCreator());
    } catch {
      dispatch(closeLoadingActionCreator());
    }
  }, []);
  return { loadProducts, loadProduct, loadFavouriteProducts };
};

export default useProduct;
