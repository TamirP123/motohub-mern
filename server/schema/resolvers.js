const { User, Car } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    cars: async () => {
      try {
        return await Car.find({});
      } catch (error) {
        console.error("Error fetching cars:", error);
        throw new Error("Failed to fetch cars");
      }
    },
    car: async (parent, { _id }) => {
      try {
        const car = await Car.findById(_id);
        if (!car) {
          throw new Error('Car not found');
        }
        return car;
      } catch (error) {
        console.error("Error fetching car:", error);
        throw new Error("Failed to fetch car");
      }
    },
    featuredCars: async () => {
      try {
        const cars = await Car.find({ featured: true });
        console.log("Featured cars found:", cars);
        return cars;
      } catch (error) {
        console.error("Error fetching featured cars:", error);
        throw new Error("Failed to fetch featured cars");
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addCar: async (parent, { carData }) => {
      return await Car.create(carData);
    },
    updateCar: async (parent, { _id, carData }) => {
      return await Car.findByIdAndUpdate(_id, carData, { new: true });
    },
    deleteCar: async (parent, { _id }) => {
      return await Car.findByIdAndDelete(_id);
    },
  },
};

module.exports = resolvers