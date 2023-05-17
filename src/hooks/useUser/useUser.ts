import { useAppDispatch } from "../../redux/hooks";
import { REACT_APP_API_URL } from "@env";
import { useCallback } from "react";
import { UserCredentials } from "../../types/types";
import {
  closeLoadingActionCreator,
  openLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import axios from "axios";
import decodeToken from "../../utils/decode/decode";
import { loginActionCreator } from "../../redux/features/userSlice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const dispatch = useAppDispatch();
  const register = useCallback(async (data: UserCredentials) => {
    const url = `${REACT_APP_API_URL}user/register`;
    try {
      dispatch(openLoadingActionCreator());
      await axios.post(url, data);
      dispatch(closeLoadingActionCreator());
    } catch {
      closeLoadingActionCreator();
    }
  }, []);

  const login = useCallback(async (data: UserCredentials) => {
    const url = `${REACT_APP_API_URL}user/login`;
    try {
      dispatch(openLoadingActionCreator());
      const response = await axios.post(url, data);
      const { accessToken, email } = response.data;
      const loggedUser = decodeToken(accessToken);
      dispatch(loginActionCreator({ ...loggedUser, accessToken, email }));
      await AsyncStorage.setItem("token", accessToken);
      dispatch(closeLoadingActionCreator());
    } catch {
      closeLoadingActionCreator();
    }
  }, []);

  return { login, register };
};

export default useUser;
