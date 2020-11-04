import React from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import EditableList from "./EditableList";

import "../scss/Dropdown.scss";

const PlanDropdown = ({ plans = ["Second Major", "without honours"], selected = "Default Plan" }) => {
  const history = useHistory();

  const handleOpenMoreOptions = () => console.log("more clicked");
  const handleDelete = () => console.log("delete clicked");
  const handleAdd = () => history.push("create-plan");

  return (
    <Container className="d-flex flex-row align-items-center selector-root">
      <span>You are viewing</span>
      <Dropdown navbar className="selector-dropdown">
        <Dropdown.Toggle className="selector-dropdown-toggle">
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
