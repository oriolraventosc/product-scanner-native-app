import React from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../../styles/colors";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ProductInformation = (): JSX.Element => {
  const product = useAppSelector((state) => state.productActions.product);
  return (
    <>
      <ScrollView>
        <SafeAreaView
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 15,
            left: 0,
            position: "relative",
            flexDirection: "column",
            marginTop: 1,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "#f5f5f5",
              width,
              left: -15,
              paddingTop: 40,
            }}
          >
            <Image
              style={{
                height: 400,
              }}
              source={{
                uri: product.image,
              }}
            />
            <Text
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {product.name.toUpperCase()}
            </Text>
            <Text
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 30,
                fontWeight: "400",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {product.description}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.main,
                marginLeft: 20,
                marginRight: 20,
                paddingTop: 15,
                paddingBottom: 15,
                borderRadius: 5,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                Add to favourites
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width,
              left: -15,
              paddingTop: 10,
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontFamily: "Roboto",
                fontWeight: "700",
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              Ingredients
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Roboto",
                fontWeight: "500",
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              {product.ingredients}
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontFamily: "Roboto",
                fontWeight: "700",
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 25,
              }}
            >
              Brands
            </Text>

            {product.brand.map((brand, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 25,
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  paddingLeft: 15,
                  paddingRight: 15,
                  color: colors.main,
                }}
              >
                {brand}
              </Text>
            ))}

            <Text
              style={{
                fontSize: 40,
                fontFamily: "Roboto",
                fontWeight: "700",
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 25,
              }}
            >
              Measures
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Roboto",
                fontWeight: "500",
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              Net content: {product.weight}g
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontFamily: "Roboto",
                fontWeight: "700",
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 25,
              }}
            >
              Nutritional benefits
            </Text>

            {product.benefits.map((benefit, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 25,
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              >
                ·{benefit}
              </Text>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default ProductInformation;
