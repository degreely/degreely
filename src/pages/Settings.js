import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import EditableList from "../components/EditableList";

import "../css/SettingsPage.css";

const labels = {
  specialisations: "Focus areas/Specialisations",
  majors: "majors",
  minors: "minors",
};

const INITIAL_STATE = {
  specialisations: ["Software Engineering", "Computer Security"],
  majors: [],
  minors: ["Economics"],
};

const Settings = ({ degreeInfo = INITIAL_STATE }) => {
  const handleDelete = () => console.log("delete clicked");
  const handleAdd = () => console.log("add clicked");

  return (
    <Container id="root" className="d-flex flex-column justify-content-start align-items-center">
      <Row id="row" className="d-flex justify-content-end page-actions">
        <Button variant="outline-primary">Cancel</Button>
        <Button variant="outline-primary">Save Changes</Button>
      </Row>
      <Row id="row" className="d-flex justify-content-center page-body">
        <div className="degree-info">
          <Row className="d-flex justify-content-end">
            <span className="info-label">Degree program</span>
            <span className="info-content">BComp in Computer Science (Hons)</span>
          </Row>
          {Object.entries(degreeInfo).map(([category, items]) => (
            <Row className="d-flex justify-content-end" key={category}>
              <span className="info-label list-label">{labels[category]}</span>
              <EditableList
                items={items}
                onDelete={handleDelete}
                onAdd={handleAdd}
                addLabel={`Add ${labels[category].toLowerCase()}`}
                className="info-content"
              />
            </Row>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default Settings;
