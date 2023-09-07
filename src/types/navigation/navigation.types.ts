import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import Routes from "../../navigation/routes";

export type LogRootStackParamList = {
  Home: undefined;
  Login: undefined;
  MyProducts: undefined;
  ProductDetail: undefined;
  Register: undefined;
  Scanner: undefined;
  Status: undefined;
  StatusProducts: undefined;
  User: undefined;
  UpdateUser: undefined;
  UpdatePassword: undefined;
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<LogRootStackParamList>;
