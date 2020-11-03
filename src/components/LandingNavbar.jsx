import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Btn from "./Button";
import logo from "../img/logo.svg";
import "../scss/LandingNavbar.scss";

function LandingNavbar() {
  return (
    <Navbar expand="lg Landing-navbar">
      <div className="order-1 mr-auto">
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Nav.Link>
        </Navbar.Brand>
      </div>
      <div className="order-2 m-auto">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="ml-4 mr-4">
              <div className="Nav-link">Home</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="ml-4 mr-4">
              <div className="Nav-link">About</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/support" className="ml-4 mr-4">
              <div className="Nav-link">Support</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
      <div className="order-3 ml-auto">
        <Btn title="Sign in with SSO" type="primary" />
      </div>
    </Navbar>
  );
}

export default LandingNavbar;
