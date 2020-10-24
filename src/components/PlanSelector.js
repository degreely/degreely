import React from "react";

import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

import EditableList from "./EditableList";

import "../css/PlanSelector.css";

const PlanSelector = ({
  plans = ["Default Plan", "Second Major", "without honours"],
  selected = "Default Plan",
}) => {
  const handleOpenMoreOptions = () => console.log("more clicked");
  const handleDelete = () => console.log("delete clicked");
  const handleAdd = () => console.log("add clicked");

  return (
    <Container className="d-flex flex-row align-items-center selector-root">
      <span>You are viewing</span>
      <Dropdown navbar className="selector-dropdown">
        <Dropdown.Toggle variant="outline-dark" className="selector-dropdown-toggle">
          {selected}
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

export default PlanSelector;
