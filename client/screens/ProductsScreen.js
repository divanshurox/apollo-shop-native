import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/requests";

import Product from "../components/ProductCard";

const ProductsScreen = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading || error) {
    return (
      <View style={[styles.container, styles.flex]}>
        <ActivityIndicator color="dodgerblue" size="large" />
      </View>
    );
  }

  const renderProducts = ({ item }) => {
    return (
      <Product
        item={item}
        onPress={() => {
          navigation.navigate("ProductDetail", {
            productId: item.id,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.products}
        renderItem={renderProducts}
        key={(ele) => ele.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});
