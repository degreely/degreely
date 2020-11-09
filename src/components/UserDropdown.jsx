import React from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import CustomDropdownToggle from "../components/CustomDropdownToggle";
import Avatar from "../img/avatar.jpg";
import { logout } from "../utils/logout";

import "../scss/Dropdown.scss";

function UserDropdown() {
  const history = useHistory();

  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle as={CustomDropdownToggle} style={{ width: "unset" }}>
        <img src={Avatar} alt="Logo" style={circleCrop} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-right">
        <div className="d-flex flex-column align-items-center" style={{ padding: "2rem" }}>
          <img src={Avatar} alt="Logo" style={circleCrop} />
          <div className="d-flex flex-column align-items-center" style={{ margin: "2rem 0rem" }}>
            <span className="font-weight-medium">Jolyn Tan Shi Min</span>
            <span>e0123456@u.nus.edu</span>
          </div>
          <Button variant="outline-primary" onClick={() => logout(history)}>
            Sign out
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const circleCrop = {
  borderRadius: "50%",
  display: "inline",
  width: "3rem",
  height: "3rem",
};

export default UserDropdown;
