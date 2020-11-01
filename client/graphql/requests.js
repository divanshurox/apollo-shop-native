import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    price
    description
    favourite @client
    thumb {
      id
      url
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COMMENTS_BY_ID = gql`
  query GetCommentsById($productId: ID!) {
    comments(sort: "id:desc", where: { product: { id: $productId } }) {
      id
      comment
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_TOTAL_FAVOURITE = gql`
  query GetTotalFavourite {
    favouriteProductsCount @client
  }
`;

export const ADD_OR_REMOVE_FROM_FAVOURITE = gql`
  mutation AddOrRemoveFromFavourite($productId: ID!) {
    addOrRemoveFromFavourite(productId: $productId) @client
  }
`;

export const FAVOURITE_PRODUCT_FRAGMENT = gql`
  fragment FavouriteProductFragment on Product {
    favourite
  }
`;
