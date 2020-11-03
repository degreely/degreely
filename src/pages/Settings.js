import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import ReadOnlyList from "../components/ReadOnlyList";
import EditableList from "../components/EditableList";
import SelectionModal from "../components/SelectionModal";
import { options as selectionOptions } from "../data/settings-options";

import "../css/SettingsPage.css";

const labels = {
  specialisations: { plural: "Focus areas/Specialisations", singular: "Focus area/Specialisation" },
  majors: { plural: "Majors", singular: "Major" },
  minors: { plural: "Minors", singular: "Minor" },
};

const INITIAL_STATE = {
  specialisations: ["Software Engineering", "Computer Security"],
  majors: [],
  minors: ["Economics"],
};

const Settings = () => {
  const [mode, setMode] = useState("view");
  const [degreeInfo, setDegreeInfo] = useState(INITIAL_STATE);
  const [prevDegreeInfo, setPrevDegreeInfo] = useState({});
  const [selectionType, setSelectionType] = useState("");

  const handleStartEditMode = () => {
    setMode("edit");
    setPrevDegreeInfo(degreeInfo);
  };
  const handleCancel = () => {
    setMode("view");
    setDegreeInfo(prevDegreeInfo);
  };
  const handleSaveChanges = () => setMode("view");

  const handleOpenSelectionModal = (category) => {
    setSelectionType(category);
  };

  const handleAdd = (category, itemToAdd) => {
    setDegreeInfo({
      ...degreeInfo,
      [category]: [...degreeInfo[category], itemToAdd].sort(),
    });
    setSelectionType("");
  };

  const handleDelete = (category, itemToDelete) => {
    setDegreeInfo({
      ...degreeInfo,
      [category]: degreeInfo[category].filter((item) => item !== itemToDelete),
    });
  };

  const getOptions = (category) => {
    if (!category) return [];
    const existing = new Set(degreeInfo[category]);
    return selectionOptions[category].filter((option) => !existing.has(option));
  };

  if (mode === "view") {
    return (
      <Container className="d-flex flex-column justify-content-start align-items-center">
        <Row id="row" className="d-flex justify-content-end page-actions">
          <Button variant="outline-primary" onClick={handleStartEditMode}>
            Edit
          </Button>
        </Row>
        <Row id="row" className="d-flex justify-content-center page-body">
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
          </div>
        </Row>
      </Container>
    );
  } else {
    return (
      <>
        <Container className="d-flex flex-column justify-content-start align-items-center">
          <Row id="row" className="d-flex justify-content-end page-actions">
            <Button variant="outline-primary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Row>
          <Row id="row" className="d-flex justify-content-center page-body">
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
                    onDelete={(item) => handleDelete(category, item)}
                    onAdd={() => handleOpenSelectionModal(category)}
                    addLabel={`Add a ${labels[category].singular.toLowerCase()}`}
                    className="info-content"
                  />
                </Row>
              ))}
            </div>
          </Row>
        </Container>
        <SelectionModal
          open={!!selectionType}
          title={`Select a ${!!labels[selectionType] ? labels[selectionType].singular.toLowerCase() : ""}`}
          options={getOptions(selectionType)}
          handleSubmit={(selection) => handleAdd(selectionType, selection)}
          handleClose={() => setSelectionType("")}
        />
      </>
    );
  }
};

export default Settings;
