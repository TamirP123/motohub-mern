import React from 'react';
import '../styles/FeaturedCars.css';

const FeaturedCars = () => {
  const featuredCars = [
    { id: 1, name: 'Honda Civic Si', year: 2015, price: 11999, folder: 'honda-civic-si', image: 'hondaMain.png' },
    { id: 2, name: 'Ford Fiesta ST', year: 2016, price: 9999, folder: 'ford-fiesta-st', image: 'fordMain.png' },
    { id: 3, name: 'Mazda MX-5 Miata', year: 2013, price: 11499, folder: 'mazda-mx5', image: 'mazdaMain.png' },
    { id: 4, name: 'Nissan Altima', year: 2004, price: 3500, folder: 'nissan-altima', image: 'nissanMain.png' },
  ];

  return (
    <section className="featured-cars">
      <div className="container">
        <h2 className="section-title">Featured Performance Deals</h2>
        <div className="car-grid">
          {featuredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img 
                src={`/images/${car.folder}/${car.image}`} 
                alt={`${car.name}`} 
                className="car-image" 
              />
              <div className="car-details">
                <h3>{car.name}</h3>
                <p>{car.year}</p>
                <p className="price">${car.price.toLocaleString()}</p>
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;