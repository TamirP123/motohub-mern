import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import FeaturedCars from "../components/FeaturedCars";
import PerformanceGuarantee from "../components/PerformanceGuarantee";
import AboutUs from "../components/AboutUs";
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <NavbarComponent />
      <Hero />
      <FeaturedCars />
      <PerformanceGuarantee />
      <Testimonials />
      <AboutUs />
      
    </div>
  );
};

export default HomePage;
