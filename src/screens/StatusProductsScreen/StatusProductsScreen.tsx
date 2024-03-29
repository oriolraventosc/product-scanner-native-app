import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import IconCamera from "react-native-vector-icons/Entypo";
import { Provider as PaperProvider } from "react-native-paper";
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
import Icon from "react-native-vector-icons/Ionicons";
import IconSad from "react-native-vector-icons/MaterialIcons";
import IconSleep from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import SearchBar from "../../components/SearchBar/SearchBar";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  increaseLimitStatusProductsListActionCreator,
  setStatusActionCreator,
} from "../../redux/features/productSlice/productSlice";
import useProduct from "../../hooks/useProduct/useProduct";
import Loader from "../../components/Loader/Loader";

const StatusProductsScreen = (): JSX.Element => {
  const [productsShown, setShownProducts] = useState(false);
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
  const statusProductsAndSupplements = [
    ...statusProductsList,
    ...statusSupplementsList,
  ];
  const handlePress = (id: string) => {
    loadProduct(id);
    navigate.navigate("ProductDetail");
  };
  const handleHappy = () => {
    showProducts();
    dispatch(setStatusActionCreator("Contento"));
  };
  const handleSad = () => {
    showProducts();
    dispatch(setStatusActionCreator("Triste"));
  };
  const handleTired = () => {
    showProducts();
    dispatch(setStatusActionCreator("Cansado"));
  };
  const handleSleepy = () => {
    showProducts();
    dispatch(setStatusActionCreator("Dormido"));
  };
  useEffect(() => {
    searchProductsByStatus(status, statusProductsLimit);
  }, [status, statusProductsLimit]);
  const showProducts = () => {
    setShownProducts(true);
  };
  return (
    <PaperProvider>
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
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Roboto",
            textAlign: "center",
            fontWeight: "500",
            color: colors.dark,
            paddingBottom: 20,
          }}
        >
          ¿Cómo te encuentras hoy?
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 30,
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleHappy()}
          >
            <Icon
              name="happy-outline"
              style={{ fontSize: 45, textAlign: "center", color: "#7CFC83" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleSad()}
          >
            <Icon
              name="sad-outline"
              style={{ fontSize: 45, textAlign: "center", color: "#7449FC" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleTired()}
          >
            <IconSad
              name="sentiment-neutral"
              style={{ fontSize: 48, textAlign: "center", color: "#573CB0" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleSleepy()}
          >
            <IconSleep
              name="sleep"
              style={{ fontSize: 50, textAlign: "center", color: "#E6D74E" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {productsShown === true && (
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
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "Roboto",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: colors.dark,
                }}
              >
                PRODUCTOS Y SUPLEMENTOS
              </Text>
              {statusProductsAndSupplements.map((product, index) => (
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
                    <View
                      style={{
                        height: 250,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconCamera
                        name="camera"
                        style={{
                          fontSize: 80,
                          color: colors.dark,
                          borderRadius: 5,
                          padding: 10,
                        }}
                      />
                    </View>
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
                  </View>
                </TouchableOpacity>
              ))}
              {statusProductsAndSupplements.length > 1 && (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: colors.light,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderRadius: 5,
                  }}
                  onPress={() =>
                    dispatch(increaseLimitStatusProductsListActionCreator())
                  }
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      color: colors.dark,
                    }}
                  >
                    VER MÁS
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </PaperProvider>
  );
};

export default StatusProductsScreen;
