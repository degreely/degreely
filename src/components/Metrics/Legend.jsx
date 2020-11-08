import React from "react";
import StopIcon from "@material-ui/icons/Stop";

import "../../scss/Legend.scss";

function Legend(props) {
  return (
    <div className="Legend">
      <StopIcon style={{color: props.colorHex}} />
      <div className="LegendName">{props.title}</div>
    </div>
  );
}

export default Legend;
