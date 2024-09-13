import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import car1Image from "../assets/car1.png";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Check if window exists before removing the event listener
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      <div className="hero-content">
        <h1>
          Discover Your <span className="highlight">Future Ride</span>
        </h1>
        <p>Explore our collection of cutting-edge used cars</p>
        <Link to="/inventory" className="cta-button">View Inventory</Link>
      </div>
      <div className="hero-image">
        <img src={car1Image} alt="Futuristic Car" />
      </div>
      <div className="futuristic-elements">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
    </div>
  );
}

export default Hero;
