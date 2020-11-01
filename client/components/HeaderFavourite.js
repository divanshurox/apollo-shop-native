import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useQuery } from "@apollo/client";

import { GET_TOTAL_FAVOURITE } from "../graphql/requests";

const HeaderFavourite = () => {
  const { data } = useQuery(GET_TOTAL_FAVOURITE);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.favouriteProductsCount}</Text>
    </View>
  );
};

export default HeaderFavourite;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
});
