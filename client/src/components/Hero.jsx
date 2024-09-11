import React, { useEffect } from 'react';
import '../styles/Hero.css';
import car1Image from '../assets/car1.png';

function Hero() {
  useEffect(() => {
    const title = document.querySelector('.hero-content h1');
    setInterval(() => {
      title.classList.add('glitch');
      setTimeout(() => title.classList.remove('glitch'), 200);
    }, 3000);
  }, []);

  return (
    <div className="hero">
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      <div className="hero-content">
        <h1>Discover Your <span className="highlight">Future Ride</span></h1>
        <p>Explore our collection of cutting-edge used cars</p>
        <button className="cta-button">View Inventory</button>
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