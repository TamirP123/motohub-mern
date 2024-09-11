import React from 'react';
import '../styles/PerformanceGuarantee.css';
import { FaCar, FaCheckCircle, FaTachometerAlt, FaCog } from 'react-icons/fa';

const PerformanceGuarantee = () => {
  return (
    <section className="performance-guarantee">
      <div className="container">
        <h2 className="section-title">Performance Guaranteed</h2>
        <p className="section-subtitle">Experience the thrill of authentic, high-performance vehicles</p>
        
        <div className="guarantee-grid">
          <div className="guarantee-item">
            <FaCar className="guarantee-icon" />
            <h3>Certified Pre-Owned</h3>
            <p>Every vehicle undergoes a rigorous 150-point inspection</p>
          </div>
          <div className="guarantee-item">
            <FaCheckCircle className="guarantee-icon" />
            <h3>Authenticity Assured</h3>
            <p>Verified history and documentation for every performance car</p>
          </div>
          <div className="guarantee-item">
            <FaTachometerAlt className="guarantee-icon" />
            <h3>Performance Tested</h3>
            <p>Each car is dynamometer tested to ensure peak performance</p>
          </div>
          <div className="guarantee-item">
            <FaCog className="guarantee-icon" />
            <h3>Expert Maintained</h3>
            <p>Serviced by certified technicians specializing in performance vehicles</p>
          </div>
        </div>

        <div className="cta-container">
          <button className="cta-button">Explore Our Inventory</button>
        </div>
      </div>
    </section>
  );
};

export default PerformanceGuarantee;