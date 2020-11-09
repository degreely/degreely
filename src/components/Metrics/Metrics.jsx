import React from "react";
import { connect } from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Badge from 'react-bootstrap/Badge';
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

  const capTooltip = (
    <Popover className="metrics-tooltip">
      <Popover.Content>
        A student's CAP is the sum of the module grade points multiplied by the number of MCs for
        the corresponding module, divided by the total number of MCs.<br/><br/>
        Visit <a href="http://www.nus.edu.sg/registrar/academic-information-policies/non-graduating/modular-system">this page</a> for
        more information.
      </Popover.Content>
    </Popover>
  );

  const degreeReqTooltip = (
    <Popover className="metrics-tooltip">
      <Popover.Content>
        These are baskets of modules you need to fulfil based on the degree programme you are enrolled in.
        Red baskets indicate that there are modules in that basket which are unallocated in your module plan.
      </Popover.Content>
    </Popover>
  );

  return (
    <div id="metrics">
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
      <h4 className="metrics-header">
        <span>CAP</span>
        <OverlayTrigger trigger="click" placement="top" overlay={capTooltip}>
          <Badge>?</Badge>
        </OverlayTrigger>
      </h4>
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
      <h4 className="metrics-header">
        <span>Degree Requirements</span>
        <OverlayTrigger trigger="click" placement="top" overlay={degreeReqTooltip}>
          <Badge>?</Badge>
        </OverlayTrigger>
      </h4>
      <DegreeRequirements bndMcs={bndMcs} fourKMcs={fourKMcs} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  plan: state.plans[state.currentPlan],
});

export default connect(mapStateToProps)(Metrics);
