import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;


export const QUERY_FEATURED_CARS = gql`
  query getFeaturedCars {
    featuredCars {
      _id
      name
      make
      model
      year
      price
      images
    }
  }
`;


export const GET_ALL_CARS = gql`
  query getAllCars {
    cars {
      _id
      name
      make
      model
      year
      price
      mileage
      exteriorColor
      images
      featured
    }
  }
`;

