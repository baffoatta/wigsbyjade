import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($categoryIn: [String]) {
    products(where: { categoryIn: $categoryIn }) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
      }
      ... on VariableProduct {
        price
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
      authToken
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(
      input: { clientMutationId: "uniqueId", username: $username, email: $email, password: $password }
    ) {
      user {
        id
        email
      }
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders {
    customer {
      orders {
        nodes {
          id
          orderNumber
          date
          total
          status
        }
      }
    }
  }
`;

export const PRODUCT_SEARCH_QUERY = gql`
  query ProductSearch($search: String!) {
    products(where: { search: $search }) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    productCategories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
