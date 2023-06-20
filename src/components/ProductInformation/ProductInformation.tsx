import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconDeleteFavourite from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { List } from "react-native-paper";
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
import { Accordion } from "react-native-paper/lib/typescript/src/components/List/List";
import useProduct from "../../hooks/useProduct/useProduct";
import { Product } from "../../types/types";
import { deleteFavouriteProductsActionCreator } from "../../redux/features/productSlice/productSlice";

const { width } = Dimensions.get("window");

const ProductInformation = (): JSX.Element => {
  const { deleteFromFavourites } = useProduct();
  const dispatch = useAppDispatch();
  const myProducts = useAppSelector((state) => state.productActions.myProducts);
  const product = useAppSelector((state) => state.productActions.product);
  const searchFavouriteProduct = (property: keyof Product) => {
    return myProducts.some((item) => item[property] === product.ean);
  };
  const favourite = searchFavouriteProduct("ean");
  const [isFavourite, setFavourite] = useState(favourite);
  const user = useAppSelector((state) => state.userActions);
  const { addToFavourites } = useProduct();
  const handleFavourite = () => {
    addToFavourites(user.email, product.ean);
    setFavourite(!isFavourite);
  };
  const handleDelete = (ean: string) => {
    deleteFromFavourites(user.email, ean);
    dispatch(deleteFavouriteProductsActionCreator(ean));
    setFavourite(!isFavourite);
  };

  useEffect(() => {
    setFavourite(searchFavouriteProduct("ean"));
  }, []);
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
            marginBottom: 5,
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
                position: "relative",
              }}
              source={{
                uri: product.image,
              }}
            />
            {isFavourite && (
              <TouchableOpacity
                style={{ position: "absolute", right: 30, top: 30 }}
                onPress={() => handleDelete(product.ean)}
              >
                <IconDeleteFavourite
                  name="delete"
                  style={{
                    fontSize: 36,
                    color: colors.dark,

                    backgroundColor: colors.main,
                    borderRadius: 5,
                    padding: 10,
                  }}
                />
              </TouchableOpacity>
            )}
            {isFavourite !== true && (
              <TouchableOpacity
                style={{ position: "absolute", right: 30, top: 30 }}
                onPress={() => handleFavourite()}
              >
                <Icon
                  name="favorite"
                  style={{
                    fontSize: 36,
                    color: colors.dark,

                    backgroundColor: colors.main,
                    borderRadius: 5,
                    padding: 10,
                  }}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 35,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >
              {product.name.toUpperCase()}
            </Text>
            <Text
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 25,
                fontWeight: "300",
                textAlign: "center",
                marginTop: 5,
                fontFamily: "Roboto",
                paddingBottom: 45,
              }}
            >
              {product.description}
            </Text>
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
                fontSize: 30,
                fontFamily: "Roboto",
                fontWeight: "700",
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 25,
                textAlign: "center",
              }}
            >
              Nutritional benefits
            </Text>

            {product.benefits.map((benefit, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 23,
                  fontFamily: "Roboto",
                  fontWeight: "300",
                  paddingLeft: 15,
                  paddingRight: 15,
                  textAlign: "center",
                  paddingBottom: 10,
                }}
              >
                {benefit}
              </Text>
            ))}
            <List.Accordion
              title="How to use"
              style={{
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 5,
                marginTop: 25,
                backgroundColor: colors.main,
              }}
              titleStyle={{
                fontSize: 23,
                fontFamily: "Roboto",
                fontWeight: "400",
                color: colors.dark,
              }}
            >
              <List.Item
                title={`${product.howToUse}`}
                titleNumberOfLines={60}
                style={{ marginLeft: 15, marginRight: 15 }}
                titleStyle={{ fontSize: 20 }}
              />
            </List.Accordion>
            <List.Accordion
              title="Side effects"
              style={{
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 5,
                backgroundColor: colors.main,
              }}
              titleStyle={{
                fontSize: 23,
                fontFamily: "Roboto",
                fontWeight: "400",
                color: colors.dark,
              }}
            >
              <List.Item
                title={`${product.sideEffects}`}
                titleNumberOfLines={60}
                style={{ marginLeft: 15, marginRight: 15 }}
                titleStyle={{ fontSize: 20 }}
              />
            </List.Accordion>
            <List.Accordion
              title="Ingredients"
              titleStyle={{
                fontSize: 23,
                fontFamily: "Roboto",
                fontWeight: "400",
                color: colors.dark,
              }}
              style={{
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: colors.main,
                marginBottom: 5,
              }}
            >
              <List.Item
                title={product.ingredients}
                titleNumberOfLines={60}
                style={{ marginLeft: 15, marginRight: 15 }}
                titleStyle={{ fontSize: 20 }}
              />
            </List.Accordion>
            <List.Accordion
              title="Brands"
              style={{
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: colors.main,
                marginBottom: 5,
              }}
              titleStyle={{
                fontSize: 23,
                fontFamily: "Roboto",
                fontWeight: "400",
                color: colors.dark,
              }}
            >
              {product.brand.map((brand, index) => (
                <List.Item
                  title={brand}
                  key={index}
                  style={{ marginLeft: 15, marginRight: 15 }}
                  titleStyle={{ fontSize: 20 }}
                />
              ))}
            </List.Accordion>
            <List.Accordion
              title="Measures"
              style={{
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: colors.main,
              }}
              titleStyle={{
                fontSize: 23,
                fontFamily: "Roboto",
                fontWeight: "400",
                color: colors.dark,
              }}
            >
              <List.Item
                title={`${product.weight}g`}
                titleNumberOfLines={60}
                style={{ marginLeft: 15, marginRight: 15 }}
                titleStyle={{ fontSize: 20 }}
              />
            </List.Accordion>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default ProductInformation;
