import { useAppDispatch } from "../../redux/hooks";
import { REACT_APP_API_URL } from "@env";
import { useCallback } from "react";
import { UserCredentials } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import {
  closeLoadingActionCreator,
  openLoadingActionCreator,
  openModalActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import axios from "axios";
import decodeToken from "../../utils/decode/decode";
import { loginActionCreator } from "../../redux/features/userSlice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const navigate = useNavigation<ScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const register = useCallback(async (data: UserCredentials) => {
    const url = `${REACT_APP_API_URL}user/register`;
    dispatch(openLoadingActionCreator());
    try {
      await axios.post(url, data);
      navigate.navigate("Login");
      dispatch(closeLoadingActionCreator());
    } catch {
      dispatch(
        openModalActionCreator("Remember to fill the needed information!")
      );
      dispatch(closeLoadingActionCreator());
    }
  }, []);

  const login = useCallback(async (data: UserCredentials) => {
    const url = `${REACT_APP_API_URL}user/login`;
    try {
      dispatch(openLoadingActionCreator());
      const response = await axios.post(url, data);
      const { accessToken, email, name, favouriteProducts } = response.data;
      const loggedUser = decodeToken(accessToken);
      dispatch(
        loginActionCreator({
          ...loggedUser,
          accessToken,
          email,
          name,
          favouriteProducts,
        })
      );
      await AsyncStorage.setItem("token", accessToken);
      navigate.navigate("Home");
      dispatch(closeLoadingActionCreator());
    } catch {
      dispatch(
        openModalActionCreator(
          "Wrong credentials! Type your email and password"
        )
      );
      dispatch(closeLoadingActionCreator());
    }
  }, []);

  return { login, register };
};

export default useUser;
