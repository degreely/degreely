import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Avatar from "../img/avatar.jpg";

import "../scss/Dropdown.scss";

function UserDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle>
        <img src={Avatar} alt="Logo" style={circleCrop} />
        Welcome, Jolyn!
        <KeyboardArrowDownIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/settings">
          <div className="IconLeft">
            <SettingsIcon />
          </div>
          Degree settings
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/">
          <div className="IconLeft">
            <PowerSettingsNewIcon />
          </div>
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const circleCrop = {
  borderRadius: "50%",
  display: "inline",
  width: "2rem",
  height: "2rem"
};

export default UserDropdown;
