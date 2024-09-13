import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
              <li><Link to="/financing">Financing</Link></li>
              <li><Link to="/trade-in">Trade-In</Link></li>
              <li><Link to="/warranty">Warranty</Link></li>
              <li><Link to="/maintenance">Maintenance</Link></li>
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
              <li><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
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