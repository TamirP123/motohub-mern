import React, { useState } from 'react';
import { FaSearch, FaCar, FaDollarSign, FaCog } from 'react-icons/fa';
import '../styles/CarFinder.css';

const CarFinder = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the search, e.g., by updating URL parameters or calling an API
    console.log('Search params:', { make, model, minPrice, maxPrice });
  };

  return (
    <section className="car-finder">
      <div className="container">
        <h2 className="section-title">Find Your Perfect Ride</h2>
        <form onSubmit={handleSubmit} className="finder-form">
          <div className="input-group">
            <FaCar className="input-icon" />
            <input
              type="text"
              placeholder="Make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaCog className="input-icon" />
            <input
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaDollarSign className="input-icon" />
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaDollarSign className="input-icon" />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">
            <FaSearch /> Find Cars
          </button>
        </form>
      </div>
    </section>
  );
};

export default CarFinder;