import axios from "axios";
import {
  loadProductsActionCreator,
  loadProductInformationActionCreator,
  loadFavouriteProductsActionCreator,
  loadStatusProductsActionCreator,
  loadSupplementsProductsActionCreator,
} from "../../redux/features/productSlice/productSlice";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { REACT_APP_API_URL } from "@env";
import {
  openLoadingActionCreator,
  closeLoadingActionCreator,
  openModalActionCreator,
} from "../../redux/features/uiSlice/uiSlice";

const useProduct = () => {
  const token = useAppSelector((state) => state.userActions.accessToken);
  const dispatch = useAppDispatch();
  const { myProductsLimit } = useAppSelector((state) => state.productActions);
  const loadProducts = useCallback(
    async (id: string, limit: number) => {
      const url = `${REACT_APP_API_URL}product/search?name=${id}&limit=${limit}`;
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

  const loadFavouriteProducts = useCallback(
    async (email: string, limit: number) => {
      const url = `${REACT_APP_API_URL}product/favourite-products/${email}?limit=${limit}`;
      try {
        dispatch(openLoadingActionCreator());
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apiResponse = response.data;
        dispatch(
          loadFavouriteProductsActionCreator(apiResponse.user.favouriteProducts)
        );
        dispatch(closeLoadingActionCreator());
      } catch {
        dispatch(closeLoadingActionCreator());
      }
    },
    [REACT_APP_API_URL, dispatch]
  );

  const addToFavourites = useCallback(
    async (email: string, ean: string) => {
      const url = `${REACT_APP_API_URL}product/add-to-favourites/${email}/${ean}`;
      try {
        dispatch(openLoadingActionCreator());
        await axios.patch(url);
        dispatch(closeLoadingActionCreator());
      } catch {
        dispatch(closeLoadingActionCreator());
      }
    },
    [REACT_APP_API_URL, dispatch]
  );

  const deleteFromFavourites = useCallback(
    async (email: string, ean: string) => {
      const url = `${REACT_APP_API_URL}product/delete-from-favourites/${email}/${ean}`;
      try {
        dispatch(openLoadingActionCreator());
        await axios.patch(url);
        loadFavouriteProducts(email, myProductsLimit);

        dispatch(closeLoadingActionCreator());
      } catch (error) {
        dispatch(closeLoadingActionCreator());
      }
    },
    [REACT_APP_API_URL, dispatch]
  );

  const searchProductsByStatus = useCallback(
    async (status: string, limit: number) => {
      const url = `${REACT_APP_API_URL}product/status-products-search?status=${status}&limit=${limit}`;
      try {
        dispatch(openLoadingActionCreator());
        const response = await axios.get(url);
        const apiResponse = response.data;
        dispatch(loadStatusProductsActionCreator(apiResponse.products));
        dispatch(
          loadSupplementsProductsActionCreator(apiResponse.scanProducts)
        );
        dispatch(closeLoadingActionCreator());
      } catch {
        dispatch(closeLoadingActionCreator());
      }
    },
    [REACT_APP_API_URL, dispatch]
  );
  return {
    loadProducts,
    loadProduct,
    loadFavouriteProducts,
    addToFavourites,
    deleteFromFavourites,
    searchProductsByStatus,
  };
};

export default useProduct;
