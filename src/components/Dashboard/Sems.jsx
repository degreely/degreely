import React from "react";
import { Actions } from "../../redux/actions";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "../IconButton";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import AppsIcon from "@material-ui/icons/Apps";
import Sem from "./Sem";

import { generateSemPairs } from "../../utils/generateSemPairs";
import { generateSemsList } from "../../utils/generateSemsList";

import "../../scss/Sems.scss";

function SemsGrid({ sems, inEditMode, handleModRightClick }) {
  let modColor = 0;
  let gradientIncreasing = false;
  const advanceModColorGradient = () => {
    // warning: modColor is hard-coded to range between 0 and 4
    if (modColor === 0 || modColor === 4) gradientIncreasing = !gradientIncreasing;
    modColor += gradientIncreasing ? 1 : -1;
  };

  return (
    <>
      {generateSemPairs(sems).map((semPair, index) => {
        const [first, second] = semPair;
        if (first.name === "!Y10S1") {
          if (!inEditMode) return <></>;
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Row className={`sems-row${inEditMode ? "-edit" : ""}`} key={index}>
                <Col key={first.name}>
                  <Button onClick={() => alert("CONGRATULATIONS!")}>
                    Like it or not, you're graduating now.
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }

        return (
          <Row className={`sems-row${inEditMode ? "-edit" : ""}`} key={index}>
            <Col key={first.name}>
              <Sem
                inEditMode={inEditMode}
                semData={first}
                handleModRightClick={handleModRightClick}
                modColor={`gradient-color-${modColor}`}
              />
            </Col>
            {advanceModColorGradient()}
            <Col key={second.name}>
              <Sem
                inEditMode={inEditMode}
                semData={second}
                handleModRightClick={handleModRightClick}
                modColor={`gradient-color-${modColor}`}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
}

function SemsList({ sems, inEditMode, handleModRightClick }) {
  let modColor = 0;
  let gradientIncreasing = false;
  const advanceModColorGradient = () => {
    // warning: modColor is hard-coded to range between 0 and 4
    if (modColor === 0 || modColor === 4) gradientIncreasing = !gradientIncreasing;
    modColor += gradientIncreasing ? 1 : -1;
  };

  return (
    <>
      {generateSemsList(sems).map((sem, index) => {
        if (index > 0) advanceModColorGradient();
        return (
          <Row className={`sems-row${inEditMode ? "-edit" : ""}`} key={index}>
            <Col>
              <Sem
                inEditMode={inEditMode}
                semData={sem}
                handleModRightClick={handleModRightClick}
                modColor={`gradient-color-${modColor}`}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
}

function Sems({ inEditMode, sems, handleModRightClick, handleEditModeClick, isListView, toggleListView }) {
  const handleGridView = () => toggleListView(false);
  const handleListView = () => toggleListView(true);

  return (
    <div id={`sems${inEditMode ? "-edit" : ""}`}>
      <Row className={`add-remove-mods${inEditMode ? "-edit" : ""}`}>
        <Col>
          {inEditMode && (
            <div className="d-flex align-items-center">
              <h4>Add / Remove Modules</h4>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Your changes will be saved automatically.</Tooltip>}
              >
                <IconButton
                  id="tooltip-icon"
                  icon={<HelpIcon color="inherit" fontSize="small" />}
                  style={{ marginLeft: "0.5rem", color: "#F5F8FF" }}
                />
              </OverlayTrigger>
            </div>
          )}
          <Button onClick={handleEditModeClick} variant="outline-primary">
            {inEditMode ? "Done" : "Add / Remove Modules"}
          </Button>
        </Col>
      </Row>
      <Row id="sems-container">
        <Col>
          <Row className={`sems-row${inEditMode ? "-edit" : ""}`}>
            <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
              <AppsIcon
                fontSize="large"
                onClick={handleListView}
                style={{ color: "gray", cursor: "pointer" }}
              />
              <ViewAgendaIcon
                fontSize="large"
                onClick={handleGridView}
                style={{ color: "gray", cursor: "pointer" }}
              />
            </Col>
          </Row>
          {isListView ? (
            <SemsList sems={sems} inEditMode={inEditMode} handleModRightClick={handleModRightClick} />
          ) : (
            <SemsGrid sems={sems} inEditMode={inEditMode} handleModRightClick={handleModRightClick} />
          )}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isListView: state.isListView,
});

const mapDispatchToProps = (dispatch) => ({
  toggleListView: (toggle) => dispatch(Actions.setIsListView(toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sems);
