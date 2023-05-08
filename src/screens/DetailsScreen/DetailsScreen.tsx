import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";

const DetailsScreen = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();

  return (
    <>
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
          marginTop: "6%",

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
            backgroundColor: colors.dark,
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
              style={{ color: colors.main, fontSize: 40, marginTop: 15 }}
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
                color: "#fff",
                fontSize: 35,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              SCANNER
            </Text>
          </TouchableOpacity>
        </View>
        <Text>Details</Text>
      </Animated.View>
    </>
  );
};

export default DetailsScreen;
