import axios from "axios";
import {
  loadProductsActionCreator,
  loadProductInformationActionCreator,
} from "../../redux/features/productSlice/productSlice";
import { useCallback } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  openLoadingActionCreator,
  closeLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";

const useProduct = () => {
  const dispatch = useAppDispatch();
  const apiUrl = process.env.REACT_APP_URL_BASE;
  const loadProducts = useCallback(
    async (id: string) => {
      const url = `${apiUrl}product/search?name=${id}`;
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
    [dispatch, apiUrl]
  );
  const loadProduct = useCallback(
    async (id: string) => {
      const url = `${apiUrl}product/${id}`;
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
    [apiUrl, dispatch]
  );
  return { loadProducts, loadProduct };
};

export default useProduct;
