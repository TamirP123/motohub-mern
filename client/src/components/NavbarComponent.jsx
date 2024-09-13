import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      className={`futuristic-navbar ${scrolled ? "scrolled" : ""}`}
      id="navbar"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <span className="neon-blue">Moto</span>
          <span className="silver">hub</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/inventory" className="nav-link-custom">
              Inventory
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
