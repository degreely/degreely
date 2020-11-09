import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Legend from "./Legend";
import DegreeRequirements from "./DegreeRequirements/DegreeRequirements";

import { fillDegreeReqData } from "./DegreeRequirements/fillDegreeReqData";
import { calculateProgress } from "./DegreeRequirements/DegreeReqData";

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

function Metrics({ plan }) {
  const { bndMcs, fourKMcs } = fillDegreeReqData(plan);
  const { numCompleted, numPlanned, numUnallocated } = calculateProgress(plan.specialisations);
  const total = numCompleted + numPlanned + numUnallocated;
  return (
    <Container className="Metrics">
      <Row id="header">
        <h4>Degree Progress</h4>
      </Row>
      <ProgressBar className="progress-main">
        <ProgressBar className="Completed" now={(numCompleted / total * 100)} key={1} />
        <ProgressBar className="Planned" now={(numPlanned / total) * 100} key={2} />
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
      <DegreeRequirements bndMcs={bndMcs} fourKMcs={fourKMcs} />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  plan: state.plans[state.currentPlan],
});

export default connect(mapStateToProps)(Metrics);
