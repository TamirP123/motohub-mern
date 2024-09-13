import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import car1Image from "../assets/car1.png";

function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        heroRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
        heroRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
      }
    };

    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerHTML = titleRef.current.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      <div className="hero-content">
        <h1 ref={titleRef}>
          Discover Your <span className="highlight">Future Ride</span>
        </h1>
        <p className="typing-text">Explore our collection of cutting-edge used cars</p>
        <Link to="/inventory" className="cta-button">View Inventory</Link>
      </div>
      <div className="hero-image">
        <img src={car1Image} alt="Futuristic Car" className="floating" />
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
