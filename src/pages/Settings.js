import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import EditableList from "../components/EditableList";

import "../css/Settings.css";

const Settings = () => {
  const options = {
    specialisations: {
      label: "Focus areas/Specialisations",
      items: ["Software Engineering", "Computer Security"],
    },
    majors: { label: "Majors", items: [] },
    minors: { label: "Minors", items: ["Economics"] },
  };

  const handleDelete = () => console.log("delete clicked");
  const handleAdd = () => console.log("add clicked");

  return (
    <Container id="root" className="d-flex flex-column justify-content-center align-items-center">
      <div className="degree-info">
        <Row className="d-flex justify-content-end">
          <span className="info-label">Degree program</span>
          <span className="info-content">BComp in Computer Science (Hons)</span>
        </Row>
        {Object.values(options).map(({ label, items }) => (
          <Row className="d-flex justify-content-end" key={label}>
            <span className="info-label list-label">{label}</span>
            <EditableList
              items={items}
              onDelete={handleDelete}
              onAdd={handleAdd}
              addLabel={`Add ${label.toLowerCase()}`}
              className="info-content"
            />
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default Settings;
