const db = require("./connection");
const { User, Car } = require("../models");

db.once("open", async () => {
  await Car.deleteMany({});

  const carData = [
    {
      name: "Honda Civic Si",
      make: "Honda",
      model: "Civic Si",
      year: 2015,
      price: 11999,
      mileage: 75000,
      exteriorColor: "Blue",
      interiorColor: "Black",
      fuelType: "Gasoline",
      transmission: "Manual",
      engine: "2.4L I4",
      vin: "ABC123456789",
      featured: true,
      images: ["hondaMain.png", "hondaSide.png", "hondaBack.png", "hondaView.png"],
      description: "Sporty and reliable Honda Civic Si",
    },
    {
      name: "Ford Fiesta ST",
      make: "Ford",
      model: "Fiesta ST",
      year: 2016,
      price: 9999,
      mileage: 65000,
      exteriorColor: "Red",
      interiorColor: "Black",
      fuelType: "Gasoline",
      transmission: "Manual",
      engine: "1.6L I4 Turbo",
      vin: "DEF987654321",
      featured: true,
      images: ["fordMain.png", "fordBack.png", "fordFront.png"],
      description: "Fun and zippy Ford Fiesta ST",
    },
    {
      name: "Mazda MX-5 Miata",
      make: "Mazda",
      model: "MX-5 Miata",
      year: 2013,
      price: 11499,
      mileage: 80000,
      exteriorColor: "Red",
      interiorColor: "Black",
      fuelType: "Gasoline",
      transmission: "Manual",
      engine: "2.0L I4",
      vin: "GHI123789456",
      featured: true,
      images: ["mazdaMain.png", "mazdaBack.png", "mazdaFront.png"],
      description: "Classic roadster experience with the Mazda MX-5 Miata",
    },
    {
      name: "Nissan Altima",
      make: "Nissan",
      model: "Altima",
      year: 2004,
      price: 3500,
      mileage: 150000,
      exteriorColor: "Silver",
      interiorColor: "Gray",
      fuelType: "Gasoline",
      transmission: "Automatic",
      engine: "2.5L I4",
      vin: "JKL456123789",
      featured: true,
      images: ["nissanMain.png", "nissanBack.png", "nissanFront.png"],
      description: "Reliable and economical Nissan Altima",
    },
    // Add more cars here...
    {
      name: "Toyota Corolla LE",
      make: "Toyota",
      model: "Corolla",
      year: 2005,
      price: 4500,
      mileage: 120000,
      exteriorColor: "Red",
      interiorColor: "Gray",
      fuelType: "Gasoline",
      transmission: "Automatic",
      engine: "1.8L I4",
      vin: "MNO789456123",
      featured: false,
      images: ["toyotaCorollaMain.png", "toyotaCorollaBack.png", "toyotaCorollaFront.png", "toyotaCorollaInterior.png"],
      description: "Reliable and fuel-efficient Toyota Corolla LE",
    },
    {
      name: "Nissan Sentra S",
      make: "Nissan",
      model: "Sentra",
      year: 2007,
      price: 3999,
      mileage: 135000,
      exteriorColor: "Blue",
      interiorColor: "Beige",
      fuelType: "Gasoline",
      transmission: "Automatic",
      engine: "2.0L I4",
      vin: "PQR321654987",
      featured: false,
      images: ["nissanSentraMain.png", "nissanSentraBack.png", "nissanSentraFront.png", "nissanSentraInterior.png"],
      description: "Economical and practical Nissan Sentra S",
    },
    {
      name: "Honda Accord EX",
      make: "Honda",
      model: "Accord",
      year: 2006,
      price: 5500,
      mileage: 110000,
      exteriorColor: "Black",
      interiorColor: "Tan",
      fuelType: "Gasoline",
      transmission: "Automatic",
      engine: "2.4L I4",
      vin: "STU654987321",
      featured: false,
      images: ["hondaAccordMain.png", "hondaAccordBack.png", "hondaAccordFront.png", "hondaAccordInterior.png"],
      description: "Well-maintained Honda Accord EX with leather interior",
    },
    {
      name: "Toyota Camry LE",
      make: "Toyota",
      model: "Camry",
      year: 2008,
      price: 6200,
      mileage: 95000,
      exteriorColor: "White",
      interiorColor: "Gray",
      fuelType: "Gasoline",
      transmission: "Automatic",
      engine: "2.4L I4",
      vin: "VWX987321654",
      featured: false,
      images: ["toyotaCamryMain.png", "toyotaCamryBack.png", "toyotaCamrySide.png", "toyotaCamryInterior.png"],
      description: "Spacious and comfortable Toyota Camry LE",
    },
    {
      name: "Mazda3 i Sport",
      make: "Mazda",
      model: "Mazda3",
      year: 2007,
      price: 4800,
      mileage: 125000,
      exteriorColor: "Red",
      interiorColor: "Black",
      fuelType: "Gasoline",
      transmission: "Manual",
      engine: "2.0L I4",
      vin: "YZA159753456",
      featured: false,
      images: ["mazda3Main.png", "mazda3Back.png", "mazda3Side.png", "mazda3Interior.png"],
      description: "Sporty and fun-to-drive Mazda3 i Sport",
    },
    {
      name: "Ford Focus ZX4",
      make: "Ford",
      model: "Focus",
      year: 2005,
      price: 3200,
      mileage: 140000,
      exteriorColor: "Green",
      interiorColor: "Gray",
      fuelType: "Gasoline",
      transmission: "Manual",
      engine: "2.0L I4",
      vin: "BCD246813579",
      featured: false,
      images: ["fordFocusMain.png", "fordFocusBack.png", "fordFocusSide.png", "fordFocusInterior.png"],
      description: "Budget-friendly Ford Focus ZX4 with great fuel economy",
    },
    {
      name: "Chevrolet Malibu LT",
      make: "Chevrolet",
      model: "Malibu",
      year: 2008,
      price: 5100,
      mileage: 105000,
      exteriorColor: "Gold",
      interiorColor: "Tan",
      fuelType: "Gasoline",
      transmission: "Automatic",
      engine: "2.4L I4",
      vin: "EFG369258147",
      featured: false,
      images: ["chevyMalibuMain.png", "chevyMalibuBack.png", "chevyMalibuSide.png", "chevyMalibuInterior.png"],
      description: "Comfortable and reliable Chevrolet Malibu LT",
    },
  ];

  const cars = await Car.insertMany(carData);
  console.log("Cars seeded:", cars.length);

  process.exit();
});
