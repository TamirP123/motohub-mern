const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  exteriorColor: String,
  interiorColor: String,
  fuelType: String,
  transmission: String,
  engine: String,
  vin: {
    type: String,
    unique: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [String],
  description: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;