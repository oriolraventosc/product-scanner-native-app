import React from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutActionCreator } from "../../redux/features/userSlice/userSlice";
import useToken from "../../hooks/useToken/useToken";

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { removeToken } = useToken();
  const isLogged = useAppSelector((state) => state.userActions.isLogged);
  const navigate = useNavigation<ScreenNavigationProp>();
  return (
    <>
      <SafeAreaView style={screenStyle.menuContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            display: "flex",
            height: "100%",
            paddingLeft: 20,
            gap: 60,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
            onPress={() => {
              navigate.navigate("Home");
            }}
          >
            <Icon
              name="home"
              style={screenStyle.menuIcon}
              onPress={() => {
                navigate.navigate("Home");
              }}
            />
            <Text style={screenStyle.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
            onPress={() => {
              navigate.navigate("ProductDetail");
            }}
          >
            <Icon name="scan1" style={screenStyle.menuIcon} />

            <Text style={screenStyle.menuItem}>Scan product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
            onPress={() => {
              navigate.navigate("MyProducts");
            }}
          >
            <Icon name="shoppingcart" style={screenStyle.menuIcon} />

            <Text style={screenStyle.menuItem}>My products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
            onPress={() => {
              isLogged ? removeToken() : navigate.navigate("Login");
            }}
          >
            <Icon name="login" style={screenStyle.menuIcon} />

            <Text style={screenStyle.menuItem}>
              {isLogged ? "Logout" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const screenStyle = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.dark,
    height: "100%",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  menuItem: {
    fontFamily: "Roboto",
    color: "#ffff",
    fontSize: 20,
    fontWeight: "500",
  },
  menuIcon: { fontSize: 25, color: colors.main },
  button: {
    backgroundColor: colors.main,
    fontSize: 30,
    fontFamily: "Roboto",
    borderRadius: 10,
  },
  buttonPressed: {
    underlayColor: colors.dark,
    fontSize: 30,
    fontFamily: "Roboto",
    borderRadius: 10,
    opacity: 1,
  },
  buttonText: {
    color: colors.dark,
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonTextPressed: {
    color: "#fff",
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

export default Header;
