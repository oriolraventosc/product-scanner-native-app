import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { REACT_APP_API_URL } from "@env";
import { useCallback } from "react";
import {
  UserCredentials,
  UserUpdateData,
  UserUpdatePassword,
} from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import {
  closeLoadingActionCreator,
  openLoadingActionCreator,
  openModalActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import axios from "axios";
import decodeToken from "../../utils/decode/decode";
import {
  loginActionCreator,
  updateActionCreator,
} from "../../redux/features/userSlice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const navigate = useNavigation<ScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userActions);
  const register = useCallback(async (data: UserCredentials) => {
    const url = `${REACT_APP_API_URL}user/register`;
    dispatch(openLoadingActionCreator());
    try {
      await axios.post(url, data);
      navigate.navigate("Login");
      dispatch(closeLoadingActionCreator());
    } catch {
      dispatch(
        openModalActionCreator("No te olvides de rellenar todos los campos!")
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
          "Credenciales incorrectas! Escribe tu e-mail y contraseña correctos"
        )
      );
      dispatch(closeLoadingActionCreator());
    }
  }, []);

  const updateUser = useCallback(async (data: UserUpdateData) => {
    const url = `${REACT_APP_API_URL}user/update-user/${user.email}`;
    try {
      dispatch(openLoadingActionCreator());
      await axios.patch(url, data);
      dispatch(updateActionCreator(data));
      dispatch(closeLoadingActionCreator());
      navigate.navigate("User");
    } catch {
      closeLoadingActionCreator();
    }
  }, []);

  const updatePassword = useCallback(async (data: UserUpdatePassword) => {
    const url = `${REACT_APP_API_URL}user/update-password/${user.email}`;
    try {
      dispatch(openLoadingActionCreator());
      await axios.patch(url, data);
      dispatch(closeLoadingActionCreator());
      navigate.navigate("User");
    } catch {
      dispatch(closeLoadingActionCreator());
    }
  }, []);

  return { login, register, updateUser, updatePassword };
};

export default useUser;
