import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import decodeToken from "../../utils/decode/decode";
import {
  loginActionCreator,
  logoutActionCreator,
} from "../../redux/features/userSlice/userSlice";
import { deleteFavouriteProductsActionCreator } from "../../redux/features/productSlice/productSlice";

const useToken = () => {
  const dispatch = useAppDispatch();
  const { name, favouriteProducts } = useAppSelector(
    (state) => state.userActions
  );

  const checkToken = useCallback(async () => {
    const accessToken = await AsyncStorage.getItem("token");
    if (accessToken) {
      const user = decodeToken(accessToken);
      dispatch(
        loginActionCreator({ ...user, accessToken, name, favouriteProducts })
      );
    }
  }, [dispatch]);

  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(logoutActionCreator());
    dispatch(deleteFavouriteProductsActionCreator());
  };

  return { checkToken, removeToken };
};

export default useToken;
