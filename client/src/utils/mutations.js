import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation adminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`;

export const ADD_CAR = gql`
  mutation addCar($carData: CarInput!) {
    addCar(carData: $carData) {
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

export const UPDATE_CAR = gql`
  mutation updateCar($_id: ID!, $carData: CarInput!) {
    updateCar(_id: $_id, carData: $carData) {
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

export const DELETE_CAR = gql`
  mutation deleteCar($_id: ID!) {
    deleteCar(_id: $_id) {
      _id
    }
  }
`;

export const ADD_TEST_DRIVE_REQUEST = gql`
  mutation addTestDriveRequest($carId: ID!, $name: String!, $phone: String!, $date: String!) {
    addTestDriveRequest(carId: $carId, name: $name, phone: $phone, date: $date) {
      _id
      car {
        _id
        name
      }
      name
      phone
      date
      status
    }
  }
`;
