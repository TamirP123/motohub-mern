import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactPage.css';

const ContactPage = () => {
  return (
    <motion.div 
      className="contact-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="contact-content">
        <h1 className="title">Contact Us</h1>
        <div className="form-container">
          <form className="styled-form">
            <div className="input-group">
              <input type="text" placeholder="Name" required className="styled-input" />
              <input type="email" placeholder="Email" required className="styled-input" />
            </div>
            <textarea placeholder="Message" required className="styled-textarea"></textarea>
            <button type="submit" className="submit-button">
              <span>Send Message</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
        <div className="contact-info">
          <div className="info-item">
            <div className="icon-container">
              <i className="fas fa-map-marker-alt info-icon"></i>
            </div>
            <span className="info-text">123 Car Street Autoville, AU 12345</span>
          </div>
          <div className="info-item">
            <div className="icon-container">
              <i className="fas fa-phone-alt info-icon"></i>
            </div>
            <span className="info-text">(555) 123-4567</span>
          </div>
          <div className="info-item">
            <div className="icon-container">
              <i className="fas fa-envelope info-icon"></i>
            </div>
            <span className="info-text">info@motohub.com</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
