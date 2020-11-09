import React from "react";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import EditableList from "../../components/EditableList";

import "../../css/DegreeSettingsPage.css";

const EditMode = ({ onSaveChanges, onCancel, onOpenSelectionModal, onDelete, degreeInfo, labels }) => {
  return (
    <div className="degree-info">
      <Row className="d-flex justify-content-end">
        <span className="info-label">Degree program</span>
        <span className="info-content">BComp in Computer Science (Hons)</span>
      </Row>
      {Object.entries(degreeInfo).map(([category, items]) => (
        <Row className="d-flex justify-content-end" key={category}>
          <span className="info-label list-label">{labels[category].plural}</span>
          <EditableList
            items={items}
            onDelete={(item) => onDelete(category, item)}
            onAdd={() => onOpenSelectionModal(category)}
            addLabel={`Add a ${labels[category].singular.toLowerCase()}`}
            className="info-content"
          />
        </Row>
      ))}

      <div className="page-actions">
        <Button variant="outline-primary" onClick={onCancel} style={{ borderWidth: 0 }}>
          Cancel
        </Button>
        <Button variant="outline-primary" onClick={onSaveChanges} style={{ marginLeft: "1rem" }}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditMode;
