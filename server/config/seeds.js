const db = require('./connection');
const { User, Car } = require('../models');

db.once('open', async () => {
  await Car.deleteMany({});

  const carData = [
    {
      name: 'Honda Civic Si',
      make: 'Honda',
      model: 'Civic Si',
      year: 2015,
      price: 11999,
      mileage: 75000,
      exteriorColor: 'Blue',
      interiorColor: 'Black',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      engine: '2.4L I4',
      vin: 'ABC123456789',
      featured: true,
      images: ['hondaMain.png'],
      description: 'Sporty and reliable Honda Civic Si'
    },
    {
      name: 'Ford Fiesta ST',
      make: 'Ford',
      model: 'Fiesta ST',
      year: 2016,
      price: 9999,
      mileage: 65000,
      exteriorColor: 'Red',
      interiorColor: 'Black',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      engine: '1.6L I4 Turbo',
      vin: 'DEF987654321',
      featured: true,
      images: ['fordMain.png'],
      description: 'Fun and zippy Ford Fiesta ST'
    },
    {
      name: 'Mazda MX-5 Miata',
      make: 'Mazda',
      model: 'MX-5 Miata',
      year: 2013,
      price: 11499,
      mileage: 80000,
      exteriorColor: 'Red',
      interiorColor: 'Black',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      engine: '2.0L I4',
      vin: 'GHI123789456',
      featured: true,
      images: ['mazdaMain.png'], // Change this line
      description: 'Classic roadster experience with the Mazda MX-5 Miata'
    },
    {
      name: 'Nissan Altima',
      make: 'Nissan',
      model: 'Altima',
      year: 2004,
      price: 3500,
      mileage: 150000,
      exteriorColor: 'Silver',
      interiorColor: 'Gray',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      engine: '2.5L I4',
      vin: 'JKL456123789',
      featured: true,
      images: ['nissanMain.png'],
      description: 'Reliable and economical Nissan Altima'
    },
    // Add more cars here...
  ];

  const cars = await Car.insertMany(carData);
  console.log('Cars seeded:', cars.length);

  process.exit();
});
