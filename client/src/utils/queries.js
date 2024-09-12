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

// Add this new query
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
      interiorColor
      transmission
      featured
      images
    }
  }
`;

export const GET_CAR_DETAILS = gql`
  query getCarDetails($carId: ID!) {
    car(_id: $carId) {
      _id
      name
      make
      model
      year
      price
      mileage
      exteriorColor
      interiorColor
      fuelType
      transmission
      engine
      vin
      featured
      images
      description
    }
  }
`;
