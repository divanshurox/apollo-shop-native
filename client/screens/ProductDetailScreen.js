import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_COMMENTS_BY_ID } from "../graphql/requests";

import ProductCard from "../components/ProductCard";

const ProductDetailScreen = ({ navigation, route }) => {
  const {
    data: product,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT, {
    variables: {
      productId: route.params.productId,
    },
    fetchPolicy: "cache-first",
  });

  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
  } = useQuery(GET_COMMENTS_BY_ID, {
    variables: {
      productId: route.params.productId,
    },
    fetchPolicy: "cache-and-network",
  });

  if (productLoading || productError || commentsLoading || commentsError) {
    return (
      <View style={[styles.container, styles.flex]}>
        <ActivityIndicator color="dodgerblue" size="large" />
      </View>
    );
  }

  const renderHeader = () => {
    return <ProductCard item={product.product} />;
  };

  const renderComments = ({ item: comments }) => {
    return (
      <View style={[styles.flex, styles.shadow, styles.card]}>
        <Text>{comments.comment}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={comments.comments}
      keyExtractor={(ele) => ele.id}
      renderItem={renderComments}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ padding: 8 }}
    />
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    justifyContent: "center",
    alignItems: "center",
  },
});
