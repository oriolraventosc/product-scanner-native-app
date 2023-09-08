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
import SearchBar from "../../components/SearchBar/SearchBar";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import Loader from "../../components/Loader/Loader";
import { useAppSelector } from "../../redux/hooks";

const HomeScreen = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const loading = useAppSelector((state) => state.uiActions.loading);

  return (
    <>
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
          <SearchBar />
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default HomeScreen;
