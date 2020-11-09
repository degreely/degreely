import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/HomeRounded";
import EditIcon from "@material-ui/icons/EditOutlined";

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
  const [degreeInfo, setDegreeInfo] = useState({});
  const [selectionType, setSelectionType] = useState("");

  useEffect(() => {
    setDegreeInfo({ specialisations, majors, minors });
  }, [currentPlanName]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartEditMode = () => setMode("edit");
  const handleCancel = () => {
    setMode("view");
    setDegreeInfo({ specialisations, majors, minors }); // reset
  };
  const handleSaveChanges = () => {
    setMode("view");
    handleEditPlan(currentPlanName, { ...plan, ...degreeInfo });
  };

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
                style={{ border: 0 }}
              >
                <HomeIcon style={{ marginRight: "0.5rem" }} />
                Dashboard
              </Button>
              <div className="d-flex align-items-center">
                <Typography variant="h4">Settings</Typography>
                <Button
                  onClick={handleStartEditMode}
                  variant="outline-primary"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    border: 0,
                    borderRadius: "50%",
                    height: "2.5rem",
                    width: "2.5rem",
                    padding: "0",
                    marginLeft: "1rem",
                  }}
                >
                  <EditIcon color="inherit" fontSize="default" />
                </Button>
              </div>
              <div />
            </Row>
          ) : (
            <>
              <Row id="row" className="d-flex justify-content-center">
                <Typography variant="h4">Settings</Typography>
              </Row>
              <Row id="row" className="d-flex justify-content-end" style={{ marginBottom: "1.5rem" }}>
                <Button variant="outline-primary" onClick={handleCancel} style={{ marginRight: "1.5rem" }}>
                  Cancel
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={handleSaveChanges}
                  style={{ marginRight: "2.5rem" }}
                >
                  Save Changes
                </Button>
              </Row>
            </>
          )}

          <Row id="row" className="d-flex justify-content-center">
            <div className="degree-info">
              <Row className="d-flex justify-content-end">
                <span className="info-label">Degree program</span>
                <span className="info-content">BComp in Computer Science (Hons)</span>
              </Row>
              {Object.entries(degreeInfo).map(([category, items]) => (
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
  handleEditPlan: (name, plan) => dispatch(Actions.editPlan(name, plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
