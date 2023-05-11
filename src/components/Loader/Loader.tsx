import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import colors from "../../styles/colors";

const { width } = Dimensions.get("window");

const Loader = (): JSX.Element => {
  return (
    <>
      <SafeAreaView
        style={{
          height: "100%",
          width,
          backgroundColor: colors.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 8,
        }}
      >
        <Spinner visible={true} color={colors.dark} size={"large"}></Spinner>
      </SafeAreaView>
    </>
  );
};

export default Loader;
