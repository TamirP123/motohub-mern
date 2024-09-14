import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CAR_DETAILS } from '../utils/queries';
import Carousel from 'react-bootstrap/Carousel';
import { FaCar, FaTachometerAlt, FaGasPump, FaCogs } from 'react-icons/fa';
import '../styles/CarDetailsPage.css';
import TestDriveModal from '../components/TestDriveModal';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const { loading, error, data } = useQuery(GET_CAR_DETAILS, {
    variables: { carId: id },
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!data || !data.car) return <div className="error">Car not found</div>;

  const car = data.car;

  const getImagePath = (car, image) => {
    const make = car.make.toLowerCase();
    let model = car.model.toLowerCase().replace(/\s+/g, "-");
    
    // Special case for Mazda MX-5 Miata
    if (make === "mazda" && model.includes("mx-5")) {
      model = "mx5-miata";
    }
    
    const folderName = `${make}-${model}`;
    return `/images/${folderName}/${image}`;
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const handleScheduleTestDrive = () => {
    setShowTestDriveModal(true);
  };

  return (
    <div className="car-details-page">
      <div className="car-details-container">
        <h1 className="car-title">{car.name}</h1>
        <div className="car-content">
          <div className="car-images">
            <Carousel>
              {car.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={getImagePath(car, image)}
                    alt={`${car.name} - View ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="car-info">
            <div className="car-price-badge">${car.price.toLocaleString()}</div>
            <div className="car-quick-info">
              <div className="info-item">
                <FaCar />
                <span>{car.year}</span>
              </div>
              <div className="info-item">
                <FaTachometerAlt />
                <span>{car.mileage.toLocaleString()} miles</span>
              </div>
              <div className="info-item">
                <FaGasPump />
                <span>{car.fuelType}</span>
              </div>
              <div className="info-item">
                <FaCogs />
                <span>{car.transmission}</span>
              </div>
            </div>
            <div className="car-details-grid">
              <div className="detail-item">
                <strong>Make:</strong> {car.make}
              </div>
              <div className="detail-item">
                <strong>Model:</strong> {car.model}
              </div>
              <div className="detail-item">
                <strong>Exterior Color:</strong> {car.exteriorColor}
              </div>
              <div className="detail-item">
                <strong>Interior Color:</strong> {car.interiorColor}
              </div>
              <div className="detail-item">
                <strong>Engine:</strong> {car.engine}
              </div>
              <div className="detail-item">
                <strong>VIN:</strong> {car.vin}
              </div>
            </div>
            <p className="car-description">{car.description}</p>
            <div className="cta-buttons">
              <button className="cta-button primary" onClick={handleScheduleTestDrive}>Schedule Test Drive</button>
              <button className="cta-button secondary" onClick={handleContactUs}>Contact Us</button>
            </div>
          </div>
        </div>
      </div>
      <TestDriveModal
        show={showTestDriveModal}
        onHide={() => setShowTestDriveModal(false)}
        car={car}
      />
    </div>
  );
};

export default CarDetailsPage;