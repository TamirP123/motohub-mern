import React from 'react';
import Hero from '../components/Hero';
import FeaturedCars from '../components/FeaturedCars';
import CarFinder from '../components/CarFinder';
import PerformanceGuarantee from '../components/PerformanceGuarantee';
import AboutUs from '../components/AboutUs';
import EasyTransaction from '../components/EasyTransaction';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedCars />
      <CarFinder />
      <PerformanceGuarantee />
      <EasyTransaction />
      <AboutUs />
      {/* Add other homepage content here */}
    </div>
  );
}

export default HomePage;
