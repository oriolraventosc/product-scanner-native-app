import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import IconTimer from "react-native-vector-icons/MaterialIcons";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";

const ScannerScreen = (): JSX.Element => {
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
              gap: 30,
            }}
          >
            <IconTimer
              name="timer"
              style={{ fontSize: 150, color: colors.main }}
            />
            <Text style={{ fontSize: 30, color: colors.dark }}>
              COMING SOON
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default ScannerScreen;
