import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/HomeRounded";

import SelectionModal from "../../components/SelectionModal";
import Metrics from "../../components/Metrics";
import { options as selectionOptions } from "../../data/settings-options";
import { Actions } from "../../redux/actions";

import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

import "../../css/DegreeSettingsPage.css";

const labels = {
  specialisations: { plural: "Focus areas/Specialisations", singular: "Focus area/Specialisation" },
  majors: { plural: "Majors", singular: "Major" },
  minors: { plural: "Minors", singular: "Minor" },
};

const DegreeSettings = ({ currentPlanName, plan, handleEditPlan }) => {
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
      <Container className="d-flex justify-content-between page-root">
        <Col sm={1}>
          {mode === "view" && (
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
          )}
        </Col>

        <Col sm={9} className="page-body" style={{ flexDirection: "column" }}>
          <Typography variant="h4">Settings</Typography>
          {mode === "view" ? (
            <ViewMode startEdit={handleStartEditMode} degreeInfo={degreeInfo} labels={labels} />
          ) : (
            <EditMode
              onSaveChanges={handleSaveChanges}
              onCancel={handleCancel}
              onOpenSelectionModal={handleOpenSelectionModal}
              onDelete={handleDelete}
              degreeInfo={degreeInfo}
              labels={labels}
            />
          )}
        </Col>

        <Col sm={2} className="page-sidebar">
          <Metrics />
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

export default connect(mapStateToProps, mapDispatchToProps)(DegreeSettings);
