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
import Icon from "react-native-vector-icons/Entypo";
import IconSad from "react-native-vector-icons/FontAwesome5";
import IconSleep from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import SearchBar from "../../components/SearchBar/SearchBar";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { useAppDispatch } from "../../redux/hooks";
import { setStatusActionCreator } from "../../redux/features/productSlice/productSlice";

const StatusScreen = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const handleHappy = () => {
    dispatch(setStatusActionCreator("Contento"));
    navigate.navigate("StatusProducts");
  };
  const handleSad = () => {
    dispatch(setStatusActionCreator("Triste"));
    navigate.navigate("StatusProducts");
  };
  const handleTired = () => {
    dispatch(setStatusActionCreator("Cansado"));
    navigate.navigate("StatusProducts");
  };
  const handleSleepy = () => {
    dispatch(setStatusActionCreator("Dormido"));
    navigate.navigate("StatusProducts");
  };

  return (
    <>
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
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Roboto",
              textAlign: "center",
              fontWeight: "500",
              color: colors.dark,
              paddingTop: 20,
            }}
          >
            ¿Cómo te encuentras hoy?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#7CFC83",
              marginLeft: 80,
              marginRight: 80,
              paddingTop: 50,
              paddingBottom: 50,
              marginTop: 20,
              borderRadius: 10,
            }}
            onPress={() => handleHappy()}
          >
            <Icon
              name="emoji-happy"
              style={{ fontSize: 100, textAlign: "center", color: colors.dark }}
            />
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: colors.dark,
                paddingTop: 20,
              }}
            >
              CONTENTO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#7449FC",
              marginLeft: 80,
              marginRight: 80,
              paddingTop: 50,
              paddingBottom: 50,
              marginTop: 20,
              borderRadius: 10,
            }}
            onPress={() => handleSad()}
          >
            <Icon
              name="emoji-sad"
              style={{ fontSize: 100, textAlign: "center", color: "#fff" }}
            />
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: "#fff",
                paddingTop: 20,
              }}
            >
              TRISTE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#573CB0",
              marginLeft: 80,
              marginRight: 80,
              paddingTop: 50,
              paddingBottom: 50,
              marginTop: 20,
              borderRadius: 10,
            }}
            onPress={() => handleTired()}
          >
            <IconSad
              name="tired"
              style={{ fontSize: 100, textAlign: "center", color: "#fff" }}
            />
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: "#fff",
                paddingTop: 20,
              }}
            >
              CANSADO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#E6D74E",
              marginLeft: 80,
              marginRight: 80,
              paddingTop: 50,
              paddingBottom: 50,
              marginTop: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={() => handleSleepy()}
          >
            <IconSleep
              name="sentiment-dissatisfied"
              style={{ fontSize: 100, textAlign: "center", color: colors.dark }}
            />
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: colors.dark,
                paddingTop: 20,
              }}
            >
              DORMIDO
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default StatusScreen;
