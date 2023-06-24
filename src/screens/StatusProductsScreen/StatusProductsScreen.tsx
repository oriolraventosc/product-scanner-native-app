import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Entypo";
import IconSad from "react-native-vector-icons/FontAwesome5";
import IconSleep from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import SearchBar from "../../components/SearchBar/SearchBar";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setStatusActionCreator } from "../../redux/features/productSlice/productSlice";
import useProduct from "../../hooks/useProduct/useProduct";
import Loader from "../../components/Loader/Loader";

const StatusProductsScreen = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { searchProductsByStatus, loadProduct } = useProduct();
  const loading = useAppSelector((state) => state.uiActions.loading);
  const {
    statusProductsList,
    statusProductsLimit,
    statusSupplementsList,
    status,
  } = useAppSelector((state) => state.productActions);
  const handlePress = (id: string) => {
    loadProduct(id);
    navigate.navigate("ProductDetail");
  };
  useEffect(() => {
    searchProductsByStatus(status, statusProductsLimit);
  }, [status, statusProductsLimit]);
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
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Roboto",
              textAlign: "center",
              fontWeight: "bold",
              color: colors.dark,
              paddingTop: 20,
            }}
          >
            PRODUCTOS
          </Text>
          {statusProductsList.length > 0 && (
            <View
              style={{
                marginBottom: 10,
                gap: 10,
                display: "flex",
                paddingLeft: 15,
                paddingRight: 15,
                marginTop: 10,
              }}
            >
              {statusProductsList.map((product, index) => (
                <TouchableOpacity
                  onPress={() => handlePress(product.name)}
                  key={index}
                >
                  <View
                    style={{
                      borderColor: "#c0bcbc57",
                      borderWidth: 2,
                      position: "relative",
                      maxWidth: 500,
                      borderRadius: 5,
                      width: "100%",
                      paddingTop: 10,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      style={{ height: 300 }}
                      source={{
                        uri: product.image,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 25,
                        fontFamily: "Roboto",
                        textAlign: "center",
                        paddingBottom: 10,
                        paddingTop: 10,
                      }}
                    >
                      {product.name.toUpperCase()}
                    </Text>
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                      }}
                    ></TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Roboto",
              textAlign: "center",
              fontWeight: "bold",
              color: colors.dark,
              paddingTop: 20,
            }}
          >
            SUPLEMENTOS
          </Text>
          {statusSupplementsList.length > 0 && (
            <View
              style={{
                marginBottom: 10,
                gap: 10,
                display: "flex",
                marginTop: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              {statusSupplementsList.map((product, index) => (
                <TouchableOpacity
                  onPress={() => handlePress(product.name)}
                  key={index}
                >
                  <View
                    style={{
                      borderColor: "#c0bcbc57",
                      borderWidth: 2,
                      position: "relative",
                      maxWidth: 500,
                      borderRadius: 5,
                      width: "100%",
                      paddingTop: 10,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      style={{ height: 300 }}
                      source={{
                        uri: product.image,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 25,
                        fontFamily: "Roboto",
                        textAlign: "center",
                        paddingBottom: 10,
                        paddingTop: 10,
                      }}
                    >
                      {product.name.toUpperCase()}
                    </Text>
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                      }}
                    ></TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default StatusProductsScreen;
