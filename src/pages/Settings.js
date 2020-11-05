import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";

import ReadOnlyList from "../components/ReadOnlyList";
import EditableList from "../components/EditableList";
import SelectionModal from "../components/SelectionModal";
import { options as selectionOptions } from "../data/settings-options";
import { Actions } from "../redux/actions";

import "../css/SettingsPage.css";

const labels = {
  specialisations: { plural: "Focus areas/Specialisations", singular: "Focus area/Specialisation" },
  majors: { plural: "Majors", singular: "Major" },
  minors: { plural: "Minors", singular: "Minor" },
};

const Settings = ({ currentPlanName, plan, handleEditPlan }) => {
  const { specialisations, majors, minors } = plan;

  const [mode, setMode] = useState("view");
  const [newDegreeInfo, setNewDegreeInfo] = useState({ specialisations, majors, minors });
  const [selectionType, setSelectionType] = useState("");

  const handleStartEditMode = () => setMode("edit");
  const handleCancel = () => setMode("view");
  const handleSaveChanges = () => {
    setMode("view");
    handleEditPlan({ [currentPlanName]: { ...plan, ...newDegreeInfo } });
  };

  const handleOpenSelectionModal = (category) => {
    setSelectionType(category);
  };

  const handleAdd = (category, itemToAdd) => {
    setNewDegreeInfo({
      ...newDegreeInfo,
      [category]: [...newDegreeInfo[category], itemToAdd].sort(),
    });
    setSelectionType("");
  };

  const handleDelete = (category, itemToDelete) => {
    setNewDegreeInfo({
      ...newDegreeInfo,
      [category]: newDegreeInfo[category].filter((item) => item !== itemToDelete),
    });
  };

  const getOptions = (category) => {
    if (!category) return [];
    const existing = new Set(newDegreeInfo[category]);
    return selectionOptions[category].filter((option) => !existing.has(option));
  };

  return (
    <>
      <Container className="d-flex flex-col justify-content-between page-root">
        <Col sm={10}>
          {mode === "view" ? (
            <Row id="row" className="d-flex justify-content-between page-actions">
              <Button
                as={Link}
                to="dashboard"
                variant="outline-primary"
                className="d-flex align-items-center"
                style={{ border: 0, fontSize: "1rem" }}
              >
                <ArrowBackIcon fontSize="inherit" style={{ marginRight: "1rem" }} />
                Dashboard
              </Button>
              <Button variant="outline-primary" onClick={handleStartEditMode}>
                Edit
              </Button>
            </Row>
          ) : (
            <Row id="row" className="d-flex justify-content-end page-actions">
              <Button variant="outline-primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="outline-primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Row>
          )}

          <Row id="row" className="d-flex justify-content-center">
            <div className="degree-info">
              <Row className="d-flex justify-content-end">
                <span className="info-label">Degree program</span>
                <span className="info-content">BComp in Computer Science (Hons)</span>
              </Row>
              {Object.entries(newDegreeInfo).map(([category, items]) => (
                <Row className="d-flex justify-content-end" key={category}>
                  <span className="info-label list-label">{labels[category].plural}</span>
                  {mode === "view" ? (
                    <ReadOnlyList items={items} className="info-content read-only" />
                  ) : (
                    <EditableList
                      items={items}
                      onDelete={(item) => handleDelete(category, item)}
                      onAdd={() => handleOpenSelectionModal(category)}
                      addLabel={`Add a ${labels[category].singular.toLowerCase()}`}
                      className="info-content"
                    />
                  )}
                </Row>
              ))}
            </div>
          </Row>
        </Col>
        <Col sm={2} className="page-sidebar">
          degree progress thing here
        </Col>
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
};

const mapStateToProps = (state) => ({
  currentPlanName: state.currentPlan,
  plan: state.plans[state.currentPlan],
});

const mapDispatchToProps = (dispatch) => ({
  handleEditPlan: (plan) => dispatch(Actions.editPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
