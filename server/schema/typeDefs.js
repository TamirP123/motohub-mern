const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
}

type Car {
    _id: ID!
    name: String!
    make: String!
    model: String!
    year: Int!
    price: Float!
    mileage: Int!
    exteriorColor: String
    interiorColor: String
    fuelType: String
    transmission: String
    engine: String
    vin: String
    featured: Boolean
    images: [String]
    description: String
  }

type Query {
  users: [User]
  user(username: String!): User
  me: User
  cars: [Car]
  car(_id: ID!): Car
  featuredCars: [Car]
}

input CarInput {
    name: String!
    make: String!
    model: String!
    year: Int!
    price: Float!
    mileage: Int!
    exteriorColor: String
    interiorColor: String
    fuelType: String
    transmission: String
    engine: String
    vin: String
    featured: Boolean
    images: [String]
    description: String
  }

type Auth {
  token: ID
  user: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addCar(carData: CarInput!): Car
  updateCar(_id: ID!, carData: CarInput!): Car
  deleteCar(_id: ID!): Car
}
`;

module.exports = typeDefs