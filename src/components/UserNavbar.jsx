import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SettingsIcon from "@material-ui/icons/Settings";

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
      <Nav className="m-auto">
        <PlanDropdown />
      </Nav>
      <div className="d-flex align-items-center">
        <Nav.Link as={Link} to="settings">
          <SettingsIcon style={{ fontSize: "2rem", color: "#777777" }} />
        </Nav.Link>
        <Nav className="ml-auto">
          <UserDropdown />
        </Nav>
      </div>
    </Navbar>
  );
}

export default UserNavbar;
