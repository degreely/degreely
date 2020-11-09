import React from "react";
import Container from "react-bootstrap/Container";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Legend from "./Legend";
import DegreeRequirements from "./DegreeRequirements/DegreeRequirements";

import "../../scss/Metrics.scss";

export const MetricsModState = Object.freeze({
  COMPLETED: "COMPLETED",
  PLANNED: "PLANNED",
  UNPLANNED: "UNPLANNED",
  UNALLOCATED: "UNALLOCATED",
});

export const MetricsModColors = Object.freeze({
  COMPLETED: "#5E60CE",
  PLANNED: "#BFC0FF",
  UNPLANNED: "#E5E5E5",
  UNALLOCATED: "red",
});

function Metrics() {
  return (
    <Container className="Metrics">
      <Row id="header">
        <h4>Degree Progress</h4>
      </Row>
      <ProgressBar className="progress-main">
        <ProgressBar className="Completed" now={50} key={1} />
        <ProgressBar className="Planned" now={20} key={2} />
      </ProgressBar>
      <div id="legend">
        <Legend colorHex={MetricsModColors.COMPLETED} title="Completed" />
        <Legend colorHex={MetricsModColors.PLANNED} title="Planned" />
        <Legend colorHex={MetricsModColors.UNPLANNED} title="Unplanned" />
      </div>
      <Row id="header">
        <h4>CAP</h4>
        <Container>
          <Row>
            <Col className="CapHeader">Projected</Col>
            <Col>4.18</Col>
          </Row>
          <Row>
            <Col className="CapHeader">Actual</Col>
            <Col>3.96</Col>
          </Row>
        </Container>
      </Row>
      <Row id="header">
        <h4>Degree Requirements</h4>
      </Row>
      <DegreeRequirements />
    </Container>
  );
}

export default Metrics;
