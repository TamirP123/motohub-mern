const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  isAdmin: Boolean
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
  testDriveRequests: [TestDriveRequest]
}

type TestDriveRequest {
  _id: ID!
  car: Car!
  name: String!
  phone: String!
  date: String!
  status: String!
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
  adminLogin(email: String!, password: String!): Auth
  addTestDriveRequest(carId: ID!, name: String!, phone: String!, date: String!): TestDriveRequest
}
`;

module.exports = typeDefs