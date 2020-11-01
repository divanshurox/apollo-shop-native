import {
  FAVOURITE_PRODUCT_FRAGMENT,
  GET_TOTAL_FAVOURITE,
} from "../graphql/requests";

export const resolvers = {
  Mutation: {
    addOrRemoveFromFavourite(_root, args, { client, cache }) {
      const productId = cache.identify({
        __typename: "Product",
        id: args.productId,
      });
      const { favourite } = client.readFragment({
        fragment: FAVOURITE_PRODUCT_FRAGMENT,
        id: productId,
      });
      client.writeFragment({
        fragment: FAVOURITE_PRODUCT_FRAGMENT,
        id: productId,
        data: {
          favourite: !favourite,
        },
      });
      const { favouriteProductsCount } = client.readQuery({
        query: GET_TOTAL_FAVOURITE,
      });
      client.writeQuery({
        query: GET_TOTAL_FAVOURITE,
        data: {
          favouriteProductsCount: favourite
            ? favouriteProductsCount - 1
            : favouriteProductsCount + 1,
        },
      });
    },
  },
};
