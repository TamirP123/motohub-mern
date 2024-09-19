const { User, Car, TestDriveRequest } = require('../models')
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
        console.log("Car found:", car); // Add this log
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
    testDriveRequests: async () => {
      return await TestDriveRequest.find().populate('car');
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
      try {
        const newCar = await Car.create(carData);
        return newCar;
      } catch (error) {
        console.error("Error adding car:", error);
        throw new Error("Failed to add car");
      }
    },
    updateCar: async (parent, { _id, carData }) => {
      return await Car.findByIdAndUpdate(_id, carData, { new: true });
    },
    deleteCar: async (parent, { _id }) => {
      return await Car.findByIdAndDelete(_id);
    },
    adminLogin: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("Login attempt for:", email);
      console.log("User found:", user);

      if (!user || !user.isAdmin) {
        console.log("Invalid credentials or not an admin");
        throw new AuthenticationError('Invalid credentials or not an admin');
      }

      console.log("Attempting password comparison");
      const correctPw = await user.isCorrectPassword(password);
      console.log("Password correct:", correctPw);

      if (!correctPw) {
        console.log("Invalid credentials");
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken({
        _id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
      });
      console.log("Token generated:", token); // Debug log
      return { token, user };
    },
    addTestDriveRequest: async (parent, { carId, name, phone, date }) => {
      try {
        console.log('Received request:', { carId, name, phone, date });
        const car = await Car.findById(carId);
        if (!car) {
          throw new Error('Car not found');
        }
        const testDriveRequest = await TestDriveRequest.create({
          car: carId,
          name,
          phone,
          date,
          status: 'Pending'
        });
        const populatedRequest = await TestDriveRequest.findById(testDriveRequest._id).populate('car');
        console.log('Created test drive request:', populatedRequest);
        return populatedRequest;
      } catch (error) {
        console.error('Error creating test drive request:', error);
        throw new Error('Failed to create test drive request: ' + error.message);
      }
    },
  },
};

module.exports = resolvers