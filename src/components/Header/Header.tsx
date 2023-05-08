import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import screenStyles from "../../styles/screenStyles";
import colors from "../../styles/colors";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { ReadableStreamBYOBRequest } from "node:stream/web";

const Header = (): JSX.Element => {
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    style: isPress ? screenStyle.buttonPressed : screenStyle.button, // <-- but you can still apply other style changes
  };

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
          >
            <Icon name="home" style={screenStyle.menuIcon} />
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
          >
            <Icon name="login" style={screenStyle.menuIcon} />

            <Text style={screenStyle.menuItem}>Log in</Text>
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
    marginTop: "6%",
  },
  menuItem: {
    fontFamily: "Roboto",
    color: "#ffff",
    fontSize: 25,
    fontWeight: "500",
  },
  menuIcon: { fontSize: 30, color: colors.main },
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
