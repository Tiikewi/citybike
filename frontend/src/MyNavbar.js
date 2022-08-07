import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Citybike
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/journeys">
              Journeys
            </Nav.Link>
            <Nav.Link as={Link} to="/stations">
              Stations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
