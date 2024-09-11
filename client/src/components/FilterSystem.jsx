import React from 'react';
import { Slider, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import '../styles/FilterSystem.css';

const FilterSystem = ({ filters, onFilterChange, allCars }) => {
  const handlePriceChange = (event, newValue) => {
    onFilterChange({ ...filters, priceRange: newValue });
  };

  const handleYearChange = (event, newValue) => {
    onFilterChange({ ...filters, yearRange: newValue });
  };

  const handleMileageChange = (event, newValue) => {
    onFilterChange({ ...filters, mileageRange: newValue });
  };

  const handleMakeChange = (event) => {
    const newMakes = event.target.checked
      ? [...filters.make, event.target.name]
      : filters.make.filter(make => make !== event.target.name);
    onFilterChange({ ...filters, make: newMakes });
  };

  const handleTransmissionChange = (event) => {
    const newTransmissions = event.target.checked
      ? [...filters.transmission, event.target.name]
      : filters.transmission.filter(trans => trans !== event.target.name);
    onFilterChange({ ...filters, transmission: newTransmissions });
  };

  const uniqueMakes = [...new Set(allCars.map(car => car.make))];
  const uniqueTransmissions = [...new Set(allCars.map(car => car.transmission))];

  return (
    <div className="filter-system">
      <h2>Refine Your Search</h2>
      
      <div className="filter-section">
        <h3>Price Range</h3>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={100000}
          step={1000}
        />
        <div className="range-labels">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="filter-section">
        <h3>Year Range</h3>
        <Slider
          value={filters.yearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={1990}
          max={new Date().getFullYear()}
          step={1}
        />
        <div className="range-labels">
          <span>{filters.yearRange[0]}</span>
          <span>{filters.yearRange[1]}</span>
        </div>
      </div>

      <div className="filter-section">
        <h3>Mileage Range</h3>
        <Slider
          value={filters.mileageRange}
          onChange={handleMileageChange}
          valueLabelDisplay="auto"
          min={0}
          max={200000}
          step={5000}
        />
        <div className="range-labels">
          <span>{filters.mileageRange[0]} miles</span>
          <span>{filters.mileageRange[1]} miles</span>
        </div>
      </div>

      <div className="filter-section">
        <h3>Make</h3>
        <FormGroup>
          {uniqueMakes.map(make => (
            <FormControlLabel
              key={make}
              control={<Checkbox checked={filters.make.includes(make)} onChange={handleMakeChange} name={make} />}
              label={make}
            />
          ))}
        </FormGroup>
      </div>

      <div className="filter-section">
        <h3>Transmission</h3>
        <FormGroup>
          {uniqueTransmissions.map(transmission => (
            <FormControlLabel
              key={transmission}
              control={<Checkbox checked={filters.transmission.includes(transmission)} onChange={handleTransmissionChange} name={transmission} />}
              label={transmission}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
};

export default FilterSystem;