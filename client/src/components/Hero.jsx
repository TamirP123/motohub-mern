import React, { useEffect, useRef } from "react";
import "../styles/Hero.css";
import car1Image from "../assets/car1.png";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const title = document.querySelector(".hero-content h1");
    setInterval(() => {
      title.classList.add("glitch");
      setTimeout(() => title.classList.remove("glitch"), 200);
    }, 3000);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      const x = (clientX / offsetWidth - 0.5) * 20;
      const y = (clientY / offsetHeight - 0.5) * 20;
      heroRef.current.style.setProperty("--mouse-x", `${x}deg`);
      heroRef.current.style.setProperty("--mouse-y", `${y}deg`);
    };

    heroRef.current.addEventListener("mousemove", handleMouseMove);
    return () =>
      heroRef.current.removeEventListener("mousemove", handleMouseMove);
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
