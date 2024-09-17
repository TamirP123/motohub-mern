import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/inventory">Inventory</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Services</h5>
            <ul className="list-unstyled">
              {['Financing', 'Trade-In', 'Warranty', 'Maintenance'].map(service => (
                <li key={service}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{service} - Coming Soon!</Tooltip>}
                  >
                    <span className="coming-soon">{service} <em>(Coming Soon)</em></span>
                  </OverlayTrigger>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>123 Car Street</li>
              <li>Autoville, AU 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@motohub.com</li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled social-icons">
              <li><a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a></li>
              <li><a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a></li>
              <li><a href="https://github.com/TamirP123" aria-label="Github"><FaGithub /></a></li>
              <li><a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Motohub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
