import React, { useEffect, useState } from "react";
import IconCamera from "react-native-vector-icons/Entypo";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useProduct from "../../hooks/useProduct/useProduct";
import colors from "../../styles/colors";
import { increaseLimitProductsListActionCreator } from "../../redux/features/productSlice/productSlice";
const SearchBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<ScreenNavigationProp>();
  const handlePress = (id: string) => {
    loadProduct(id);
    navigate.navigate("ProductDetail");
  };
  const [product, setProduct] = useState("");
  const products = useAppSelector((state) => state.productActions.productsList);
  const { productsListLimit } = useAppSelector((state) => state.productActions);
  const { loadProducts, loadProduct } = useProduct();
  useEffect(() => {
    loadProducts(product, productsListLimit);
  }, [loadProducts, productsListLimit]);

  return (
    <>
      <SafeAreaView
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 15,
          width: "100%",
          left: 0,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          flexDirection: "column",
          marginTop: 15,
        }}
      >
        <View
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#fff",
            marginTop: 1,
          }}
        >
          <TextInput
            style={{
              color: colors.dark,
              fontSize: 20,
              borderWidth: 2,
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 20,
              fontFamily: "Roboto",
              borderColor: colors.dark,
            }}
            placeholder="Escribe el nombre de un producto..."
            onChangeText={setProduct}
            value={product.toLowerCase()}
          />
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: colors.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 20,
              borderRadius: 5,
            }}
            onPress={() => loadProducts(product, productsListLimit)}
          >
            <Text
              style={{ fontSize: 20, fontFamily: "Roboto", fontWeight: "500" }}
            >
              BUSCAR
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          {products.length > 0 && (
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                gap: 10,
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
            </View>
          )}
          {products.length > 1 && (
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
              onPress={() => dispatch(increaseLimitProductsListActionCreator())}
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
          {products.length === 0 && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                marginTop: 100,
              }}
            >
              <Icon
                name="selection-search"
                style={{ fontSize: 150, color: colors.main }}
              />
              <Text style={{ fontSize: 30 }}>No hay resultados...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchBar;
