import React from 'react';
import Hero from '../components/Hero';
import FeaturedCars from '../components/FeaturedCars';
import PerformanceGuarantee from '../components/PerformanceGuarantee';
import EasyTransaction from '../components/EasyTransaction';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedCars />
      <PerformanceGuarantee />
      <EasyTransaction />
      {/* Add other homepage content here */}
    </div>
  );
}

export default HomePage;
