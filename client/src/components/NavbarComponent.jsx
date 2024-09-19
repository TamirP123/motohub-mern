import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../utils/auth";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Check if user is admin
    const checkAdminStatus = () => {
      const profile = Auth.getProfile();
      console.log("User profile:", profile); // Debug log
      const adminStatus = profile && profile.isAdmin === true;
      console.log("Is admin:", adminStatus); // Debug log
      setIsAdmin(adminStatus);
    };

    checkAdminStatus();

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate('/');
  };

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
            {Auth.loggedIn() ? (
              <>
                {isAdmin && (
                  <Nav.Link as={Link} to="/admin/dashboard" className="nav-link-custom">
                    Admin Dashboard
                  </Nav.Link>
                )}
                <Nav.Link onClick={logout} className="nav-link-custom">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/adminlogin" className="nav-link-custom">
                Admin Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
