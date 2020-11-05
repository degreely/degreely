import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Btn from "./Button";
import { login } from "../utils/login";

import logo from "../img/logo.svg";
import "../scss/LandingNavbar.scss";

function LandingNavbar() {
  return (
    <Navbar expand="lg Landing-navbar">
      <div className="order-1 logo">
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Nav.Link>
        </Navbar.Brand>
      </div>
      <div className="order-2 menu">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
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
      <div className="order-3 sso">
        <SSO />
      </div>
    </Navbar>
  );
}

function SSO() {
  const history = useHistory();
  const pathName = useLocation()["pathname"];
  const isLanding = (pathName === "/");
  console.log(pathName);
  if (!isLanding) {
    return (
    <Btn title="Sign in with SSO" type="primary" onClick={() => login(history)} />
    );
  } else {
    return null;
  }
}

export default LandingNavbar;
