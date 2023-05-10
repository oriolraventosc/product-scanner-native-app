import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import useProduct from "../../hooks/useProduct/useProduct";
import colors from "../../styles/colors";

const SearchBar = (): JSX.Element => {
  const navigate = useNavigation<ScreenNavigationProp>();
  const [product, setProduct] = useState("");
  const products = useAppSelector((state) => state.productActions.myProducts);
  const { loadProducts } = useProduct();
  useEffect(() => {
    loadProducts(product);
  }, [loadProducts, product]);

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
          marginTop: 1,
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
              fontSize: 25,
              borderWidth: 2,
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 20,
              fontFamily: "Roboto",
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
            onPress={() => loadProducts(product)}
          >
            <Text
              style={{ fontSize: 25, fontFamily: "Roboto", fontWeight: "500" }}
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
              }}
            >
              {products.map((product, index) => (
                <View
                  key={index}
                  style={{
                    borderColor: "#c0bcbc57",
                    borderWidth: 2,
                    position: "relative",
                    maxWidth: 500,
                    borderRadius: 5,
                    width: "100%",
                  }}
                >
                  <Image
                    style={{ height: 400 }}
                    source={{
                      uri: product.image,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 35,
                      fontFamily: "Roboto",
                      textAlign: "center",
                      paddingBottom: 10,
                    }}
                  >
                    {product.name.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchBar;
