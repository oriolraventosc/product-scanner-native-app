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
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import IconNoResults from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useProduct from "../../hooks/useProduct/useProduct";
import Loader from "../../components/Loader/Loader";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { deleteFavouriteProductsActionCreator } from "../../redux/features/productSlice/productSlice";
import ModalComponent from "../../components/Modal/Modal";

const FavouriteProductsScreen = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { loadProduct, loadFavouriteProducts } = useProduct();
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation<ScreenNavigationProp>();
  const user = useAppSelector((state) => state.userActions);
  const products = useAppSelector((state) => state.productActions.myProducts);
  const loading = useAppSelector((state) => state.uiActions.loading);
  const { modal } = useAppSelector((state) => state.uiActions);

  const handlePress = (id: string) => {
    loadProduct(id);
    navigate.navigate("ProductDetail");
  };
  const { deleteFromFavourites } = useProduct();
  useEffect(() => {
    loadFavouriteProducts(user.email);
  }, [loadFavouriteProducts, user.email]);

  const handleDelete = (ean: string) => {
    deleteFromFavourites(user.email, ean);
    dispatch(deleteFavouriteProductsActionCreator(ean));
  };

  return (
    <>
      {modal && <ModalComponent />}
      {loading && <Loader />}
      {user.isLogged === false && navigate.navigate("Login")}
      {user.isLogged && (
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
              <View
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingBottom: 15,
                  width: "100%",
                  left: 0,
                  position: "relative",
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  marginTop: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: "Roboto",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: colors.dark,
                    paddingBottom: 20,
                    paddingTop: 10,
                  }}
                >
                  My products
                </Text>
                {products.length > 0 && (
                  <View
                    style={{
                      marginBottom: 10,
                      gap: 10,
                      display: "flex",
                    }}
                  >
                    {products.map((product, index) => (
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
                          >
                            <IconNoResults
                              name="delete"
                              style={{
                                fontSize: 36,
                                color: colors.dark,

                                backgroundColor: colors.main,
                                borderRadius: 5,
                                padding: 10,
                                textAlign: "center",
                              }}
                              onPress={() => handleDelete(product.ean)}
                            />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {products.length === 0 && (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 50,
                    }}
                  >
                    <IconNoResults
                      name="selection-search"
                      style={{ fontSize: 150, color: colors.main }}
                    />
                    <Text style={{ fontSize: 30 }}>0 products found...</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default FavouriteProductsScreen;
