import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Svg, Path } from "react-native-svg";

const FavouriteIcon = ({ isFavourite, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Svg
        width={30}
        height={30}
        viewBox="0 0 24 24"
        fill={isFavourite ? "white" : "none"}
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </Svg>
    </TouchableOpacity>
  );
};

export default FavouriteIcon;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    right: 20,
    top: 215,
    alignItems: "center",
    justifyContent: "center",
  },
});
