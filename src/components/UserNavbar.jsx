import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../img/logo.svg";
import "../scss/LandingNavbar.scss";

import PlanDropdown from "./PlanDropdown";
import UserDropdown from "./UserDropdown";

function UserNavbar() {
  return (
    <Navbar expand="lg" className="mr-auto Landing-navbar">
      <Navbar.Brand>
        <Nav.Link as={Link} to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <PlanDropdown />
        </Nav>
        <Nav className="ml-auto">
          <UserDropdown />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default UserNavbar;
