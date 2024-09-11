import React from "react";
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import PerformanceGuarantee from "../components/PerformanceGuarantee";
import AboutUs from "../components/AboutUs";

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedCars />
      <PerformanceGuarantee />
      <AboutUs />
      {/* Add other homepage content here */}
    </div>
  );
}

export default HomePage;
