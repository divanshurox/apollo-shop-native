import { InMemoryCache } from "@apollo/client";
import { GET_TOTAL_FAVOURITE } from "./requests";

export const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        favourite: {
          read(favourite = false) {
            return favourite;
          },
        },
      },
    },
    Query: {
      fields: {
        product(_, { args, toReference }) {
          return toReference({
            __typename: "Product",
            id: args.id,
          });
        },
      },
    },
  },
});

cache.writeQuery({
  query: GET_TOTAL_FAVOURITE,
  data: {
    favouriteProductsCount: 0,
  },
});
