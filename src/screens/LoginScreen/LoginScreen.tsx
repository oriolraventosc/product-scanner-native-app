import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import IconEmail from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import useUser from "../../hooks/useUser/useUser";
import { useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader/Loader";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import ModalComponent from "../../components/Modal/Modal";

interface UserCredentials {
  email: string;
  password: string;
}

const LoginScreen = (): JSX.Element => {
  const loading = useAppSelector((state) => state.uiActions.loading);
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const { modal } = useAppSelector((state) => state.uiActions);
  const initialUser: UserCredentials = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialUser);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(
      userData.email.length < 1 || userData.password.length < 1
    );
  }, [userData.email, userData.password]);

  const { login } = useUser();

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
    };
    await login(newUser);
  };

  return (
    <>
      {modal && <ModalComponent />}
      {loading && <Loader />}
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
        <HamburgerMenu />
        <ScrollView>
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
                Iniciar sesión
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
                <IconEmail name="email" color={colors.main} size={25} />
                <TextInput
                  value={userData.email}
                  testID="email"
                  placeholder="E-mail"
                  textContentType="username"
                  style={{
                    color: colors.dark,
                    fontSize: 20,
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
                <Icon name="lock" color={colors.main} size={25} />
                <TextInput
                  value={userData.password}
                  secureTextEntry={true}
                  testID="password"
                  placeholder="Contraseña"
                  textContentType="password"
                  style={{
                    color: colors.dark,
                    fontSize: 20,
                    flex: 1,
                  }}
                  onChangeText={(data: string) => {
                    changeUserData(data, "password");
                  }}
                />
              </View>
              <TouchableOpacity
                style={
                  buttonDisabled
                    ? loginStyles.buttonDisabled
                    : loginStyles.button
                }
                onPress={onSubmit}
              >
                <Text testID="submitButton" style={{ fontSize: 23 }}>
                  INICIAR SESIÓN
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.main,
                  fontFamily: "Roboto",
                  textAlign: "center",
                }}
                onPress={() => navigate.navigate("Register")}
              >
                No eres miembro? Regístrate aquí
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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

export default LoginScreen;
