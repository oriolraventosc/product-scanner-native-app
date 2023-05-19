import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import IconEmail from "react-native-vector-icons/Fontisto";
import Header from "../../components/Header/Header";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import useUser from "../../hooks/useUser/useUser";
import { useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader/Loader";

interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

const RegisterScreen = (): JSX.Element => {
  const loading = useAppSelector((state) => state.uiActions.loading);
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const initialUser: UserCredentials = {
    email: "",
    password: "",
    name: "",
  };

  const [userData, setUserData] = useState(initialUser);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(
      userData.email.length < 1 ||
        userData.password.length < 1 ||
        userData.name.length < 1
    );
  }, [userData.email, userData.password]);

  const { register } = useUser();

  const changeUserData = (text: string, identify: string) => {
    setUserData({
      ...userData,
      [identify]: text,
    });
  };

  const onSubmit = async () => {
    const newUser = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
    };
    await register(newUser);
  };

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: "#fff",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "6%",
          marginTop: showMenu ? "6%" : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          borderRadius: showMenu ? 15 : 0,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 250,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -250 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
          >
            <Icon
              name="menu"
              style={{ color: colors.main, fontSize: 30, marginTop: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate("Home");
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto",
                color: colors.dark,
                fontSize: 30,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              SCANNER
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 15,
            display: "flex",
            gap: 100,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 50,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto",
                color: colors.dark,
                fontSize: 35,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              Register
            </Text>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: colors.dark,
                paddingBottom: 10,
                gap: 15,
                paddingLeft: 15,
                paddingRight: 15,
                width: "90%",
              }}
            >
              <Icon name="user" color={colors.main} size={30} />
              <TextInput
                value={userData.name}
                testID="name"
                placeholder="Name"
                textContentType="name"
                style={{
                  color: colors.dark,
                  fontSize: 22,
                  flex: 1,
                }}
                onChangeText={(data: string) => {
                  changeUserData(data, "name");
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: colors.dark,
                paddingBottom: 10,
                gap: 15,
                paddingLeft: 15,
                paddingRight: 15,
                width: "90%",
              }}
            >
              <IconEmail name="email" color={colors.main} size={30} />
              <TextInput
                value={userData.email}
                testID="email"
                placeholder="E-mail"
                textContentType="username"
                style={{
                  color: colors.dark,
                  fontSize: 22,
                  flex: 1,
                }}
                onChangeText={(data: string) => {
                  changeUserData(data, "email");
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: colors.dark,
                paddingBottom: 10,
                gap: 15,
                paddingLeft: 15,
                paddingRight: 15,
                width: "90%",
              }}
            >
              <Icon name="lock" color={colors.main} size={30} />
              <TextInput
                value={userData.password}
                secureTextEntry={true}
                testID="password"
                placeholder="Password"
                textContentType="password"
                style={{
                  color: colors.dark,
                  fontSize: 22,
                  flex: 1,
                }}
                onChangeText={(data: string) => {
                  changeUserData(data, "password");
                }}
              />
            </View>
            <TouchableOpacity
              style={
                buttonDisabled ? loginStyles.buttonDisabled : loginStyles.button
              }
              onPress={onSubmit}
            >
              <Text testID="submitButton" style={{ fontSize: 25 }}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                color: colors.main,
                fontFamily: "Roboto",
                textAlign: "center",
              }}
              onPress={() => navigate.navigate("Login")}
            >
              Already a user? Login here
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const loginStyles = StyleSheet.create({
  button: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    borderRadius: 25,
    backgroundColor: colors.main,
    color: colors.dark,
    opacity: 1,
    zIndex: 1,
  },
  buttonDisabled: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    borderRadius: 25,
    backgroundColor: "#d9d0d0a8",
    color: colors.dark,
    opacity: 0.3,
  },
});

export default RegisterScreen;
