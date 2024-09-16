import React from 'react';
import {Link} from'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="about-page__title">About MotoHub</h1>
      
      <section className="about-page__section about-page__mission">
        <h2>Our Mission</h2>
        <p>At MotoHub, we're driven by a passion for connecting people with their perfect vehicles. Our mission is to revolutionize the used car buying experience by offering a curated selection of high-quality vehicles, transparent pricing, and unparalleled customer service.</p>
      </section>
      
      <section className="about-page__section about-page__features">
        <h2>Why Choose MotoHub?</h2>
        <ul className="about-page__feature-list">
          <li>
            <i className="fas fa-car"></i>
            <span>Extensive selection of inspected used cars</span>
          </li>
          <li>
            <i className="fas fa-dollar-sign"></i>
            <span>Competitive pricing and financing options</span>
          </li>
          <li>
            <i className="fas fa-user-tie"></i>
            <span>Expert staff to find your ideal vehicle</span>
          </li>
          <li>
            <i className="fas fa-history"></i>
            <span>Comprehensive vehicle history reports</span>
          </li>
          <li>
            <i className="fas fa-handshake"></i>
            <span>Hassle-free, transparent buying process</span>
          </li>
        </ul>
      </section>
      
      <section className="about-page__section about-page__commitment">
        <h2>Our Commitment</h2>
        <p>We understand that buying a used car is a significant decision. That's why we're committed to providing you with all the information and support you need to make the right choice. From our detailed vehicle listings to our knowledgeable staff, we're here to ensure your car-buying journey is smooth, enjoyable, and rewarding.</p>
      </section>
      
      <section className="about-page__section about-page__community">
        <h2>Community Involvement</h2>
        <p>MotoHub is proud to be an active member of the Autoville community. We regularly participate in local events, sponsor youth sports teams, and contribute to charitable organizations. Our goal is not just to be a business, but a valued neighbor and community partner.</p>
      </section>
      
      <section className="about-page__section about-page__cta">
        <h2>Ready to Find Your Next Car?</h2>
        <p>Visit our showroom or browse our online inventory today. At MotoHub, your dream car is just a click away!</p>
        <Link to={`/inventory`}>
        <button className="about-page__cta-button">View Inventory</button>
        </Link>
      </section>
    </motion.div>
  );
};

export default AboutPage;