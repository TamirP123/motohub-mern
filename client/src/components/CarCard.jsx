import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
  const getImagePath = (car) => {
    let modelPath = car.model.toLowerCase().replace(/\s+/g, '-');
    if (car.make.toLowerCase() === 'mazda' && car.model.toLowerCase().includes('mx-5')) {
      modelPath = 'mx5-miata';
    }
    return `/images/${car.make.toLowerCase()}-${modelPath}/${car.images[0]}`;
  };

  return (
    <div className="inventory-car-card">
      <div className="inventory-car-image-container">
        <img 
          src={getImagePath(car)} 
          alt={car.name} 
          className="inventory-car-image" 
          onError={(e) => {
            console.error(`Failed to load image for ${car.name}:`, e.target.src);
            e.target.onerror = null;
            e.target.src = '/images/placeholder.png';
          }}
        />
        {car.featured && <span className="inventory-featured-badge">Featured</span>}
      </div>
      <div className="inventory-car-info">
        <h2 className="inventory-car-name">{car.name}</h2>
        <p className="inventory-car-price">${car.price.toLocaleString()}</p>
        <p className="inventory-car-details">
          {car.year} • {car.mileage.toLocaleString()} miles • {car.exteriorColor}
        </p>
        <Link to={`/car/${car._id}`} className="inventory-view-details-btn">View Details</Link>
      </div>
    </div>
  );
};

export default CarCard;