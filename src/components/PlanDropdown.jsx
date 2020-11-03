import React from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import CustomDropdownToggle from "../components/CustomDropdownToggle";
import EditableList from "./EditableList";

import "../scss/Dropdown.scss";

const PlanDropdown = ({ plans = ["Second Major", "without honours"], selected = "Default Plan" }) => {
  const handleOpenMoreOptions = () => console.log("more clicked");
  const handleDelete = () => console.log("delete clicked");
  const handleAdd = () => console.log("add clicked");

  return (
    <Container className="d-flex flex-row align-items-center selector-root">
      <span>You are viewing</span>
      <Dropdown navbar className="selector-dropdown custom-dropdown">
        <Dropdown.Toggle className="selector-dropdown-toggle" as={CustomDropdownToggle}>
          {selected}
          <KeyboardArrowDownIcon />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <EditableList
            hasMoreOptions
            items={plans}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onOpenMoreOptions={handleOpenMoreOptions}
            addLabel={`Add a new plan`}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default PlanDropdown;
