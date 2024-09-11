import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_CARS } from '../utils/queries';
import CarCard from '../components/CarCard';
import FilterSystem from '../components/FilterSystem';
import '../styles/InventoryPage.css';

const InventoryPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_CARS);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    yearRange: [1990, new Date().getFullYear()],
    make: [],
    mileageRange: [0, 200000],
    transmission: []
  });

  useEffect(() => {
    if (data && data.cars) {
      setFilteredCars(data.cars);
    }
  }, [data]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (term, currentFilters) => {
    if (!data || !data.cars) return;

    const filtered = data.cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(term) ||
        car.make.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term);

      const matchesPrice = car.price >= currentFilters.priceRange[0] && car.price <= currentFilters.priceRange[1];
      const matchesYear = car.year >= currentFilters.yearRange[0] && car.year <= currentFilters.yearRange[1];
      const matchesMake = currentFilters.make.length === 0 || currentFilters.make.includes(car.make);
      const matchesMileage = car.mileage >= currentFilters.mileageRange[0] && car.mileage <= currentFilters.mileageRange[1];
      const matchesTransmission = currentFilters.transmission.length === 0 || currentFilters.transmission.includes(car.transmission);

      return matchesSearch && matchesPrice && matchesYear && matchesMake && matchesMileage && matchesTransmission;
    });

    setFilteredCars(filtered);
  };

  if (loading) return <div className="inventory-loading">Loading...</div>;
  if (error) return <div className="inventory-error">Error: {error.message}</div>;

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h1 className="inventory-title">Explore Our Fleet</h1>
        <div className="inventory-search-container">
          <input 
            type="text" 
            placeholder="Search by make, model, or name" 
            value={searchTerm}
            onChange={handleSearch}
            className="inventory-search-input"
          />
        </div>
      </div>
      <div className="inventory-content">
        <FilterSystem filters={filters} onFilterChange={handleFilterChange} allCars={data.cars} />
        <div className="inventory-car-grid">
          {filteredCars.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;