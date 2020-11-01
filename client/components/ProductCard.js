import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { BASE_URL } from "../config";
import { useMutation } from "@apollo/client";

import { ADD_OR_REMOVE_FROM_FAVOURITE } from "../graphql/requests";

import FavouriteIcon from "./FavouriteIcon";

const ProductCard = ({ item, onPress }) => {
  const [addOrRemoveFavourite] = useMutation(ADD_OR_REMOVE_FROM_FAVOURITE, {
    variables: {
      productId: item.id,
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      style={(styles.flex, styles.shadow, styles.card)}
    >
      <Image
        source={{
          uri: BASE_URL + item.thumb[0].url,
        }}
        style={styles.image}
      />
      <FavouriteIcon
        isFavourite={item.favourite}
        onPress={async () => {
          await addOrRemoveFavourite();
        }}
      />
      <View
        style={[
          styles.row,
          {
            justifyContent: "space-between",
            marginVertical: 20,
            alignItems: "center",
            marginTop: 70,
          },
        ]}
      >
        <Text style={{ fontWeight: "700", fontSize: 22 }}>{item.name}</Text>
        <Text>{"₹ " + item.price}</Text>
      </View>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    padding: 15,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
