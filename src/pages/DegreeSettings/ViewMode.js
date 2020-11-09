import React from "react";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import ReadOnlyList from "../../components/ReadOnlyList";

import "../../css/DegreeSettingsPage.css";

const ViewMode = ({ startEdit, degreeInfo, labels }) => {
  return (
    <div className="degree-info">
      <Row className="d-flex justify-content-end">
        <span className="info-label">Degree program</span>
        <span className="info-content">BComp in Computer Science (Hons)</span>
      </Row>
      {Object.entries(degreeInfo).map(([category, items]) => (
        <Row className="d-flex justify-content-end" key={category}>
          <span className="info-label list-label">{labels[category].plural}</span>
          <ReadOnlyList items={items} className="info-content read-only" />
        </Row>
      ))}
      <div className="page-actions">
        <Button onClick={startEdit} variant="outline-primary">
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ViewMode;
