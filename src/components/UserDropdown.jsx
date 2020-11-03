import React from "react";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import CustomDropdownToggle from "../components/CustomDropdownToggle";
import Avatar from "../img/avatar.jpg";
import { logout } from "../utils/logout";

import "../scss/Dropdown.scss";

function UserDropdown() {
  const history = useHistory();

  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle as={CustomDropdownToggle}>
        <img src={Avatar} alt="Logo" style={circleCrop} />
        Welcome, Jolyn!
        <KeyboardArrowDownIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item id="user-dropdown" as={Link} to="/settings">
          <div className="IconLeft">
            <SettingsIcon />
          </div>
          Degree settings
        </Dropdown.Item>
        <Dropdown.Item onClick={() => logout(history)}>
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
  height: "2rem",
};

export default UserDropdown;
