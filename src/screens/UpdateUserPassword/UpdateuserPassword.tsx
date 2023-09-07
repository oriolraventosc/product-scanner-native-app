import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header/Header";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import IconCircle from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import ProductInformation from "../../components/ProductInformation/ProductInformation";
import { useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader/Loader";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { UserUpdateInformation, UserUpdatePassword } from "../../types/types";
import useUser from "../../hooks/useUser/useUser";

const UpdateUserPassword = (): JSX.Element => {
  const loading = useAppSelector((state) => state.uiActions.loading);
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const { modal } = useAppSelector((state) => state.uiActions);
  const user = useAppSelector((state) => state.userActions);
  const initialUser: UserUpdatePassword = {
    password: "",
  };

  const [userData, setUserData] = useState(initialUser);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(userData.password.length < 1);
  }, [userData.password]);

  const { updatePassword } = useUser();

  const changeUserData = (text: string, identify: string) => {
    setUserData({
      ...userData,
      [identify]: text,
    });
  };

  const onSubmit = async () => {
    const newUser = {
      password: userData.password,
    };
    await updatePassword(newUser);
  };
  return (
    <>
      {loading && <Loader />}
      {user.isLogged === false && navigate.navigate("Login")}
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
          <View style={{}}>
            <LinearGradient
              colors={["#fff", "#fff"]}
              style={styles.linearGradient}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  marginBottom: 30,
                }}
              >
                <TouchableOpacity onPress={() => navigate.navigate("User")}>
                  <Icon name="arrow-back" style={styles.arrow} />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: colors.dark }}>
                  Restablecer contraseña
                </Text>
              </View>
            </LinearGradient>
            <View>
              <View style={styles.itemBox}>
                <Text style={styles.itemTitle}>Nueva contraseña</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: colors.dark,
                    paddingBottom: 5,
                    marginLeft: 30,
                    marginRight: 30,
                  }}
                >
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
              </View>
              <View style={styles.itemBox}>
                <Text style={styles.itemTitle}>Confirmar contraseña</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: colors.dark,
                    paddingBottom: 5,
                    marginLeft: 30,
                    marginRight: 30,
                  }}
                >
                  <TextInput
                    value={""}
                    secureTextEntry={true}
                    testID="password"
                    placeholder="Contraseña"
                    textContentType="password"
                    style={{
                      color: colors.dark,
                      fontSize: 20,
                      flex: 1,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={buttonDisabled ? styles.buttonDisabled : styles.button}
                  onPress={onSubmit}
                >
                  <Text style={styles.updateText}>Restablecer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 130, // Adjust the size as needed
    height: 130, // Adjust the size as needed
    borderRadius: 80, // To make it a circle
    backgroundColor: colors.light, // Change the background color as needed
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25, // Adjust the font size as needed
    color: colors.dark, // Change the text color as needed
    fontWeight: "500",
  },
  arrow: {
    fontSize: 30,
    textAlign: "left",
    paddingLeft: 30,
  },
  name: {
    fontSize: 26,
  },
  linearGradient: { paddingTop: 20 },
  title: { paddingLeft: 30, paddingTop: 28, fontWeight: "bold", fontSize: 30 },
  itemTitle: {
    paddingLeft: 30,
    fontSize: 20,
    color: colors.dark,
    paddingTop: 10,
    fontWeight: "bold",
  },
  item: { paddingLeft: 30, fontSize: 20, color: "#515151" },
  itemBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  updateText: {
    fontSize: 20,
    color: colors.dark,
  },
  updatePassword: {
    fontSize: 17,
    color: colors.main,
    marginRight: 30,
    marginLeft: 30,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.main,
    color: colors.dark,
    opacity: 1,
    zIndex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonDisabled: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#d9d0d0a8",
    color: colors.dark,
    opacity: 0.3,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default UpdateUserPassword;
