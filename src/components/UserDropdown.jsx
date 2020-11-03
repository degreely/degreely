import React from "react";
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
        <div style={iconRight}>
          <KeyboardArrowDownIcon />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <div style={iconLeft}>
            <SettingsIcon />
          </div>
          Degree settings
        </Dropdown.Item>
        <Dropdown.Item>
          <div style={iconLeft}>
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
  marginRight: 24,
  width: 32,
  height: 32
};

const iconLeft = {
    textAlign: "left",
    display: "inline",
    paddingRight: 24
}

const iconRight = {
  textAlign: "right",
  display: "inline",
  paddingLeft: 24,
};

export default UserDropdown;
