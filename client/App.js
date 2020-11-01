import React from "react";

import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductListScreen from "./screens/ProductsScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import HeaderFavourite from "./components/HeaderFavourite";

import { ApolloProvider, ApolloClient } from "@apollo/client";

import { GRAPHQL_URL } from "./config";

import { cache } from "./graphql/cache";
import { resolvers } from "./graphql/resolvers";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache,
  resolvers,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "black",
          }}
        >
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{
              headerRight: () => <HeaderFavourite />,
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerRight: () => <HeaderFavourite />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
