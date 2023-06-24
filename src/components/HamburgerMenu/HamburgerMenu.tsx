import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconItems from "react-native-vector-icons/AntDesign";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import { useAppSelector } from "../../redux/hooks";
import useToken from "../../hooks/useToken/useToken";

const HamburgerMenu = () => {
  const { isLogged } = useAppSelector((state) => state.userActions);
  const { removeToken } = useToken();
  const navigate = useNavigation<ScreenNavigationProp>();
  const [isOpen, setIsOpen] = useState(false);
  const animation = new Animated.Value(isOpen ? 1 : 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const navigateToHome = () => {
    toggleMenu();
    navigate.navigate("Home");
  };
  const navigateToHomeByTitle = () => {
    setIsOpen(false);
    navigate.navigate("Home");
  };
  const navigateToScanner = () => {
    toggleMenu();
    navigate.navigate("Scanner");
  };
  const navigateToLogin = () => {
    toggleMenu();
    navigate.navigate("Login");
  };
  const navigateToFavouriteProducts = () => {
    toggleMenu();
    navigate.navigate("MyProducts");
  };
  const navigateToStatusSceen = () => {
    toggleMenu();
    navigate.navigate("Status");
  };
  const navigateToStatusProductsScreen = () => {
    toggleMenu();
    navigate.navigate("StatusProducts");
  };

  const removeTokenFromUser = () => {
    removeToken();
  };

  const menuOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
          <Icon
            name="menu"
            style={{
              color: colors.main,
              fontSize: 30,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToHomeByTitle}>
          <Text style={styles.title}>SCANNER</Text>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <Animated.View style={[styles.menu, { opacity: menuOpacity }]}>
          <TouchableOpacity
            onPress={navigateToHome}
            style={styles.menuItemsContainer}
          >
            <IconItems name="home" style={styles.menuIcon} />
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToScanner}
            style={styles.menuItemsContainer}
          >
            <IconItems name="scan1" style={styles.menuIcon} />
            <Text style={styles.menuItem}>Scan Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToFavouriteProducts}
            style={styles.menuItemsContainer}
          >
            <IconItems name="shoppingcart" style={styles.menuIcon} />

            <Text style={styles.menuItem}>My Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToStatusSceen}
            style={styles.menuItemsContainer}
          >
            <Text style={styles.menuItem}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToStatusProductsScreen}
            style={styles.menuItemsContainer}
          >
            <Text style={styles.menuItem}>Status Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={isLogged ? removeTokenFromUser : navigateToLogin}
            style={styles.menuItemsContainer}
          >
            <IconItems name="login" style={styles.menuIcon} />

            <Text style={styles.menuItem}>{isLogged ? "Logout" : "Login"}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  title: {
    color: colors.dark,
    fontSize: 30,
    fontWeight: "bold",
  },
  menu: {
    backgroundColor: colors.main,
    paddingTop: 15,
    gap: 30,
    paddingBottom: 15,
  },
  menuItem: {
    textAlign: "center",
    fontFamily: "Roboto",
    color: colors.dark,
    fontSize: 20,
    fontWeight: "500",
  },
  menuIcon: {
    fontSize: 23,
    color: colors.dark,
  },
  menuItemsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default HamburgerMenu;
