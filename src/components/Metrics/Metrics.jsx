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
    <div>
      <h4 className="metrics-header">Degree Progress</h4>
      <ProgressBar>
        <ProgressBar className="progress-completed" now={(numCompleted / total * 100)} key={1} />
        <ProgressBar className="progress-planned" now={(numPlanned / total) * 100} key={2} />
      </ProgressBar>
      <div id="progress-legend">
        <Legend colorHex={MetricsModColors.COMPLETED} title="Completed" />
        <Legend colorHex={MetricsModColors.PLANNED} title="Planned" />
        <Legend colorHex={MetricsModColors.UNPLANNED} title="Unplanned" />
      </div>
      <h4 className="metrics-header">CAP</h4>
      <div className="cap-container">
        <div className="cap">
          <div className="cap-type">Projected</div>
          <div className="cap-type">Actual</div>
        </div>
        <div className="cap">
          <div className="cap-number">4.18</div>
          <div className="cap-number">3.96</div>
        </div>
        <div className="cap" />
      </div>
      <h4 className="metrics-header">Degree Requirements</h4>
      <DegreeRequirements bndMcs={bndMcs} fourKMcs={fourKMcs} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  plan: state.plans[state.currentPlan],
});

export default connect(mapStateToProps)(Metrics);
