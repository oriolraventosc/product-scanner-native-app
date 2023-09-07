import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
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

const UserDetailsScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const loading = useAppSelector((state) => state.uiActions.loading);
  const user = useAppSelector((state) => state.userActions);

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
              <TouchableOpacity onPress={() => navigate.navigate("Home")}>
                <Icon name="arrow-back" style={styles.arrow} />
              </TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 30,
                }}
              >
                <View style={styles.circle}>
                  <Text style={styles.text}>{user.name[0].toUpperCase()}</Text>
                </View>
              </View>
            </LinearGradient>
            <View>
              <View style={styles.itemBox}>
                <Text style={styles.itemTitle}>Nombre</Text>
                <Text style={styles.item}>{user.name}</Text>
              </View>
              <View style={styles.itemBox}>
                <Text style={styles.itemTitle}>E-mail</Text>
                <Text style={styles.item}>{user.email}</Text>
              </View>
              <View style={styles.itemBox}>
                <Text style={styles.itemTitle}>Nivel</Text>
                <Text style={styles.item}>Usuario</Text>
              </View>
              <View style={styles.itemBox}>
                <Text style={styles.itemTitle}>Contraseña</Text>
                <Text style={styles.item}>*************</Text>
              </View>
              <TouchableOpacity onPress={() => navigate.navigate("UpdateUser")}>
                <Text style={styles.updateText}>Editar perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.updatePassword}>
                  Restablecer contraseña
                </Text>
              </TouchableOpacity>
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
    backgroundColor: colors.main,
    color: colors.dark,
    marginRight: 30,
    marginLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 25,
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
});

export default UserDetailsScreen;
