import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaCog, FaShieldAlt } from "react-icons/fa";
import "../styles/AboutUs.css";

const AboutUs = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    const animation = animationRef.current;
    let frame = 0;

    const animate = () => {
      frame += 0.02;
      const scale = 1 + Math.sin(frame) * 0.1;
      const rotate = Math.sin(frame * 0.5) * 15;
      animation.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="about-us">
      <div className="container">
        <h2 className="section-title">The Motohub Advantage</h2>
        <div className="about-content">
          <div className="about-animation">
            <div className="hologram" ref={animationRef}>
              <div className="hologram-ring"></div>
              <div className="hologram-ring"></div>
              <div className="hologram-ring"></div>
              <div className="hologram-core"></div>
            </div>
          </div>
          <div className="about-text">
            <p>
              At Motohub, we're redefining the pre-owned vehicle experience. Our
              passion for cutting-edge technology and unparalleled performance
              sets us apart in the automotive world.
            </p>
            <ul className="feature-list">
              <li>
                <FaRocket />{" "}
                <span>Curated selection of high-performance vehicles</span>
              </li>
              <li>
                <FaCog /> <span>State-of-the-art maintenance and upgrades</span>
              </li>
              <li>
                <FaShieldAlt /> <span>Comprehensive warranty and support</span>
              </li>
            </ul>
            <p>
              Experience the thrill of driving tomorrow's technology today. With
              Motohub, you're not just buying a car – you're investing in the
              future of automotive excellence.
            </p>
            <Link to={`/about`}>
            <button className="cta-button">Explore Our Vision</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
