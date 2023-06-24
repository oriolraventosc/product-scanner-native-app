import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../redux/hooks";
import useProduct from "../../hooks/useProduct/useProduct";
import colors from "../../styles/colors";

const SearchBar = (): JSX.Element => {
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
  }, [loadProducts, product, productsListLimit]);

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
            placeholder="Search here..."
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
              SEARCH
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
                marginTop: 100,
              }}
            >
              <Icon
                name="selection-search"
                style={{ fontSize: 150, color: colors.main }}
              />
              <Text style={{ fontSize: 30 }}>No results found...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchBar;
